import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { progressSpinnerStyles } from './progress-spinner.styles';
import { ProgressSpinnerMode } from './progress-spinner-mode.enum';
import { SpinnerAppearance } from './spinner-appearance.enum';
import type { SpinnerLabel } from './spinner-label.interface';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

const INDETERMINATE_VALUE = 50;
const INDETERMINATE_TOTAL = 100;

/** ViewBox is fixed 0 0 100 100; circle and stroke-dash math use this radius in viewBox units. */
const VIEWBOX_SIZE = 100;
const VIEWBOX_RADIUS = VIEWBOX_SIZE / 2;
const VIEWBOX_CIRCUMFERENCE = VIEWBOX_RADIUS * 2 * Math.PI;

/** Default swim-icon names when appearance="icon" and no slot/icon name is set. */
const DEFAULT_IN_PROGRESS_ICON = 'cloud-upload';
const DEFAULT_COMPLETE_ICON = 'check';
const DEFAULT_FAIL_ICON = 'x';

/**
 * SwimProgressSpinner - Progress spinner matching @swimlane/ngx-ui design system.
 * Supports determinate and indeterminate modes, optional center icons (built-in swim-icon, icon name props, or slotted), and labels.
 *
 * When appearance="icon", center icon is always a swim-icon: slotted content, icon name props, or built-in defaults (cloud-upload, check, x).
 * Import @swimlane/lit-ui/icon so swim-icon is defined.
 *
 * @slot in-progress-icon - Custom content shown while loading (e.g. <swim-icon slot="in-progress-icon" font-icon="upload">)
 * @slot complete-icon - Custom content shown when complete and not failed
 * @slot fail-icon - Custom content shown when complete and failed
 *
 * @csspart container - The spinner container (circle wrapper)
 * @csspart label - The label container (when spinner-label is set)
 */
const PROGRESS_SPINNER_TAG = 'swim-progress-spinner';
export class SwimProgressSpinner extends LitElement {
  static styles = progressSpinnerStyles;

  /**
   * Mode: indeterminate (rotating) or determinate (value/total).
   */
  @property({ type: String, reflect: true })
  mode: ProgressSpinnerMode = ProgressSpinnerMode.Indeterminate;

  /**
   * Stroke color. Use design tokens, e.g. var(--blue-500).
   */
  @property({ type: String })
  color = 'var(--blue-500)';

  /**
   * Color when complete and isFailure is true.
   */
  @property({ attribute: 'fail-status-color', type: String })
  failStatusColor = 'var(--red-500)';

  /**
   * Appearance: default (circle only) or icon (center icons when applicable).
   */
  @property({ type: String, reflect: true })
  appearance: SpinnerAppearance = SpinnerAppearance.Default;

  /**
   * Icon name for in-progress state (renders swim-icon when set). Use with appearance="icon".
   * Ignored if content is slotted into in-progress-icon.
   */
  @property({ type: String, attribute: 'in-progress-icon-name' })
  inProgressIconName = '';

  /**
   * Icon name for complete state (renders swim-icon when set). Use with appearance="icon".
   * Ignored if content is slotted into complete-icon.
   */
  @property({ type: String, attribute: 'complete-icon-name' })
  completeIconName = '';

  /**
   * Icon name for failure state (renders swim-icon when set). Use with appearance="icon".
   * Ignored if content is slotted into fail-icon.
   */
  @property({ type: String, attribute: 'fail-icon-name' })
  failIconName = '';

  /**
   * Whether the operation failed (shows fail icon/color when complete).
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-failure' })
  get isFailure(): boolean {
    return this._isFailure;
  }
  set isFailure(value: boolean) {
    this._isFailure = coerceBooleanProperty(value);
  }
  private _isFailure = false;

  /**
   * Labels for in-progress, complete, and fail states.
   */
  @property({ attribute: false })
  spinnerLabel?: SpinnerLabel;

  @property({ type: Number })
  get value(): number {
    return this._value;
  }
  set value(v: number) {
    const next = coerceNumberProperty(v, 0);
    if (this._value !== next) this._value = next;
  }
  private _value = 0;

  @property({ type: Number })
  get total(): number {
    return this._total;
  }
  set total(t: number) {
    const next = coerceNumberProperty(t, 100);
    if (this._total !== next) this._total = next;
  }
  private _total = 100;

  @property({ type: Number })
  get diameter(): number {
    return this._diameter;
  }
  set diameter(d: number) {
    const next = coerceNumberProperty(d, 100);
    if (this._diameter !== next) this._diameter = next;
  }
  private _diameter = 100;

  @property({ attribute: 'stroke-width', type: Number })
  get strokeWidth(): number {
    return this._strokeWidth;
  }
  set strokeWidth(s: number) {
    const next = coerceNumberProperty(s, 3);
    if (this._strokeWidth !== next) this._strokeWidth = next;
  }
  private _strokeWidth = 3;

  /** Circumference in viewBox units for stroke-dasharray/offset (fixed viewBox 0 0 100 100). */
  private get circumference(): number {
    return VIEWBOX_CIRCUMFERENCE;
  }

  private get modeValue(): number {
    return this.mode === ProgressSpinnerMode.Determinate || this.isComplete ? this.value : INDETERMINATE_VALUE;
  }

  private get modeTotal(): number {
    return this.mode === ProgressSpinnerMode.Determinate || this.isComplete ? this.total : INDETERMINATE_TOTAL;
  }

