import { LitElement, html, nothing, PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { baseStyles } from '../../styles/base';
import { scrollbarStyles } from '../../styles/scrollbars';
import { selectStyles } from './select.styles';
import { SelectOption } from './select-option.interface';
import { InputAppearance } from '../input/input-appearance.enum';
import { InputSize } from '../input/input-size.enum';
import { coerceBooleanProperty } from '../../utils/coerce';
import '../icon/icon.component';
import './select-option.component';

/**
 * SwimSelect - A select/dropdown component matching @swimlane/ngx-ui design system
 *
 * Options can be provided via the `options` property or declaratively with `<swim-option>` children:
 * ```html
 * <swim-select label="Attack Type">
 *   <swim-option name="Breach" value="breach"></swim-option>
 *   <swim-option name="DDOS" value="ddos"></swim-option>
 * </swim-select>
 * ```
 *
 * @slot - swim-option children for declarative options
 * @slot hint - Custom hint content
 *
 * @fires change - Fired when selection changes
 * @fires open - Fired when dropdown opens
 * @fires close - Fired when dropdown closes
 *
 * @csspart select - The select input element
 * @csspart dropdown - The dropdown container
 */
const SELECT_TAG = 'swim-select';
export class SwimSelect extends LitElement {
  static styles = [baseStyles, scrollbarStyles, selectStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  @query('.select-input')
  private selectInput!: HTMLDivElement;

  @query('.select-filter-input')
  private filterInput?: HTMLInputElement;

  /**
   * Select label
   */
  @property({ type: String })
  label = '';

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = 'Select...';

  /**
   * Hint text
   */
  @property({ type: String })
  hint = '';

  /**
   * Empty placeholder when no options
   */
  @property({ type: String, attribute: 'empty-placeholder' })
  emptyPlaceholder = 'No options available';

  /**
   * Filter placeholder
   */
  @property({ type: String, attribute: 'filter-placeholder' })
  filterPlaceholder = 'Filter options...';

  /**
   * Select options
   */
  @property({ type: Array })
  options: SelectOption[] = [];

  /**
   * Selected value(s)
   */
  @property()
  get value(): any | any[] {
    return this.multiple ? this._value : this._value[0] ?? null;
  }
  set value(val: any | any[]) {
    const oldValue = this._value;
    if (this.multiple) {
      this._value = Array.isArray(val) ? val : val ? [val] : [];
    } else {
      this._value = val ? [val] : [];
    }
    this._internals.setFormValue(this.multiple ? JSON.stringify(this._value) : this._value[0] ?? '');
    this.requestUpdate('value', oldValue);
    this._updateActiveState();
  }
  private _value: any[] = [];

  /**
   * Input name for forms
   */
  @property({ type: String })
  name = '';

  /**
   * Input ID
   */
  @property({ type: String })
  id = `swim-select-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Whether the select is disabled
   */
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  /**
   * Whether the select is required
   */
  @property({ type: Boolean, reflect: true })
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  private _required = false;

  /**
   * Select appearance
   */
  @property({ type: String, reflect: true })
  appearance: InputAppearance = InputAppearance.legacy;

  /**
   * Select size
   */
  @property({ type: String, reflect: true })
  size: InputSize = InputSize.sm;

  /**
   * Whether to show margin
   */
  @property({ type: Boolean, reflect: true, attribute: 'marginless' })
  get marginless(): boolean {
    return !this._withMargin;
  }
  set marginless(value: boolean) {
    this._withMargin = !coerceBooleanProperty(value);
  }
  private _withMargin = true;

  /**
   * Whether to show hint
   */
  @property({ type: Boolean })
  get withHint(): boolean {
    return this._withHint;
  }
  set withHint(value: boolean) {
    this._withHint = coerceBooleanProperty(value);
  }
  private _withHint = true;

  /**
   * Enable filtering
   */
  @property({ type: Boolean })
  get filterable(): boolean {
    return this._filterable;
  }
  set filterable(value: boolean) {
    this._filterable = coerceBooleanProperty(value);
  }
  private _filterable = true;

  /**
   * Allow multiple selection
   */
  @property({ type: Boolean, reflect: true })
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple = false;

  /**
   * Allow clearing selection
   */
  @property({ type: Boolean, attribute: 'allow-clear' })
  get allowClear(): boolean {
    return this._allowClear;
  }
  set allowClear(value: boolean) {
    this._allowClear = coerceBooleanProperty(value);
  }
  private _allowClear = true;

  /**
   * Required indicator
   */
  @property({ type: String, attribute: 'required-indicator' })
  requiredIndicator = '*';

  @state()
  private _slottedOptions: SelectOption[] = [];

  @state()
  private _open = false;

  @state()
  private _focused = false;

  @state()
  private _touched = false;

  @state()
  private _invalid = false;

  @state()
  private _filterQuery = '';

  @state()
  private _focusedIndex = -1;

  private _clickOutsideListener?: (e: MouseEvent) => void;
  private _childObserver?: MutationObserver;

  /**
   * Combined options from both the `options` property and slotted `swim-option` children.
   * Slotted children take precedence when `options` property is empty.
   */
  private get _allOptions(): SelectOption[] {
    if (this.options.length > 0 && this._slottedOptions.length > 0) {
      return [...this.options, ...this._slottedOptions];
    }
    return this.options.length > 0 ? this.options : this._slottedOptions;
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this._collectSlottedOptions();
    this._setupChildObserver();
    this._updateActiveState();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeClickOutsideListener();
    this._childObserver?.disconnect();
  }

  /** Called by swim-option children when they connect/disconnect/update */
  _onSlottedOptionsChange() {
    this._collectSlottedOptions();
  }

  private _collectSlottedOptions() {
    const optionElements = Array.from(this.querySelectorAll(':scope > swim-option'));
    this._slottedOptions = optionElements
      .filter(el => !el.hasAttribute('hidden'))
      .map(el => {
        const name = el.getAttribute('name') || '';
        const value = el.getAttribute('value');
        return {
          name,
          value: value !== null ? value : name,
          disabled: el.hasAttribute('disabled')
        };
      });
  }

  private _setupChildObserver() {
    this._childObserver = new MutationObserver(() => {
      this._collectSlottedOptions();
    });
    this._childObserver.observe(this, { childList: true, subtree: false });
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._updateActiveState();
      this._validate();
    }

    if (changedProperties.has('_open')) {
      if (this._open) {
        this.setAttribute('open', '');
        this._addClickOutsideListener();
        // Focus filter input if available
        setTimeout(() => {
          if (this.filterable && this.filterInput) {
            this.filterInput.focus();
          }
        }, 100);
      } else {
        this.removeAttribute('open');
        this._removeClickOutsideListener();
        this._filterQuery = '';
        this._focusedIndex = -1;
      }
    }
  }

  render() {
    const hasValue = this._value.length > 0;
    const filteredOptions = this._getFilteredOptions();
    const showClear = this.allowClear && hasValue && !this.disabled;

    return html`
      <div class="select-wrap">
        <div class="select-flex-wrap">
          <div class="select-flex-wrap-inner">
            <div class="select-input-wrap">
              <div
                class="select-input"
                part="select"
                role="combobox"
                aria-expanded="${this._open}"
                aria-haspopup="listbox"
                aria-controls="${this.id}-listbox"
                tabindex="${this.disabled ? -1 : 0}"
                @click="${this._handleInputClick}"
                @keydown="${this._handleKeyDown}"
                @focus="${this._handleFocus}"
                @blur="${this._handleBlur}"
              >
                <div class="select-value">${this._renderValue()}</div>
                <div class="select-controls">
                  ${showClear
                    ? html`
                        <button
                          type="button"
                          class="select-clear"
                          aria-label="Clear selection"
                          @click="${this._handleClear}"
                        >
                          <swim-icon font-icon="x"></swim-icon>
                        </button>
                      `
                    : nothing}
                  <button
                    type="button"
                    class="select-caret"
                    aria-label="Toggle dropdown"
                    @click="${this._handleToggle}"
                  >
                    <swim-icon font-icon="chevron-bold-down"></swim-icon>
                  </button>
                </div>
              </div>
              <label class="select-label" for="${this.id}">
                ${this.label} ${this.required ? html`<span>${this.requiredIndicator}</span>` : nothing}
              </label>
            </div>
          </div>
        </div>
        <div class="select-underline">
          <div class="underline-fill"></div>
        </div>
        <div class="select-hint ${!this.withHint ? 'hidden' : ''}">
          <slot name="hint">${this.hint}</slot>
        </div>

        ${this._open
          ? html`
              <div class="select-dropdown swim-scroll" part="dropdown" role="listbox" id="${this.id}-listbox">
                ${this.filterable
                  ? html`
                      <div class="select-filter">
                        <input
                          type="text"
                          class="select-filter-input"
                          placeholder="${this.filterPlaceholder}"
                          .value="${this._filterQuery}"
                          @input="${this._handleFilterInput}"
                          @keydown="${this._handleFilterKeyDown}"
                        />
                      </div>
                    `
                  : nothing}
                ${filteredOptions.length > 0
                  ? html`
                      <ul class="select-options">
                        ${repeat(
                          filteredOptions,
                          option => this._getOptionValue(option),
                          (option, index) => this._renderOption(option, index)
                        )}
                      </ul>
                    `
                  : html` <div class="select-empty">${this.emptyPlaceholder}</div> `}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _renderValue() {
    if (this._value.length === 0) {
      return html`<span class="select-placeholder">${this.placeholder}</span>`;
    }

    if (this.multiple) {
      return html`
        ${this._value.map(val => {
          const option = this._allOptions.find(opt => this._getOptionValue(opt) === val);
          return this._renderChip(option || { name: val, value: val });
        })}
      `;
    } else {
      const option = this._allOptions.find(opt => this._getOptionValue(opt) === this._value[0]);
      return html`${option?.name || this._value[0]}`;
    }
  }

  private _renderChip(option: SelectOption) {
    return html`
      <div class="select-chip">
        <span class="select-chip-label">${option.name}</span>
        ${!this.disabled
          ? html`
              <button
                type="button"
                class="select-chip-remove"
                aria-label="Remove ${option.name}"
                @click="${(e: Event) => this._removeChip(e, option)}"
              >
                <swim-icon font-icon="x"></swim-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }

  private _renderOption(option: SelectOption, index: number) {
    const value = this._getOptionValue(option);
    const isSelected = this._isSelected(value);
    const isFocused = index === this._focusedIndex;

    return html`
      <li
        class="select-option"
        role="option"
        ?selected="${isSelected}"
        ?focused="${isFocused}"
        ?disabled="${option.disabled}"
        aria-selected="${isSelected}"
        @click="${() => this._handleOptionClick(option)}"
        @mouseenter="${() => (this._focusedIndex = index)}"
      >
        ${option.name}
      </li>
    `;
  }

  private _handleInputClick(_e: Event) {
    if (!this.disabled) {
      this._toggleDropdown();
    }
  }

  private _handleToggle(e: Event) {
    e.stopPropagation();
    if (!this.disabled) {
      this._toggleDropdown();
    }
  }

  private _handleClear(e: Event) {
    e.stopPropagation();
    this.value = this.multiple ? [] : null;
    this._dispatchChange();
    this._validate();
  }

  private _handleFocus() {
    this._focused = true;
    this.setAttribute('focused', '');
  }

  private _handleBlur() {
    this._focused = false;
    this.removeAttribute('focused');

    if (!this._touched) {
      this._touched = true;
      this.setAttribute('touched', '');
    }

    this._validate();
  }

  private _handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!this._open) {
          e.preventDefault();
          this._toggleDropdown();
        }
        break;
      case 'Escape':
        if (this._open) {
          e.preventDefault();
          this._closeDropdown();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this._open) {
          this._openDropdown();
        } else {
          this._moveFocus(1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this._open) {
          this._moveFocus(-1);
        }
        break;
    }
  }

  private _handleFilterInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._filterQuery = target.value;
    this._focusedIndex = 0;
  }

  private _handleFilterKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._moveFocus(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._moveFocus(-1);
        break;
      case 'Enter':
        e.preventDefault();
        const filteredOptions = this._getFilteredOptions();
        if (filteredOptions[this._focusedIndex]) {
          this._handleOptionClick(filteredOptions[this._focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._closeDropdown();
        this.selectInput?.focus();
        break;
    }
  }

  private _handleOptionClick(option: SelectOption) {
    if (option.disabled) return;

    const value = this._getOptionValue(option);

    if (this.multiple) {
      const currentValues = [...this._value];
      const index = currentValues.indexOf(value);

      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(value);
      }

      this.value = currentValues;
    } else {
      this.value = value;
      this._closeDropdown();
    }

    this._dispatchChange();
    this._validate();
  }

  private _removeChip(e: Event, option: SelectOption) {
    e.stopPropagation();
    const value = this._getOptionValue(option);
    const currentValues = this._value.filter(v => v !== value);
    this.value = currentValues;
    this._dispatchChange();
    this._validate();
  }

  private _toggleDropdown() {
    this._open ? this._closeDropdown() : this._openDropdown();
  }

  private _openDropdown() {
    if (this.disabled) return;
    this._open = true;
    this._focusedIndex = 0;
    this.dispatchEvent(new Event('open', { bubbles: true, composed: true }));
  }

  private _closeDropdown() {
    this._open = false;
    this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));
  }

  private _moveFocus(direction: number) {
    const filteredOptions = this._getFilteredOptions();
    const maxIndex = filteredOptions.length - 1;

    let newIndex = this._focusedIndex + direction;

    if (newIndex < 0) {
      newIndex = maxIndex;
    } else if (newIndex > maxIndex) {
      newIndex = 0;
    }

    this._focusedIndex = newIndex;
  }

  private _getFilteredOptions(): SelectOption[] {
    if (!this._filterQuery) {
      return this._allOptions;
    }

    const query = this._filterQuery.toLowerCase();
    return this._allOptions.filter(option => option.name.toLowerCase().includes(query));
  }

  private _getOptionValue(option: SelectOption): any {
    return option.value !== undefined ? option.value : option.name;
  }

  private _isSelected(value: any): boolean {
    return this._value.includes(value);
  }

  private _dispatchChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  private _validate() {
    let isValid = true;

    if (this.required && this._value.length === 0) {
      isValid = false;
    }

    this._invalid = !isValid;

    if (this._invalid) {
      this.setAttribute('invalid', '');
      this._internals.setValidity({ valueMissing: true }, 'Please select an option');
    } else {
      this.removeAttribute('invalid');
      this._internals.setValidity({});
    }

    return isValid;
  }

  private _updateActiveState() {
    const hasValue = this._value.length > 0;
    const hasPlaceholder = !!this.placeholder;

    if (this._focused || hasValue || this._open) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }

    if (hasPlaceholder) {
      this.setAttribute('has-placeholder', '');
    } else {
      this.removeAttribute('has-placeholder');
    }

    if (!this.label) {
      this.setAttribute('no-label', '');
    } else {
      this.removeAttribute('no-label');
    }
  }

  private _addClickOutsideListener() {
    this._clickOutsideListener = (e: MouseEvent) => {
      if (!this.contains(e.target as Node)) {
        this._closeDropdown();
      }
    };
    setTimeout(() => {
      document.addEventListener('click', this._clickOutsideListener!);
    }, 0);
  }

  private _removeClickOutsideListener() {
    if (this._clickOutsideListener) {
      document.removeEventListener('click', this._clickOutsideListener);
      this._clickOutsideListener = undefined;
    }
  }

  // Form API
  formResetCallback() {
    this.value = this.multiple ? [] : null;
    this._touched = false;
    this.removeAttribute('touched');
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }
}

if (!customElements.get(SELECT_TAG)) {
  customElements.define(SELECT_TAG, SwimSelect);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-select': SwimSelect;
  }
}
