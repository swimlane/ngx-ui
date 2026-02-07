import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { toggleStyles } from './toggle.styles';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

/** Converter so show-icons="false" is respected (Lit's default Boolean ignores attribute value). */
const booleanAttrConverter = {
  fromAttribute: (value: string | null): boolean => value !== 'false' && value !== '',
  toAttribute: (value: boolean): string => (value ? 'true' : 'false')
};

let nextId = 0;

/**
 * SwimToggle - A toggle (switch) component matching @swimlane/ngx-ui design system.
 * Form-associated; use with name and optional required. Supports label text or slot content.
 *
 * @slot - Label content (alternative to the label attribute)
 *
 * @fires change - Fired when checked state changes (detail: Event-like { target: { checked } })
 * @fires focus - Fired when the control gains focus
 * @fires blur - Fired when the control loses focus
 *
 * @csspart track - The pill/track element
 * @csspart thumb - The sliding thumb
 * @csspart text - The label text wrapper
 */
@customElement('swim-toggle')
export class SwimToggle extends LitElement {
  static styles = [baseStyles, toggleStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  @query('.swim-toggle__roving')
  private _roving!: HTMLDivElement;

  /**
   * Unique id for the internal input (for form and accessibility)
   */
  @property({ type: String })
  id = `swim-toggle-${++nextId}`;

  /**
   * Name for form submission
   */
  @property({ type: String })
  name = '';

  /**
   * Label text (alternative to slot content)
   */
  @property({ type: String })
  label = '';

  /**
   * Checked (on) state. Reflects as attribute for styling.
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
  }
  private _checked = false;

  /**
   * Whether the toggle is disabled
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
   * Whether the toggle is required (for forms)
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
   * Whether to show check/x icons inside the track
   */
  @property({ type: Boolean, attribute: 'show-icons', converter: booleanAttrConverter })
  get showIcons(): boolean {
    return this._showIcons;
  }
  set showIcons(value: boolean) {
    this._showIcons = value !== undefined && value !== null ? coerceBooleanProperty(value) : true;
  }
  private _showIcons = true;

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

  override focus(options?: FocusOptions): void {
    this._roving?.focus(options);
  }

  private _syncFormValue() {
    this._internals.setFormValue(this._checked ? 'on' : '');
    if (this.required && !this._checked) {
      this._internals.setValidity({ valueMissing: true }, 'This field is required');
    } else {
      this._internals.setValidity({});
    }
    const input = this.shadowRoot?.querySelector('.swim-toggle__input') as HTMLInputElement | null;
    if (input) {
      input.checked = this._checked;
      input.required = this.required;
    }
  }

  private _onClick(ev: Event) {
    ev.preventDefault();
    if (this.disabled) return;
    this._toggle();
  }

  private _onKeydown(ev: KeyboardEvent) {
    if (ev.key !== ' ' && ev.key !== 'Enter') return;
    ev.preventDefault();
    if (this.disabled) return;
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

  private _onInputChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (this._checked !== input.checked) {
      this._checked = input.checked;
      this.requestUpdate(); // re-render when label click toggles the input
      this._syncFormValue();
      this._emitChange();
    }
  }

  render() {
    const textId = `${this.id}-text`;
    return html`
      <div class="swim-toggle">
        <input
          class="swim-toggle__input"
          type="checkbox"
          id="${this.id}"
          name="${this.name || undefined}"
          ?checked="${this._checked}"
          ?required="${this.required}"
          ?disabled="${this.disabled}"
          tabindex="-1"
          aria-hidden="true"
          @change="${this._onInputChange}"
        />
        <div
          class="swim-toggle__roving swim-toggle__track"
          part="track"
          role="switch"
          tabindex="${this.disabled ? -1 : this.tabindex}"
          aria-checked="${this._checked}"
          aria-disabled="${this.disabled ? 'true' : 'false'}"
          aria-labelledby="${textId}"
          @click="${this._onClick}"
          @keydown="${this._onKeydown}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        >
          <span class="swim-toggle__thumb" part="thumb"></span>
          ${this.showIcons
            ? this._checked
              ? html`<span class="swim-toggle__icon swim-toggle__icon--on" aria-hidden="true"
                  ><swim-icon font-icon="check"></swim-icon
                ></span>`
              : html`<span class="swim-toggle__icon swim-toggle__icon--off" aria-hidden="true"
                  ><swim-icon font-icon="x"></swim-icon
                ></span>`
            : ''}
        </div>
        <label class="swim-toggle__text" part="text" id="${textId}" for="${this.id}">
          ${this.label ? html`<span>${this.label}</span>` : ''}
          <slot></slot>
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-toggle': SwimToggle;
  }
}
