import { LitElement, html, PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../input/input.component';
import '../icon/icon.component';
import { baseStyles } from '../../styles/base';
import { dateTimeStyles } from './date-time.styles';
import { DateTimeType } from './date-time-type.enum';
import { DateDisplayType } from './date-time-display.enum';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';
import {
  formatDate,
  parseDate,
  isValidDate,
  roundToPrecision,
  resolveFormat,
  getEffectiveInputFormat,
  toNativeInputValue,
  isOutOfRange,
  normalizeTimezone
} from './date-format';

let nextId = 0;
const DATE_TIME_TAG = 'swim-date-time';

/**
 * SwimDateTime — A date/time picker component matching @swimlane/ngx-ui design system.
 *
 * Wraps a `swim-input` with a calendar/clock button that opens the native
 * browser date-picker. Supports date, time, and datetime modes, timezone-aware
 * formatting, precision truncation, min/max validation, and form association.
 *
 * @fires change - Fired when the value changes to a valid date or is cleared.
 * @fires value-change - Fired on any value change (valid or invalid).
 * @fires input-change - Fired when the user types in the text input.
 * @fires date-time-selected - Fired when a date is selected from the picker.
 * @fires blur - Fired when the component loses focus.
 * @fires focus - Fired when the component gains focus.
 *
 * @csspart input - The internal swim-input element.
 * @csspart calendar-btn - The calendar/clock icon button.
 */
export class SwimDateTime extends LitElement {
  static styles = [baseStyles, dateTimeStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  @query('.swim-date-time__native-picker')
  private _nativePicker!: HTMLInputElement;

  @query('swim-input')
  private _swimInput!: HTMLElement & { value: string };

  // ---------------------------------------------------------------------------
  // Public properties
  // ---------------------------------------------------------------------------

  /** Component id. */
  @property({ type: String })
  id = `swim-date-time-${++nextId}`;

  /** Form name. */
  @property({ type: String })
  name = '';

  /** Input label. */
  @property({ type: String })
  label = '';

  /** Hint text below the input. */
  @property({ type: String })
  hint = '';

  /** Placeholder text. */
  @property({ type: String })
  placeholder = '';

  /** Size variant. */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'sm';

  /** Appearance style. */
  @property({ type: String, reflect: true })
  appearance: 'legacy' | 'fill' = 'legacy';

  /** Whether the component is disabled. */
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    const old = this._disabled;
    this._disabled = coerceBooleanProperty(value);
    this.requestUpdate('disabled', old);
  }
  private _disabled = false;

  /** Whether a value is required. */
  @property({ type: Boolean, reflect: true })
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    const old = this._required;
    this._required = coerceBooleanProperty(value);
    this.requestUpdate('required', old);
  }
  private _required = false;

  /** Required indicator character. */
  @property({ type: String, attribute: 'required-indicator' })
  requiredIndicator: string | boolean = '*';

  /** Auto-focus on mount. */
  @property({ type: Boolean })
  get autofocus(): boolean {
    return this._autofocus;
  }
  set autofocus(value: boolean) {
    this._autofocus = coerceBooleanProperty(value);
  }
  private _autofocus = false;

  /** Auto-size the component width to content. */
  @property({ type: Boolean, reflect: true })
  get autosize(): boolean {
    return this._autosize;
  }
  set autosize(value: boolean) {
    const old = this._autosize;
    this._autosize = coerceBooleanProperty(value);
    this.requestUpdate('autosize', old);
  }
  private _autosize = false;

  /** Minimum width in pixels. */
  @property({ type: Number, attribute: 'min-width' })
  get minWidth(): number {
    return this._minWidth;
  }
  set minWidth(value: number) {
    this._minWidth = coerceNumberProperty(value) ?? 60;
  }
  private _minWidth = 60;

  /** Tab index for the input. */
  @property({ type: Number })
  tabindex?: number;

  /** Input type: date, time, or datetime. */
  @property({ type: String, attribute: 'input-type' })
  set inputType(val: string) {
    const old = this._inputType;
    this._inputType = val as DateTimeType;
    this.requestUpdate('inputType', old);
  }
  get inputType(): string {
    return this._effectiveInputType;
  }
  private _inputType?: DateTimeType;

  /** Precision level for rounding: year, month, hour, minute, second, millisecond. */
  @property({ type: String })
  precision?: string;

  /** IANA timezone name (e.g. "UTC", "Asia/Tokyo"). */
  @property({ type: String })
  timezone?: string;

  /** Display mode: human, timezone, local, custom. */
  @property({ type: String, attribute: 'display-mode' })
  set displayMode(val: string) {
    const old = this._displayMode;
    this._displayMode = val as DateDisplayType;
    this.requestUpdate('displayMode', old);
  }
  get displayMode(): string {
    return this._effectiveDisplayMode;
  }
  private _displayMode?: DateDisplayType;

  /** Display format string (moment-compatible or named preset). */
  @property({ type: String })
  format?: string;

  /** Remove default margins. */
  @property({ type: Boolean, reflect: true })
  get marginless(): boolean {
    return this._marginless;
  }
  set marginless(value: boolean) {
    const old = this._marginless;
    this._marginless = coerceBooleanProperty(value);
    this.requestUpdate('marginless', old);
  }
  private _marginless = false;

  /** Minimum selectable date. */
  @property({ attribute: 'min-date' })
  minDate?: string | Date;

  /** Maximum selectable date. */
  @property({ attribute: 'max-date' })
  maxDate?: string | Date;

  /**
   * Component value. Accepts Date, ISO string, or common date strings.
   * Invalid strings are stored as-is and flagged as invalid.
   */
  @property({ attribute: false })
  get value(): Date | string | undefined | null {
    return this._value;
  }
  set value(val: Date | string | undefined | null) {
    const oldValue = this._value;

    // Normalize
    if (typeof val === 'string') {
      val = val.trim();
      if (!val) val = null;
    }

    // Short-circuit identical falsy
    if (!val && !this._value) {
      this._value = null;
      return;
    }
    if (val === this._value) return;

    // Try parsing to Date
    let isDate = val instanceof Date && isValidDate(val);
    if (typeof val === 'string') {
      const parsed = parseDate(val);
      if (parsed) {
        val = parsed;
        isDate = true;
      }
    }

    // Apply precision rounding
    if (isDate && val instanceof Date && this.precision) {
      val = roundToPrecision(val, this.precision);
    }

    this._value = isDate ? (val as Date) : val;
    this._update();

    // Form value
    if (this._internals) {
      const formVal = this._value instanceof Date ? this._value.toISOString() : String(this._value ?? '');
      this._internals.setFormValue(formVal);
    }

    this.requestUpdate('value', oldValue);
  }
  private _value: Date | string | undefined | null = null;

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  @state() private _displayValue = '';
  @state() private _dateInvalid = false;
  @state() private _dateOutOfRange = false;
  @state() private _focused = false;

  // ---------------------------------------------------------------------------
  // Computed helpers
  // ---------------------------------------------------------------------------

  private get _effectiveInputType(): DateTimeType {
    if (this._inputType) return this._inputType;
    if (this.precision === 'hour' || this.precision === 'minute') return DateTimeType.datetime;
    return DateTimeType.date;
  }

  private get _effectiveDisplayMode(): DateDisplayType {
    if (this._displayMode) return this._displayMode;
    return this.timezone ? DateDisplayType.TIMEZONE : DateDisplayType.LOCAL;
  }

  private get _effectiveFormat(): string {
    if (this.format) return resolveFormat(this.format);
    return getEffectiveInputFormat(
      this._effectiveDisplayMode as DateDisplayType,
      this._effectiveInputType,
      this.precision
    );
  }

  private get _nativeInputType(): string {
    switch (this._effectiveInputType) {
      case DateTimeType.time:
        return 'time';
      case DateTimeType.datetime:
        return 'datetime-local';
      default:
        return 'date';
    }
  }

  private get _iconName(): string {
    switch (this._effectiveInputType) {
      case DateTimeType.time:
        return 'clock';
      case DateTimeType.datetime:
        return 'calendar-clock';
      default:
        return 'calendar';
    }
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._update();
  }

  firstUpdated(): void {
    if (this.autofocus && this._swimInput) {
      requestAnimationFrame(() => {
        (this._swimInput as HTMLElement)?.focus?.();
      });
    }
  }

  updated(changed: PropertyValues): void {
    super.updated(changed);

    // Reflect derived host attributes for styling
    if (this.label) {
      this.setAttribute('has-label', '');
    } else {
      this.removeAttribute('has-label');
    }

    if (this._dateInvalid) {
      this.setAttribute('date-invalid', '');
    } else {
      this.removeAttribute('date-invalid');
    }

    if (this._dateOutOfRange) {
      this.setAttribute('date-out-of-range', '');
    } else {
      this.removeAttribute('date-out-of-range');
    }

    if (this._focused) {
      this.setAttribute('focused', '');
    } else {
      this.removeAttribute('focused');
    }

    // Re-format when format-related props change
    if (
      changed.has('format') ||
      changed.has('precision') ||
      changed.has('timezone') ||
      changed.has('displayMode') ||
      changed.has('inputType')
    ) {
      this._update();
    }

    // Validate when constraints change
    if (changed.has('required') || changed.has('minDate') || changed.has('maxDate')) {
      this._validate();
    }
  }

  /** Delegate focus to the inner input. */
  override focus(options?: FocusOptions): void {
    (this._swimInput as HTMLElement)?.focus?.(options);
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  render() {
    const nativeVal = this._value instanceof Date ? toNativeInputValue(this._value, this._nativeInputType) : '';
    const nativeMin =
      this.minDate instanceof Date
        ? toNativeInputValue(this.minDate, this._nativeInputType)
        : typeof this.minDate === 'string'
        ? toNativeInputValue(parseDate(this.minDate), this._nativeInputType)
        : undefined;
    const nativeMax =
      this.maxDate instanceof Date
        ? toNativeInputValue(this.maxDate, this._nativeInputType)
        : typeof this.maxDate === 'string'
        ? toNativeInputValue(parseDate(this.maxDate), this._nativeInputType)
        : undefined;

    return html`
      <div class="swim-date-time__container">
        <swim-input
          part="input"
          .id="${this.id + '-input'}"
          .name="${this.name}"
          .label="${this.label}"
          .hint="${this.hint}"
          .placeholder="${this.placeholder}"
          .size="${this.size}"
          .appearance="${this.appearance}"
          .disabled="${this.disabled}"
          .required="${this.required}"
          .requiredIndicator="${String(this.requiredIndicator)}"
          .value="${this._displayValue}"
          ?marginless="${this.marginless}"
          tabindex="${ifDefined(this.tabindex)}"
          autocomplete="off"
          @input="${this._handleInput}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @keydown="${this._handleKeyDown}"
        ></swim-input>

        <button
          part="calendar-btn"
          class="swim-date-time__calendar-btn"
          type="button"
          ?disabled="${this.disabled}"
          @click="${this._openPicker}"
          title="Show date/time selector"
          aria-label="Open ${this._effectiveInputType} picker"
        >
          <swim-icon font-icon="${this._iconName}"></swim-icon>
        </button>

        <input
          class="swim-date-time__native-picker"
          type="${this._nativeInputType}"
          .value="${nativeVal}"
          min="${ifDefined(nativeMin)}"
          max="${ifDefined(nativeMax)}"
          tabindex="-1"
          aria-hidden="true"
          @change="${this._handleNativeChange}"
        />
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------

  private _handleInput(e: Event): void {
    e.stopPropagation();
    const target = e.target as HTMLElement & { value: string };
    const raw = target.value;

    // Store display value as-is so the user sees what they typed
    this._displayValue = raw;

    // Parse
    const parsed = parseDate(raw);
    const oldValue = this._value;

    if (parsed) {
      const rounded = this.precision ? roundToPrecision(parsed, this.precision) : parsed;
      this._value = rounded;
      this._dateInvalid = false;
    } else if (raw) {
      this._value = raw; // keep the raw invalid string
      this._dateInvalid = true;
    } else {
      this._value = null;
      this._dateInvalid = false;
    }

    this._dateOutOfRange =
      !this._dateInvalid && this._value instanceof Date ? isOutOfRange(this._value, this.minDate, this.maxDate) : false;

    this._updateFormValue();

    this.dispatchEvent(new CustomEvent('input-change', { detail: this._value, bubbles: true, composed: true }));

    // Fire value-change on any value mutation
    if (this._value !== oldValue) {
      this.dispatchEvent(new CustomEvent('value-change', { detail: this._value, bubbles: true, composed: true }));
    }

    // Fire change only when value is valid or cleared
    if (!this._dateInvalid && this._value !== oldValue) {
      this.dispatchEvent(new CustomEvent('change', { detail: this._value, bubbles: true, composed: true }));
    }
  }

  private _handleFocus(e: Event): void {
    e.stopPropagation();
    this._focused = true;
    this.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
  }

  private _handleBlur(e: Event): void {
    e.stopPropagation();
    this._focused = false;

    // On blur, re-format the display value from the internal value
    this._update();
    if (!this._dateInvalid && this._swimInput && this._swimInput.value !== this._displayValue) {
      this._swimInput.value = this._displayValue;
    }

    this.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true }));
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      this._openPicker();
    } else if (e.code === 'Escape') {
      // Nothing to close in native-picker mode, but stop propagation
      e.stopPropagation();
    }
  }

  private _openPicker(): void {
    if (this.disabled) return;
    try {
      this._nativePicker?.showPicker();
    } catch {
      // Fallback: programmatic click
      this._nativePicker?.click();
    }
  }

  private _handleNativeChange(e: Event): void {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const raw = target.value;
    if (!raw) return;

    const parsed = new Date(this._nativeInputType === 'time' ? `1970-01-01T${raw}` : raw);

    if (!isValidDate(parsed)) return;

    // For time-only, if we have an existing date, preserve the date portion
    if (this._effectiveInputType === DateTimeType.time && this._value instanceof Date) {
      const existing = new Date(this._value);
      existing.setHours(parsed.getHours(), parsed.getMinutes(), parsed.getSeconds());
      this.value = existing;
    } else {
      this.value = parsed;
    }

    this._update();

    this.dispatchEvent(new CustomEvent('change', { detail: this._value, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('date-time-selected', { detail: this._value, bubbles: true, composed: true }));
  }

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  private _update(): void {
    const val = this._value;
    const isDate = val instanceof Date && isValidDate(val);

    this._dateInvalid = !!val && !isDate;
    this._displayValue = !val ? '' : String(val);
    this._dateOutOfRange = false;

    if (!isDate) return;

    const tz = normalizeTimezone(this.timezone);
    this._displayValue = formatDate(val as Date, this._effectiveFormat, tz);
    this._dateOutOfRange = isOutOfRange(val as Date, this.minDate, this.maxDate);
  }

  private _validate(): void {
    let validity: ValidityStateFlags = {};
    let message = '';

    if (this._required && !this._value) {
      validity = { valueMissing: true };
      message = 'A value is required.';
    } else if (this._dateInvalid) {
      validity = { typeMismatch: true };
      message = 'Invalid date.';
    } else if (this._dateOutOfRange) {
      validity = { rangeOverflow: true };
      message = 'Date is out of the allowed range.';
    }

    if (message) {
      this._internals.setValidity(validity, message);
    } else {
      this._internals.setValidity({});
    }
  }

  private _updateFormValue(): void {
    if (!this._internals) return;
    const val = this._value;
    if (val instanceof Date && isValidDate(val)) {
      this._internals.setFormValue(val.toISOString());
    } else {
      this._internals.setFormValue(String(val ?? ''));
    }
    this._validate();
  }

  // ---------------------------------------------------------------------------
  // Form callbacks
  // ---------------------------------------------------------------------------

  formResetCallback(): void {
    this._value = null;
    this._displayValue = '';
    this._dateInvalid = false;
    this._dateOutOfRange = false;
    this._internals.setFormValue('');
    this._internals.setValidity({});
    this.requestUpdate();
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }
}

if (!customElements.get(DATE_TIME_TAG)) {
  customElements.define(DATE_TIME_TAG, SwimDateTime);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-date-time': SwimDateTime;
  }
}
