import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { buttonToggleStyles } from './button-toggle.styles';
import { coerceBooleanProperty } from '../../utils/coerce';

let nextId = 0;

/**
 * SwimButtonToggle - A single toggle button for use inside swim-button-toggle-group.
 * Matches @swimlane/ngx-ui design and behavior.
 *
 * @slot - Toggle label/content
 *
 * @fires value-change - Fired when the toggle is selected (detail: value)
 */
const BUTTON_TOGGLE_TAG = 'swim-button-toggle';
export class SwimButtonToggle extends LitElement {
  static styles = [baseStyles, buttonToggleStyles];

  private _uniqueId = `swim-button-toggle-${++nextId}`;

  /**
   * Element id (defaults to unique id)
   */
  @property({ type: String })
  get id(): string {
    return this._id ?? this._uniqueId;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id?: string;

  /**
   * Name for form association when used outside a group
   */
  @property({ type: String })
  name = this._uniqueId;

  /**
   * Value of this toggle (emitted on select).
   * When set via attribute, it is a string; can be any type when set programmatically.
   */
  @property()
  value: unknown = false;

  /**
   * Whether this toggle is currently selected
   */
  @property({ type: Boolean, reflect: true })
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    const next = coerceBooleanProperty(value);
    if (this._checked !== next) {
      this._checked = next;
      this.requestUpdate('checked');
    }
  }
  @state()
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

  render() {
    return html`
      <button
        type="button"
        class="swim-button-toggle ${this._checked ? 'swim-button-toggle--checked' : ''}"
        id="${this.id}"
        ?disabled="${this.disabled}"
        aria-pressed="${this._checked}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        @click="${this._handleClick}"
      >
        <span class="swim-button-toggle__content">
          <slot></slot>
        </span>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled || this.checked) return;
    this._checked = true;
    this.dispatchEvent(
      new CustomEvent('value-change', {
        detail: this.value,
        bubbles: true,
        composed: true
      })
    );
  }
}

if (!customElements.get(BUTTON_TOGGLE_TAG)) {
  customElements.define(BUTTON_TOGGLE_TAG, SwimButtonToggle);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-button-toggle': SwimButtonToggle;
  }
}
