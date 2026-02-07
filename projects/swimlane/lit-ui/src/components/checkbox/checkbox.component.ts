import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { checkboxStyles } from './checkbox.styles';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

let nextId = 0;

/**
 * SwimCheckbox - A checkbox component matching @swimlane/ngx-ui design system
 *
 * @slot - Label content (e.g. text next to the checkbox)
 *
 * @fires change - Fired when checked state changes (detail: Event-like { target: { checked } })
 * @fires checked-change - Fired when checked state changes (detail: boolean)
 * @fires indeterminate-change - Fired when indeterminate state changes (detail: boolean)
 * @fires focus - Fired when the control gains focus
 * @fires blur - Fired when the control loses focus
 *
 * @csspart box - The visual checkbox box
 * @csspart content - The label content wrapper
 */
@customElement('swim-checkbox')
export class SwimCheckbox extends LitElement {
  static styles = [baseStyles, checkboxStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  @query('.swim-checkbox__roving')
  private _roving!: HTMLDivElement;

  /**
   * Unique id for the internal input (for form and accessibility)
   */
  @property({ type: String })
  id = `swim-checkbox-${++nextId}`;

  /**
   * Name for form submission
   */
  @property({ type: String })
  name = '';

  /**
   * Diameter/size of the checkbox box (e.g. '18px')
   */
  @property({ type: String })
  diameter = '18px';

  /**
   * Checked state (alias: value from ngx-ui)
   */
  @property({ type: Boolean, reflect: true, attribute: 'checked' })
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    const next = coerceBooleanProperty(value);
    if (this._checked === next) return;
    this._checked = next;
    this._syncFormValue();
    this.dispatchEvent(new CustomEvent('checked-change', { detail: this._checked, bubbles: true, composed: true }));
  }
  private _checked = false;

  /**
   * Indeterminate state (e.g. "select all" partial state)
   */
  @property({ type: Boolean, reflect: true })
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(value: boolean) {
    const next = coerceBooleanProperty(value);
    if (this._indeterminate === next) return;
    this._indeterminate = next;
    this.dispatchEvent(
      new CustomEvent('indeterminate-change', {
        detail: this._indeterminate,
        bubbles: true,
        composed: true
      })
    );
  }
  private _indeterminate = false;

  /**
   * Tab index for keyboard focus
   */
  @property({ type: Number })
  get tabindex(): number {
    return this._tabindex;
  }
  set tabindex(value: number) {
    this._tabindex = coerceNumberProperty(value, 0);
  }
  private _tabindex = 0;

  /**
   * Whether the checkbox is disabled
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
   * Use round (circular) box instead of square
   */
  @property({ type: Boolean, reflect: true })
  get round(): boolean {
    return this._round;
  }
  set round(value: boolean) {
    this._round = coerceBooleanProperty(value);
  }
  private _round = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncFormValue();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('checked') || changedProperties.has('_checked')) {
      this._syncFormValue();
    }
  }

  /** Delegate focus to the focusable checkbox for form validation and accessibility */
  override focus(options?: FocusOptions): void {
    this._roving?.focus(options);
  }

  private _syncFormValue() {
    this._internals.setFormValue(this._checked ? 'on' : '');
  }

  private _onClick(ev: Event) {
    ev.preventDefault();
    if (this.disabled) return;
    this._toggle();
  }

  private _onKeydown(ev: KeyboardEvent) {
    if (ev.key !== ' ' || this.disabled) return;
    ev.stopPropagation();
    ev.preventDefault();
    this._toggle();
  }

  private _toggle() {
    this.checked = !this.checked;
    this._emitChange();
  }

  private _emitChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          stopPropagation: () => {},
          timeStamp: Date.now(),
          target: { checked: this._checked }
        },
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
      <div
        class="swim-checkbox__roving swim-checkbox__label"
        role="checkbox"
        tabindex="${this.disabled ? -1 : this.tabindex}"
        aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-labelledby="${contentId}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <div
          part="box"
          class="swim-checkbox__box ${this.checked && !this.indeterminate ? 'swim-checkbox__box--checked' : ''} ${this
            .indeterminate
            ? 'swim-checkbox__box--indeterminate'
            : ''}"
          style="width: ${this.diameter}; height: ${this.diameter}; min-width: ${this.diameter}; min-height: ${this
            .diameter};"
        ></div>
        <div part="content" class="swim-checkbox__content" id="${contentId}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-checkbox': SwimCheckbox;
  }
}