  private get percentage(): number {
    return (100 / this.modeTotal) * this.modeValue;
  }

  get isComplete(): boolean {
    return this.value >= this.total && this.total > 0;
  }

  private get spinnerColor(): string {
    return this.isComplete && this.isFailure ? this.failStatusColor : this.color;
  }

  private get strokeDasharray(): string {
    return `${this.circumference} ${this.circumference}`;
  }

  private get strokeDashoffset(): number {
    return this.circumference - (this.percentage / 100) * this.circumference;
  }

  private hasSlotContent(name: string): boolean {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${name}"]`);
    return Boolean(slot?.assignedNodes().length);
  }

  private _boundSlotChange = () => this.requestUpdate();

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('slotchange', this._boundSlotChange);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('slotchange', this._boundSlotChange);
    super.disconnectedCallback();
  }

  /** Resolved icon name for in-progress: slot/prop or default. */
  private get effectiveInProgressIcon(): string {
    if (this.hasSlotContent('in-progress-icon')) return '';
    return this.inProgressIconName || (this.appearance === SpinnerAppearance.Icon ? DEFAULT_IN_PROGRESS_ICON : '');
  }

  /** Resolved icon name for complete: slot/prop or default. */
  private get effectiveCompleteIcon(): string {
    if (this.hasSlotContent('complete-icon')) return '';
    return this.completeIconName || (this.appearance === SpinnerAppearance.Icon ? DEFAULT_COMPLETE_ICON : '');
  }

  /** Resolved icon name for failure: slot/prop or default. */
  private get effectiveFailIcon(): string {
    if (this.hasSlotContent('fail-icon')) return '';
    return this.failIconName || (this.appearance === SpinnerAppearance.Icon ? DEFAULT_FAIL_ICON : '');
  }

  render() {
    const showInProgressIcon =
      this.appearance === SpinnerAppearance.Icon &&
      !this.isComplete &&
      (this.effectiveInProgressIcon || this.hasSlotContent('in-progress-icon'));
    const showCompleteIcon =
      this.appearance === SpinnerAppearance.Icon &&
      this.isComplete &&
      !this.isFailure &&
      (this.effectiveCompleteIcon || this.hasSlotContent('complete-icon'));
    const showFailIcon =
      this.appearance === SpinnerAppearance.Icon &&
      this.isComplete &&
      this.isFailure &&
      (this.effectiveFailIcon || this.hasSlotContent('fail-icon'));

    return html`
      <div
        class="swim-progress-spinner__container ${this.appearance === SpinnerAppearance.Icon
          ? 'swim-progress-spinner__container--icon'
          : ''}"
        part="container"
        style="--spinner-color: ${this.spinnerColor}"
        role="progressbar"
        aria-valuenow="${this.mode === ProgressSpinnerMode.Determinate ? this.value : nothing}"
        aria-valuemin="0"
        aria-valuemax="${this.mode === ProgressSpinnerMode.Determinate ? this.total : nothing}"
        aria-label="Progress"
      >
        <svg
          class="swim-progress-spinner__svg"
          viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}"
          width="${this.diameter}"
          height="${this.diameter}"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            class="swim-progress-spinner__circle"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${this.strokeDasharray}"
            stroke-dashoffset="${this.strokeDashoffset}"
            r="${VIEWBOX_RADIUS}"
            cx="${VIEWBOX_RADIUS}"
            cy="${VIEWBOX_RADIUS}"
          ></circle>
        </svg>

        ${showInProgressIcon
          ? html`
              <div class="swim-progress-spinner__icon-in-progress">
                ${this.hasSlotContent('in-progress-icon')
                  ? html`<slot name="in-progress-icon"></slot>`
                  : html`<swim-icon font-icon="${this.effectiveInProgressIcon}"></swim-icon>`}
              </div>
            `
          : showCompleteIcon
          ? html`
              <div class="swim-progress-spinner__icon-complete">
                ${this.hasSlotContent('complete-icon')
                  ? html`<slot name="complete-icon"></slot>`
                  : html`<swim-icon font-icon="${this.effectiveCompleteIcon}"></swim-icon>`}
              </div>
            `
          : showFailIcon
          ? html`
              <div class="swim-progress-spinner__icon-failure">
                ${this.hasSlotContent('fail-icon')
                  ? html`<slot name="fail-icon"></slot>`
                  : html`<swim-icon font-icon="${this.effectiveFailIcon}"></swim-icon>`}
              </div>
            `
          : nothing}
      </div>

      ${this.spinnerLabel
        ? html`
            <div class="swim-progress-spinner__label" part="label">
              ${!this.isComplete && this.spinnerLabel.inProgressLabel
                ? html`<h4>${this.spinnerLabel.inProgressLabel}</h4>`
                : this.isComplete && !this.isFailure && this.spinnerLabel.completeLabel
                ? html`<h4>${this.spinnerLabel.completeLabel}</h4>`
                : this.isComplete && this.isFailure && this.spinnerLabel.failLabel
                ? html`<h4>${this.spinnerLabel.failLabel}</h4>`
                : nothing}
            </div>
          `
        : nothing}
    `;
  }
}

if (!customElements.get(PROGRESS_SPINNER_TAG)) {
  customElements.define(PROGRESS_SPINNER_TAG, SwimProgressSpinner);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-progress-spinner': SwimProgressSpinner;
  }
}
