import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { sliderStyles } from './slider.styles';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

let nextId = 0;

export interface SliderChangeDetail {
  value: number | string;
  percent: string;
}

/**
 * SwimSlider - A range slider component matching @swimlane/ngx-ui design system.
 * Single or multiple thumbs; optional filled track and ticks. Form-associated.
 *
 * @fires change - Fired when value changes (detail: { value, percent })
 *
 * @csspart track - The slider track
 * @csspart fill - The filled portion of the track (when filled=true)
 * @csspart thumb - Each thumb indicator (when not using native thumb)
 */
@customElement('swim-slider')
export class SwimSlider extends LitElement {
  static styles = [baseStyles, sliderStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  /**
   * Unique id for the control (for form and accessibility)
   */
  @property({ type: String })
  id = `swim-slider-${++nextId}`;

  /**
   * Minimum value
   */
  @property({ type: Number })
  get min(): number {
    return this._min;
  }
  set min(value: number) {
    this._min = coerceNumberProperty(value, 0);
  }
  private _min = 0;

  /**
   * Maximum value
   */
  @property({ type: Number })
  get max(): number {
    return this._max;
  }
  set max(value: number) {
    this._max = coerceNumberProperty(value, 100);
  }
  private _max = 100;

  /**
   * Step increment
   */
  @property({ type: Number })
  get step(): number {
    return this._step;
  }
  set step(value: number) {
    this._step = coerceNumberProperty(value, 1);
  }
  private _step = 1;

  /**
   * Orientation: 'horizontal' or 'vertical'
   */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Whether to show the filled portion of the track
   */
  @property({ type: Boolean, reflect: true })
  get filled(): boolean {
    return this._filled;
  }
  set filled(value: boolean) {
    this._filled = coerceBooleanProperty(value);
  }
  private _filled = false;

  /**
   * Whether to allow multiple thumbs (range)
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
   * Whether the slider is disabled
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
   * Whether to show tick marks
   */
  @property({ type: Boolean, attribute: 'show-ticks' })
  get showTicks(): boolean {
    return this._showTicks;
  }
  set showTicks(value: boolean) {
    this._showTicks = coerceBooleanProperty(value);
  }
  private _showTicks = false;

  /**
   * Step interval for tick marks (defaults to step if not set)
   */
  @property({ type: Number, attribute: 'tick-step' })
  get tickStep(): number {
    return this._tickStep ?? this._step;
  }
  set tickStep(value: number) {
    this._tickStep = value != null ? coerceNumberProperty(value, this._step) : undefined;
  }
  private _tickStep?: number;

  /**
   * Accessible label for the slider (used for aria-label on inputs)
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = '';

  /**
   * Current value. Single number or comma-separated string for multiple.
   */
  @property({ type: String })
  get value(): string {
    if (!this._values.length) return String(this._min);
    if (this.multiple) return [...this._values].sort((a, b) => a - b).join(',');
    return String(this._values[0]);
  }
  set value(val: string | number) {
    const str = val != null ? String(val) : '';
    const parsed = str ? str.split(',').map(s => coerceNumberProperty(s.trim(), this._min)) : [this._min];
    const normalized = parsed.map(v => Math.max(this._min, Math.min(this._max, v)));
    let next: number[];
    if (this.multiple) {
      next =
        normalized.length >= 2
          ? normalized
          : normalized.length === 1
          ? [normalized[0], this._max]
          : [this._min, this._max];
    } else {
      next = normalized.slice(0, 1);
    }
    if (next.length !== this._values.length || next.some((v, i) => v !== this._values[i])) {
      this._values = next;
      this._syncFormValue();
    }
  }

  @state()
  private _values: number[] = [0];

  @state()
  private _active: boolean[] = [];

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._values.length === 0 || (this._values.length === 1 && this._values[0] === 0 && this._min !== 0)) {
      this._values = this.multiple ? [this._min, this._max] : [this._min];
      this._syncFormValue();
    }
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('min') || changedProperties.has('max')) {
      this._syncFormValue();
    }
  }

  private _syncFormValue() {
    this._internals.setFormValue(this.value);
  }

  private get _percents(): number[] {
    const range = this._max - this._min || 1;
    return this._values.map(v => Math.round((100 * (Math.max(this._min, Math.min(this._max, v)) - this._min)) / range));
  }

  private get _thumbs(): { left: string }[] {
    return this._percents.map(p => ({
      left: `calc(${p}% - ${p / 100}em)`
    }));
  }

  private get _fill(): { left: string; width: string } | null {
    if (!this.filled) return null;
    const pct = this._percents;
    const percentMin = this.multiple ? Math.min(...pct) : 0;
    const percentMax = this.multiple ? Math.max(...pct) : pct[0];
    const width = percentMax - percentMin;
    return {
      left: `${percentMin}%`,
      width: `${width}%`
    };
  }

  private get _tickStepValue(): number {
    return this._tickStep ?? this._step;
  }

  private get _ticks(): { left: string }[] {
    if (!this.showTicks) return [];
    const step = this._tickStepValue;
    const indices: number[] = [];
    let i = this._min;
    while (i <= this._max) {
      indices.push(i);
      i += step;
    }
    const range = this._max - this._min || 1;
    return indices.map(i => {
      const p = (100 * (i - this._min)) / range;
      return { left: `calc(${p}% - ${p / 100 - 0.5}em)` };
    });
  }

  private _setValue(val: number, index: number) {
    const num = coerceNumberProperty(val, this._min);
    const clamped = Math.max(this._min, Math.min(this._max, num));
    if (this._values[index] !== clamped) {
      const next = [...this._values];
      next[index] = clamped;
      this._values = next;
      this._syncFormValue();
      this._emitChange();
    }
  }

  private _onChange(_e: Event) {
    this._emitChange();
  }

  private _emitChange() {
    const value = this.value;
    const percent = this.multiple ? this._percents.join(',') : String(this._percents[0]);
    this.dispatchEvent(
      new CustomEvent<SliderChangeDetail>('change', {
        detail: { value: this.multiple ? value : Number(value), percent },
        bubbles: true,
        composed: true
      })
    );
  }

  private _setActive(index: number, active: boolean) {
    const next = [...this._active];
    next[index] = active;
    this._active = next;
  }

  private _ensureValuesLength() {
    if (this.multiple && this._values.length < 2) {
      this._values = [this._min, this._max];
    } else if (!this.multiple && this._values.length > 1) {
      this._values = [this._values[0]];
    }
  }

  override willUpdate(_changedProperties: PropertyValues) {
    this._ensureValuesLength();
  }

  override firstUpdated() {
    this._ensureValuesLength();
  }

  private _onRangeInput(e: Event, index: number) {
    const v = (e.target as HTMLInputElement).value;
    this._setValue(Number(v), index);
  }

  render() {
    const isVertical = this.orientation === 'vertical';

    return html`
      <div
        class="swim-slider ${isVertical ? 'swim-slider--vertical' : ''} ${this.filled
          ? 'swim-slider--filled'
          : ''} ${this.multiple ? 'swim-slider--multiple' : ''}"
        role="group"
        aria-label="${this.ariaLabel || undefined}"
      >
        <div class="swim-slider__inner">
          ${this.showTicks
            ? html`
                <div class="swim-slider__ticks" aria-hidden="true">
                  ${this._ticks.map(t => html`<div class="swim-slider__tick" style="left: ${t.left}"></div>`)}
                </div>
              `
            : ''}
          <div class="swim-slider__inputs">
            <div class="swim-slider__track" part="track" aria-hidden="true"></div>
            ${this._fill
              ? html`
                  <span
                    class="swim-slider__fill"
                    part="fill"
                    style="left: ${this._fill.left}; width: ${this._fill.width}"
                    aria-hidden="true"
                  ></span>
                `
              : ''}
            ${this._values.map((val, i) => {
              const thumbStyle = this._thumbs[i];
              const active = this._active[i];
              const inputId = `${this.id}-${i}`;
              const label = this.ariaLabel ? `${this.ariaLabel}${this.multiple ? ` (thumb ${i + 1})` : ''}` : undefined;
              return html`
                <input
                  type="range"
                  class="swim-slider__input ${i % 2 === 1 ? 'swim-slider__input--odd' : ''} ${active
                    ? 'swim-slider__input--active'
                    : ''}"
                  id="${inputId}"
                  aria-valuemin="${this._min}"
                  aria-valuemax="${this._max}"
                  aria-valuenow="${val}"
                  aria-label="${label || undefined}"
                  .value="${String(val)}"
                  min="${this._min}"
                  max="${this._max}"
                  step="${this._step}"
                  ?disabled="${this.disabled}"
                  @input="${(e: Event) => this._onRangeInput(e, i)}"
                  @change="${this._onChange}"
                  @mouseenter="${() => this._setActive(i, true)}"
                  @mouseleave="${() => this._setActive(i, false)}"
                  @focus="${() => this._setActive(i, true)}"
                  @blur="${() => this._setActive(i, false)}"
                />
                <div
                  class="swim-slider__thumb ${active ? 'swim-slider__thumb--active' : ''}"
                  style="${thumbStyle ? `left: ${thumbStyle.left}` : ''}"
                  aria-hidden="true"
                  part="thumb"
                ></div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-slider': SwimSlider;
  }
}
