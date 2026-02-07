import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { radioStyles } from './radio.styles';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

let nextId = 0;

/**
 * SwimRadio - A single radio button matching @swimlane/ngx-ui design system.
 * Use alone (controlled by parent via checked/change) or inside swim-radio-group.
 *
 * @slot - Label content (e.g. text next to the radio)
 *
 * @fires change - Fired when this radio is selected (detail: value)
 * @fires focus - Fired when the control gains focus
 * @fires blur - Fired when the control loses focus
 *
 * @csspart checkmark - The circular radio indicator
 * @csspart content - The label content wrapper
 */
@customElement('swim-radio')
export class SwimRadio extends LitElement {
  static styles = [baseStyles, radioStyles];

  @query('.swim-radio__roving')
  private _roving!: HTMLLabelElement;

  @property({ type: String })
  id = `swim-radio-${++nextId}`;

  /** When in a group, name is set by swim-radio-group. */
  @property({ type: String })
  name = '';

  /** Id for the native radio input (for label for attribute) */
  @property({ type: String, attribute: 'radio-id' })
  radioId = '';

  @property({ type: Number })
  get tabindex(): number {
    return this._tabindex;
  }
  set tabindex(value: number) {
    this._tabindex = coerceNumberProperty(value, 0);
  }
  private _tabindex = 0;

  @property({ type: Boolean, reflect: true })
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    const next = coerceBooleanProperty(value);
    if (this._checked === next) return;
    this._checked = next;
  }
  private _checked = false;

  @property({ type: String })
  value = '';

  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled || this.groupDisabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  /** Set by swim-radio-group when this radio is inside a group */
  @property({ type: Boolean, attribute: false })
  groupDisabled = false;

  /** Set by swim-radio-group when this radio is inside a group */
  @property({ type: Boolean, attribute: false })
  isInGroup = false;

  private get _effectiveTabindex(): number {
    return this.disabled || this.isInGroup ? -1 : this._tabindex;
  }

  private get _inputId(): string {
    return this.radioId || `${this.id}-radio`;
  }

  override focus(options?: FocusOptions): void {
    this._roving?.focus(options);
  }

  private _onClick(ev: Event) {
    ev.preventDefault();
    if (this.disabled) return;
    this._select();
  }

  private _onKeydown(ev: KeyboardEvent) {
    if (ev.key !== ' ' || this.disabled) return;
    ev.stopPropagation();
    ev.preventDefault();
    this._select();
  }

  /** Select this radio. In a group only "select" (set checked); standalone can toggle. */
  private _select() {
    if (this.isInGroup) {
      if (this._checked) return;
      this.checked = true;
    } else {
      this.checked = !this._checked;
    }
    if (this._checked) {
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: this.value,
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _onInputChange(_ev: Event) {
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: this.value,
        bubbles: true,
        composed: true
      })
    );
  }

  private _onFocus(ev: FocusEvent) {
    this.dispatchEvent(new FocusEvent('focus', { ...ev, bubbles: true, composed: true }));
  }

  private _onBlur(ev: FocusEvent) {
    this.dispatchEvent(new FocusEvent('blur', { ...ev, bubbles: true, composed: true }));
  }

  render() {
    const contentId = `${this.id}-content`;
    return html`
      <label
        class="swim-radio__label swim-radio__roving"
        for="${this._inputId}"
        tabindex="${this._effectiveTabindex}"
        role="radio"
        aria-checked="${this._checked}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-labelledby="${contentId}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <input
          type="radio"
          class="swim-radio__input"
          id="${this._inputId}"
          tabindex="-1"
          .checked="${this._checked}"
          ?disabled="${this.disabled}"
          name="${this.name || this.id}"
          aria-checked="${this._checked}"
          @change="${this._onInputChange}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        />
        <span
          part="checkmark"
          class="swim-radio__checkmark ${this._checked ? 'swim-radio__checkmark--checked' : ''}"
        ></span>
        <div part="content" class="swim-radio__content" id="${contentId}">
          <slot></slot>
        </div>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-radio': SwimRadio;
  }
}
