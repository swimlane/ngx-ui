import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { progressSpinnerStyles } from './progress-spinner.styles';
import { ProgressSpinnerMode } from './progress-spinner-mode.enum';
import { SpinnerAppearance } from './spinner-appearance.enum';
import type { SpinnerLabel } from './spinner-label.interface';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

const INDETERMINATE_VALUE = 50;
const INDETERMINATE_TOTAL = 100;

/**
 * SwimProgressSpinner - Progress spinner matching @swimlane/ngx-ui design system.
 * Supports determinate and indeterminate modes, optional center icons, and labels.
 *
 * @slot in-progress-icon - Custom content shown while loading (when appearance="icon")
 * @slot complete-icon - Custom content shown when complete and not failed
 * @slot fail-icon - Custom content shown when complete and failed
 *
 * @csspart container - The spinner container (circle wrapper)
 * @csspart label - The label container (when spinner-label is set)
 */
@customElement('swim-progress-spinner')
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

  @state()
  private _uid = `spinner-${Math.random().toString(36).slice(2, 11)}`;

  private get radius(): number {
    return this.diameter / 2;
  }

  private get circumference(): number {
    return this.radius * 2 * Math.PI;
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

  private get showBuiltInUploadIcon(): boolean {
    return this.appearance === SpinnerAppearance.Icon && !this.isComplete && !this.hasSlotContent('in-progress-icon');
  }

  private get showBuiltInCompleteIcon(): boolean {
    return (
      this.appearance === SpinnerAppearance.Icon &&
      this.isComplete &&
      !this.isFailure &&
      !this.hasSlotContent('complete-icon')
    );
  }

  private get showBuiltInFailIcon(): boolean {
    return (
      this.appearance === SpinnerAppearance.Icon &&
      this.isComplete &&
      this.isFailure &&
      !this.hasSlotContent('fail-icon')
    );
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

  render() {
    const filterUp = `url(#thumbs-up-filter--${this._uid})`;
    const filterDown = `url(#thumbs-down-filter--${this._uid})`;

    return html`
      <div
        class="swim-progress-spinner__container"
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
          width="${this.diameter}"
          height="${this.diameter}"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="thumbs-up-filter--${this._uid}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.513726 0 0 0 0 1 0 0 0 0.8 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <filter
              id="thumbs-down-filter--${this._uid}"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.270588 0 0 0 0 0.0784314 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>

          <circle
            class="swim-progress-spinner__circle"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${this.strokeDasharray}"
            stroke-dashoffset="${this.strokeDashoffset}"
            r="${this.radius}"
            cx="${this.diameter / 2}"
            cy="${this.diameter / 2}"
          ></circle>

          ${this.showBuiltInUploadIcon
            ? html`
                <path
                  class="swim-progress-spinner__upload-icon"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.20726 10.0942L18.3406 1.22756L18.9991 0.651369L19.6576 1.22756L29.7909 10.0942L28.4739 11.5994L20.2658 4.41724L20.2658 38.9851L28 38.9851L28 40.9851L10 40.9851L10 38.9851L17.7324 38.9851L17.7324 4.41724L9.52427 11.5994L8.20726 10.0942ZM18.9991 51.6468C28.2546 51.6468 35.7324 44.2571 35.7324 35.1723C35.7324 29.5813 32.9037 24.6357 28.566 21.6542C28.1108 21.3413 27.9955 20.7188 28.3083 20.2636C28.6212 19.8085 29.2437 19.6931 29.6989 20.006C34.5495 23.34 37.7324 28.8871 37.7324 35.1723C37.7324 45.3893 29.3313 53.6468 18.9991 53.6468C8.66689 53.6468 0.265776 45.3893 0.265775 35.1724C0.265775 28.8871 3.44875 23.34 8.29933 20.006C8.75447 19.6931 9.37704 19.8085 9.68987 20.2636C10.0027 20.7188 9.88735 21.3413 9.43221 21.6542C5.09448 24.6357 2.26577 29.5813 2.26578 35.1724C2.26578 44.2571 9.74363 51.6468 18.9991 51.6468Z"
                />
              `
            : nothing}
          ${this.showBuiltInCompleteIcon
            ? html`
                <g class="swim-progress-spinner__thumbs-up-icon" filter="${filterUp}">
                  <path d="M19.8973 31.4043H11V55.8719H19.8973V31.4043Z" />
                  <path d="M12 54.8719V32.4043H18.8973V54.8719H12Z" />
                  <path
                    d="M29.5261 53.4837L24.4102 51.0369V42.8936V35.4667L35.5318 22.1207V13.2234C35.5318 11.444 37.3112 10.5543 38.8683 11.2216C42.2047 13.2234 44.4291 18.3394 44.4291 22.1207V28.7937H55.5507C57.9974 28.7937 59.9993 30.7956 59.9993 33.2424L57.775 51.0369C57.775 53.4837 55.7731 55.4856 53.3264 55.4856H37.7561C34.8645 55.4856 31.9729 54.8183 29.5261 53.4837Z"
                  />
                  <path
                    d="M30.005 52.6058L29.9816 52.5931L29.9576 52.5816L25.4102 50.4067V42.8936V35.8287L36.3 22.7609L36.5318 22.4828V22.1207V13.2234C36.5318 12.7033 36.7746 12.3641 37.1082 12.1755C37.4499 11.9824 37.9303 11.9283 38.4159 12.1168C39.8368 12.9928 41.0918 14.5717 42.0005 16.441C42.9191 18.3307 43.4291 20.4061 43.4291 22.1207V28.7937V29.7937H44.4291H55.5507C57.4257 29.7937 58.9673 31.3161 58.9988 33.184L56.7827 50.9129L56.775 50.9747V51.0369C56.775 52.9314 55.2208 54.4856 53.3264 54.4856H37.7561C35.0118 54.4856 32.2882 53.8512 30.005 52.6058Z"
                  />
                </g>
              `
            : nothing}
          ${this.showBuiltInFailIcon
            ? html`
                <g class="swim-progress-spinner__thumbs-down-icon" filter="${filterDown}">
                  <path d="M19.8973 35.4678H11V11.0002H19.8973V35.4678Z" />
                  <path d="M12 12.0002V34.4678H18.8973V12.0002H12Z" />
                  <path
                    d="M29.5261 13.3884L24.4102 15.8351V23.9784V31.4054L35.5318 44.7513V53.6486C35.5318 55.4281 37.3112 56.3178 38.8683 55.6505C42.2047 53.6486 44.4291 48.5327 44.4291 44.7513V38.0784H55.5507C57.9974 38.0784 59.9993 36.0765 59.9993 33.6297L57.775 15.8351C57.775 13.3884 55.7731 11.3865 53.3264 11.3865H37.7561C34.8645 11.3865 31.9729 12.0538 29.5261 13.3884Z"
                  />
                  <path
                    d="M30.005 14.2663L29.9816 14.279L29.9576 14.2905L25.4102 16.4653V23.9784V31.0433L36.3 44.1111L36.5318 44.3893V44.7513V53.6486C36.5318 54.1688 36.7746 54.508 37.1082 54.6965C37.4499 54.8897 37.9303 54.9438 38.4159 54.7552C39.8368 53.8793 41.0918 52.3003 42.0005 50.431C42.9191 48.5414 43.4291 46.4659 43.4291 44.7513V38.0784V37.0784H44.4291H55.5507C57.4257 37.0784 58.9673 35.556 58.9988 33.688L56.7827 15.9592L56.775 15.8974V15.8351C56.775 13.9407 55.2208 12.3865 53.3264 12.3865H37.7561C35.0118 12.3865 32.2882 13.0208 30.005 14.2663Z"
                  />
                </g>
              `
            : nothing}
        </svg>

        ${!this.isComplete
          ? html`
              <div class="swim-progress-spinner__icon-in-progress">
                <slot name="in-progress-icon"></slot>
              </div>
            `
          : !this.isFailure
          ? html`
              <div class="swim-progress-spinner__icon-complete">
                <slot name="complete-icon"></slot>
              </div>
            `
          : html`
              <div class="swim-progress-spinner__icon-failure">
                <slot name="fail-icon"></slot>
              </div>
            `}
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

declare global {
  interface HTMLElementTagNameMap {
    'swim-progress-spinner': SwimProgressSpinner;
  }
}
