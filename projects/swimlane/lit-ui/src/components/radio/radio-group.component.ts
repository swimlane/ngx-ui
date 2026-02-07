import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { radioGroupStyles } from './radio.styles';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';
import type { SwimRadio } from './radio.component';

let nextId = 0;

function mod(v: number, n: number): number {
  return ((v % n) + n) % n;
}

/**
 * SwimRadioGroup - A group of swim-radio buttons matching @swimlane/ngx-ui.
 * Manages value, name, disabled, and arrow-key navigation.
 *
 * @slot - Default slot for swim-radio children
 *
 * @fires change - Fired when selection changes (detail: selected value)
 * @fires focus - Fired when the group or a child gains focus
 * @fires blur - Fired when focus leaves the group
 */
@customElement('swim-radio-group')
export class SwimRadioGroup extends LitElement {
  static styles = [baseStyles, radioGroupStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  @query('slot')
  private _slot!: HTMLSlotElement;

  @query('.swim-radio-group__slot')
  private _slotWrapper!: HTMLDivElement;

  @property({ type: String })
  id = `swim-radio-group-${++nextId}`;

  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._updateRadioDisabledState();
  }
  private _disabled = false;

  @property({ type: String })
  get value(): unknown {
    return this._value;
  }
  set value(v: unknown) {
    if (this._value === v) return;
    this._value = v;
    this._updateSelectedFromValue();
    this._internals?.setFormValue(String(this._value));
  }
  private _value: unknown = '';

  @property({ type: String })
  name = '';

  @property({ type: Number })
  get focusIndex(): number {
    return this._focusIndex;
  }
  set focusIndex(val: number) {
    this._focusIndex = coerceNumberProperty(val, -1);
    this._focusOn(this._focusIndex);
  }
  private _focusIndex = -1;

  @property({ type: Number })
  get tabindex(): number {
    return this.disabled ? -1 : this._tabindex;
  }
  set tabindex(val: number) {
    this._tabindex = coerceNumberProperty(val, 0);
  }
  private _tabindex = 0;

  private _radios: SwimRadio[] = [];
  private _changeHandler = (e: Event) => this._onRadioChange(e as CustomEvent<unknown>);

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this._changeHandler);
    this.addEventListener('focus', this._onGroupFocus as EventListener);
    this.addEventListener('blur', this._onGroupBlur);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('change', this._changeHandler);
    this.removeEventListener('focus', this._onGroupFocus);
    this.removeEventListener('blur', this._onGroupBlur);
  }

  firstUpdated() {
    this._slot?.addEventListener('slotchange', () => this._syncRadios());
    this._syncRadios();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('name') || changedProperties.has('disabled')) {
      this._updateSelectedFromValue();
      this._updateRadioDisabledState();
      this._updateRadioNames();
    }
  }

  private _syncRadios() {
    const slot = this._slot;
    const nodes = slot?.assignedElements?.() ?? [];
    this._radios = nodes.filter(
      (el): el is SwimRadio => el instanceof HTMLElement && el.tagName?.toLowerCase() === 'swim-radio'
    );
    this._updateRadioNames();
    this._updateRadioDisabledState();
    this._updateSelectedFromValue();
  }

  private _updateRadioNames() {
    const name = this.name || this.id;
    this._radios.forEach(radio => {
      (radio as SwimRadio).name = name;
      (radio as SwimRadio).isInGroup = true;
    });
  }

  private _updateRadioDisabledState() {
    this._radios.forEach(radio => {
      (radio as SwimRadio).groupDisabled = this._disabled;
    });
  }

  private _updateSelectedFromValue() {
    this._radios.forEach(radio => {
      (radio as SwimRadio).checked = this._value === (radio as SwimRadio).value;
    });
  }

  private _onRadioChange(e: CustomEvent<unknown>) {
    const target = e.target as SwimRadio;
    if (!target || target.tagName?.toLowerCase() !== 'swim-radio') return;
    const val = e.detail;
    if (this._value === val) return;
    this._value = val;
    this._updateSelectedFromValue();
    this._internals.setFormValue(String(this._value));
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: this._value,
        bubbles: true,
        composed: true
      })
    );
  }

  private _onGroupFocus = (e: FocusEvent) => {
    if (e.target !== this._slotWrapper) return;
    const selected = this._radios.find(r => (r as SwimRadio).checked);
    if (selected) {
      this._focusIndex = this._radios.indexOf(selected);
      this._focusOn(this._focusIndex);
    } else {
      this._focusFirst();
    }
  };

  private _onGroupBlur = () => {
    this.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true }));
  };

  private _focusFirst() {
    if (this.disabled || !this._radios.length) return;
    for (let i = 0; i < this._radios.length; i++) {
      if (!(this._radios[i] as SwimRadio).disabled) {
        this._focusIndex = i;
        this._focusOn(i);
        return;
      }
    }
  }

  private _focusOn(index: number) {
    if (this.disabled || index < 0 || index >= this._radios.length) return;
    (this._radios[index] as SwimRadio).focus();
  }

  private _selectIndex(index: number) {
    if (this.disabled || index < 0 || index >= this._radios.length) return;
    const radio = this._radios[index] as SwimRadio;
    if (radio.disabled) return;
    this.value = radio.value;
  }

  private _focusIn(dir: 1 | -1) {
    if (this.disabled || !this._radios.length) return;
    const len = this._radios.length;
    for (let i = 1; i <= len; i++) {
      const ii = mod(this._focusIndex + dir * i, len);
      if (!(this._radios[ii] as SwimRadio).disabled) {
        this._focusIndex = ii;
        this._focusOn(ii);
        return;
      }
    }
  }

  private _onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        this._focusIn(-1);
        this._selectIndex(this._focusIndex);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        this._focusIn(1);
        this._selectIndex(this._focusIndex);
        break;
    }
  }

  render() {
    return html`
      <div
        class="swim-radio-group__slot"
        role="radiogroup"
        tabindex="${this.tabindex}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        @keydown="${this._onKeydown}"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-radio-group': SwimRadioGroup;
  }
}
