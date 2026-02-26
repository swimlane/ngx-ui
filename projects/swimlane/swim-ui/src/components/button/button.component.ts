import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { buttonStyles } from './button.styles';
import { ButtonState } from './button-state.enum';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';
import '../icon/icon.component';

const BUTTON_TAG = 'swim-button';

/**
 * SwimButton - A button component matching @swimlane/ngx-ui design system
 *
 * @slot - Button content
 *
 * @fires click - Native click event (when not disabled or in progress)
 *
 * @csspart button - The native button element
 */
export class SwimButton extends LitElement {
  static styles = [baseStyles, buttonStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  /**
   * Button variant/style
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'primary' | 'warning' | 'danger' | 'link' | 'bordered' = 'default';

  /**
   * Button size
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Whether the button is disabled
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
   * Button state for async operations
   */
  @property({ type: String, reflect: true })
  get state(): ButtonState {
    return this._state;
  }
  set state(value: ButtonState) {
    this._state = value;
    this._updateStateFlags();
  }
  private _state: ButtonState = ButtonState.Active;

  /**
   * HTML button type attribute
   */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Timeout in milliseconds before returning to active state after success/fail.
   * Only used when state is set by a promise. When undefined, promise-driven
   * state still auto-resets after 3000ms; set to 0 to disable auto-reset.
   */
  @property({ type: Number })
  get timeout(): number | undefined {
    return this._timeout;
  }
  set timeout(value: number | undefined) {
    this._timeout = value === undefined ? undefined : coerceNumberProperty(value);
  }
  private _timeout: number | undefined;

  /**
   * Promise to track - automatically updates state based on promise resolution
   */
  @property({ attribute: false })
  get promise(): Promise<any> | undefined {
    return this._promise;
  }
  set promise(value: Promise<any> | undefined) {
    this._promise = value;
    this._handlePromise();
  }
  private _promise: Promise<any> | undefined;

  @state()
  private _inProgress = false;

  @state()
  private _success = false;

  @state()
  private _fail = false;

  private _timer?: number;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateState();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  render() {
    return html`
      <button part="button" type="button" ?disabled="${this.disabled}" @click="${this._handleClick}">
        <span class="content">
          <slot></slot>
        </span>
        <span class="state-icon">${this._renderStateIcon()}</span>
      </button>
    `;
  }

  private _renderStateIcon() {
    if (this._inProgress) {
      return html`<swim-icon class="state-icon" font-icon="loading"></swim-icon>`;
    }
    if (this._success) {
      return html`<swim-icon class="state-icon" font-icon="check"></swim-icon>`;
    }
    if (this._fail) {
      return html`<swim-icon class="state-icon" font-icon="x"></swim-icon>`;
    }
    return nothing;
  }

  private _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    const form = this._internals.form;
    if (form) {
      if (this.type === 'submit') {
        form.requestSubmit();
      } else if (this.type === 'reset') {
        form.reset();
      }
    }
  }

  private _updateStateFlags() {
    this._inProgress = this._state === ButtonState.InProgress;
    this._success = this._state === ButtonState.Success;
    this._fail = this._state === ButtonState.Fail;
  }

  private _updateState() {
    if (!this._state) {
      this.state = ButtonState.Active;
    }
  }

  private _scheduleReturnToActive() {
    const delay = this.timeout ?? 3000;
    if (delay <= 0) return;
    this._clearTimer();
    this._timer = window.setTimeout(() => {
      this.state = ButtonState.Active;
    }, delay);
  }

  private _handlePromise() {
    if (this._promise) {
      this.state = ButtonState.InProgress;

      this._promise
        .then(() => {
          this.state = ButtonState.Success;
          this._scheduleReturnToActive();
        })
        .catch(() => {
          this.state = ButtonState.Fail;
          this._scheduleReturnToActive();
        });
    }
  }

  private _clearTimer() {
    if (this._timer !== undefined) {
      clearTimeout(this._timer);
      this._timer = undefined;
    }
  }
}

if (!customElements.get(BUTTON_TAG)) {
  customElements.define(BUTTON_TAG, SwimButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-button': SwimButton;
  }
}
