import { LitElement, html, nothing, PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../icon/icon.component';
import { baseStyles } from '../../styles/base';
import { scrollbarStyles } from '../../styles/scrollbars';
import { inputStyles } from './input.styles';
import { InputTypes } from './input-types.enum';
import { InputAppearance } from './input-appearance.enum';
import { InputSize } from './input-size.enum';
import { coerceBooleanProperty } from '../../utils/coerce';

/**
 * SwimInput - An input component matching @swimlane/ngx-ui design system
 *
 * @slot prefix - Content to show before the input
 * @slot suffix - Content to show after the input
 * @slot hint - Hint text below the input
 *
 * @fires change - Fired when the value changes
 * @fires input - Fired on input events
 * @fires focus - Fired when the input gains focus
 * @fires blur - Fired when the input loses focus
 *
 * @csspart input - The native input/textarea element
 * @csspart label - The label element
 */
const INPUT_TAG = 'swim-input';
export class SwimInput extends LitElement {
  static styles = [baseStyles, scrollbarStyles, inputStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  @query('.input-box, .input-textarea')
  private inputElement!: HTMLInputElement | HTMLTextAreaElement;

  /**
   * Input type
   */
  @property({ type: String })
  type: InputTypes = InputTypes.text;

  /**
   * Input label
   */
  @property({ type: String })
  label = '';

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Hint text
   */
  @property({ type: String })
  hint = '';

  /**
   * Input value
   */
  @property({ type: String })
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    const oldValue = this._value;
    this._value = val;
    this._internals.setFormValue(val);
    this.requestUpdate('value', oldValue);
    this._updateActiveState();
  }
  private _value = '';

  /**
   * Input name for forms
   */
  @property({ type: String })
  name = '';

  /**
   * Input ID
   */
  @property({ type: String })
  id = `swim-input-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Whether the input is disabled
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
   * Whether the input is readonly
   */
  @property({ type: Boolean, reflect: true })
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly = false;

  /**
   * Whether the input is required
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
   * Whether to autofocus
   */
  @property({ type: Boolean })
  get autofocus(): boolean {
    return this._autofocus;
  }
  set autofocus(value: boolean) {
    this._autofocus = coerceBooleanProperty(value);
  }
  private _autofocus = false;

  /**
   * Autocomplete attribute
   */
  @property({ type: String })
  autocomplete: 'on' | 'off' | 'new-password' = 'off';

  /**
   * Input appearance
   */
  @property({ type: String, reflect: true })
  appearance: InputAppearance = InputAppearance.legacy;

  /**
   * Input size
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
   * Enable password toggle
   */
  @property({ type: Boolean, attribute: 'password-toggle-enabled' })
  get passwordToggleEnabled(): boolean {
    return this._passwordToggleEnabled;
  }
  set passwordToggleEnabled(value: boolean) {
    this._passwordToggleEnabled = coerceBooleanProperty(value);
  }
  private _passwordToggleEnabled = false;

  /**
   * Min value (for number type)
   */
  @property({ type: Number })
  min?: number;

  /**
   * Max value (for number type)
   */
  @property({ type: Number })
  max?: number;

  /**
   * Min length
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Max length
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Textarea rows
   */
  @property({ type: Number, attribute: 'textarea-rows' })
  textareaRows = 3;

  /**
   * Required indicator text
   */
  @property({ type: String, attribute: 'required-indicator' })
  requiredIndicator = '*';

  /**
   * Tab index
   */
  @property({ type: Number })
  tabindex?: number;

  @state()
  private _focused = false;

  @state()
  private _passwordVisible = false;

  @state()
  private _touched = false;

  @state()
  private _dirty = false;

  @state()
  private _invalid = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateActiveState();
  }

  firstUpdated() {
    if (this.autofocus && this.inputElement) {
      setTimeout(() => {
        this.inputElement.focus();
      });
    }
  }

  /** Delegate focus to the internal input so form validation can focus invalid controls. */
  override focus(options?: FocusOptions): void {
    this.inputElement?.focus(options);
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._updateActiveState();
    }

    if (changedProperties.has('required') || changedProperties.has('min') || changedProperties.has('max')) {
      this._validate();
    }
  }

  render() {
    const isTextarea = this.type === InputTypes.textarea;
    const showPasswordToggle = this.type === InputTypes.password && this.passwordToggleEnabled && !this.disabled;
    const showSpinner = this.type === InputTypes.number && !this.disabled;
    const inputType = this._passwordVisible ? InputTypes.text : this.type;

    return html`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${isTextarea ? this._renderTextarea() : this._renderInput(inputType)}
              ${showSpinner
                ? html`
                    <div class="numeric-spinner">
                      <button
                        type="button"
                        class="spinner-btn"
                        @mousedown="${this._incrementValue}"
                        @mouseup="${this._stopSpinner}"
                        @mouseleave="${this._stopSpinner}"
                        aria-label="Increment"
                      >
                        <swim-icon font-icon="chevron-bold-up"></swim-icon>
                      </button>
                      <button
                        type="button"
                        class="spinner-btn"
                        @mousedown="${this._decrementValue}"
                        @mouseup="${this._stopSpinner}"
                        @mouseleave="${this._stopSpinner}"
                        aria-label="Decrement"
                      >
                        <swim-icon font-icon="chevron-bold-down"></swim-icon>
                      </button>
                    </div>
                  `
                : nothing}
              ${showPasswordToggle
                ? html`
                    <button
                      type="button"
                      class="password-toggle"
                      @click="${this._togglePassword}"
                      aria-label="Toggle password visibility"
                    >
                      <swim-icon font-icon="${this._passwordVisible ? 'eye-disabled' : 'eye'}"></swim-icon>
                    </button>
                  `
                : nothing}
            </div>
            <label class="input-label" part="label" for="${this.id}">
              ${this.label} ${this.required ? html`<span>${this.requiredIndicator}</span>` : nothing}
            </label>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="input-underline ${this.readonly ? 'visibility-hidden' : ''}">
          <div class="underline-fill"></div>
        </div>
        <div class="input-hint ${!this.withHint ? 'hidden' : ''}">
          <slot name="hint">${this.hint}</slot>
        </div>
      </div>
    `;
  }

  private _renderInput(inputType: InputTypes) {
    return html`
      <input
        part="input"
        class="input-box"
        type="${inputType}"
        id="${this.id}"
        name="${this.name}"
        .value="${live(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${ifDefined(this.min)}"
        max="${ifDefined(this.max)}"
        minlength="${ifDefined(this.minlength)}"
        maxlength="${ifDefined(this.maxlength)}"
        tabindex="${ifDefined(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      />
    `;
  }

  private _renderTextarea() {
    return html`
      <textarea
        part="input"
        class="input-textarea swim-scroll"
        id="${this.id}"
        name="${this.name}"
        .value="${live(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${ifDefined(this.minlength)}"
        maxlength="${ifDefined(this.maxlength)}"
        tabindex="${ifDefined(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      ></textarea>
    `;
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;

    if (!this._dirty) {
      this._dirty = true;
      this.setAttribute('dirty', '');
    }

    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleChange(_e: Event) {
    this._validate();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _handleFocus(_e: FocusEvent) {
    this._focused = true;
    this.setAttribute('focused', '');
    this.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
  }

  private _handleBlur(_e: FocusEvent) {
    this._focused = false;
    this.removeAttribute('focused');

    if (!this._touched) {
      this._touched = true;
      this.setAttribute('touched', '');
    }

    this._validate();
    this.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true }));
  }

  private _togglePassword() {
    this._passwordVisible = !this._passwordVisible;
    // Refocus the input after toggling
    this.inputElement?.focus();
  }

  private _spinnerInterval?: number;
  private _spinnerTimeout?: number;

  private _incrementValue(e: Event) {
    e.preventDefault();
    if (this.disabled) return;

    this._increment();
    this._spinnerTimeout = window.setTimeout(() => {
      this._spinnerInterval = window.setInterval(() => this._increment(), 50);
    }, 500);
  }

  private _decrementValue(e: Event) {
    e.preventDefault();
    if (this.disabled) return;

    this._decrement();
    this._spinnerTimeout = window.setTimeout(() => {
      this._spinnerInterval = window.setInterval(() => this._decrement(), 50);
    }, 500);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopSpinner();
  }

  private _stopSpinner() {
    if (this._spinnerTimeout !== undefined) {
      clearTimeout(this._spinnerTimeout);
      this._spinnerTimeout = undefined;
    }
    if (this._spinnerInterval !== undefined) {
      clearInterval(this._spinnerInterval);
      this._spinnerInterval = undefined;
    }
  }

  private _increment() {
    if (this.inputElement && this.type === InputTypes.number) {
      const input = this.inputElement as HTMLInputElement;
      const currentValue = parseFloat(input.value) || 0;

      if (this.max !== undefined && currentValue >= this.max) return;

      const newValue = currentValue + 1;
      this.value = newValue.toString();
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private _decrement() {
    if (this.inputElement && this.type === InputTypes.number) {
      const input = this.inputElement as HTMLInputElement;
      const currentValue = parseFloat(input.value) || 0;

      if (this.min !== undefined && currentValue <= this.min) return;

      const newValue = currentValue - 1;
      this.value = newValue.toString();
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private _validate() {
    let isValid = true;

    if (this.required && !this.value) {
      isValid = false;
    }

    if (this.type === InputTypes.number && this.value) {
      const numValue = parseFloat(this.value);
      if (this.min !== undefined && numValue < this.min) {
        isValid = false;
      }
      if (this.max !== undefined && numValue > this.max) {
        isValid = false;
      }
    }

    if (this.minlength && this.value.length < this.minlength) {
      isValid = false;
    }

    if (this.maxlength && this.value.length > this.maxlength) {
      isValid = false;
    }

    // Check native validity
    if (this.inputElement) {
      const nativeValidity = this.inputElement.validity;
      if (!nativeValidity.valid) {
        isValid = false;
      }
    }

    this._invalid = !isValid;

    if (this._invalid) {
      this.setAttribute('invalid', '');
      this._internals.setValidity({ customError: true }, 'Invalid input');
    } else {
      this.removeAttribute('invalid');
      this._internals.setValidity({});
    }

    return isValid;
  }

  private _updateActiveState() {
    const hasValue = this.value && this.value.length > 0;
    const hasPlaceholder = !!this.placeholder;

    if (this._focused || hasValue) {
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

  // Form API
  formResetCallback() {
    this.value = '';
    this._touched = false;
    this._dirty = false;
    this.removeAttribute('touched');
    this.removeAttribute('dirty');
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }
}

if (!customElements.get(INPUT_TAG)) {
  customElements.define(INPUT_TAG, SwimInput);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-input': SwimInput;
  }
}
