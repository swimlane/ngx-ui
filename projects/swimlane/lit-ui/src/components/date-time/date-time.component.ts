import { LitElement, html, PropertyValues, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../input/input.component';
import '../icon/icon.component';
import '../calendar/calendar.component';
import '../dialog/dialog.component';
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
  isOutOfRange,
  normalizeTimezone
} from './date-format';

let nextId = 0;
const DATE_TIME_TAG = 'swim-date-time';

/**
 * SwimDateTime — A date/time picker component matching @swimlane/ngx-ui design system.
 *
 * Wraps a `swim-input` with a calendar/clock button that opens a custom
 * calendar dialog. Supports date, time, and datetime modes, timezone-aware
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
  @state() private _dialogOpen = false;
  @state() private _dialogModel: Date | null = null;
  @state() private _dialogHour = 12;
  @state() private _dialogMinute = '00';
  @state() private _dialogSecond = '00';
  @state() private _dialogMillisecond = '000';
  @state() private _dialogAmPm: 'AM' | 'PM' = 'AM';

  // Precision modes in order from finest to coarsest
  private _modes = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];

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

  private get _showCalendar(): boolean {
    return this._effectiveInputType === DateTimeType.date || this._effectiveInputType === DateTimeType.datetime;
  }

  private get _showTime(): boolean {
    return this._effectiveInputType === DateTimeType.time || this._effectiveInputType === DateTimeType.datetime;
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

  disconnectedCallback(): void {
    super.disconnectedCallback();
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
      </div>

      ${this._renderDialog()}
    `;
  }

  private _renderDialog() {
    const headerText = this._getDialogHeaderText();

    return html`
      <swim-dialog
        css-class="ngx-date-time-dialog"
        .closeButton="${false}"
        .visible="${this._dialogOpen}"
        @close="${this._close}"
      >
        <div class="swim-date-time__dialog" @keydown="${this._onDialogKeyDown}">
          <div class="swim-date-time__dialog-header">
            <h1>${headerText}</h1>
          </div>

          ${this._showCalendar
            ? html`
                <swim-calendar
                  .value="${this._dialogModel}"
                  .minDate="${this.minDate}"
                  .maxDate="${this.maxDate}"
                  .disabled="${this.disabled}"
                  min-view="${this._calendarMinView}"
                  @change="${this._onCalendarChange}"
                  @day-key-enter="${this._apply}"
                ></swim-calendar>
              `
            : nothing}
          ${this._showTime ? this._renderTimeRow() : nothing}

          <nav role="navigation" class="swim-date-time__dialog-footer">
            <div class="text-left">
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--current"
                ?hidden="${this._isCurrent()}"
                @click="${this._selectCurrent}"
              >
                Current
              </button>
            </div>
            <div class="text-right">
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--clear"
                @click="${this._clear}"
              >
                Clear
              </button>
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--apply"
                @click="${this._apply}"
              >
                Apply
              </button>
            </div>
          </nav>
        </div>
      </swim-dialog>
    `;
  }

  private _renderTimeRow() {
    const hourDisabled = this._isTimeDisabled('hour');
    const minuteDisabled = this._isTimeDisabled('minute');
    const secondDisabled = this._isTimeDisabled('second');
    const msDisabled = this._isTimeDisabled('millisecond');

    return html`
      <div class="swim-date-time__time-row">
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${String(this._dialogHour)}"
            min="1"
            max="12"
            ?disabled="${hourDisabled}"
            @change="${this._onHourChange}"
          />
          <div class="swim-date-time__time-hint">Hour</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${this._dialogMinute}"
            min="0"
            max="59"
            ?disabled="${minuteDisabled}"
            @change="${this._onMinuteChange}"
          />
          <div class="swim-date-time__time-hint">Minute</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${this._dialogSecond}"
            min="0"
            max="59"
            ?disabled="${secondDisabled}"
            @change="${this._onSecondChange}"
          />
          <div class="swim-date-time__time-hint">Second</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input swim-date-time__time-input--ms"
            .value="${this._dialogMillisecond}"
            min="0"
            max="999"
            ?disabled="${msDisabled}"
            @change="${this._onMillisecondChange}"
          />
          <div class="swim-date-time__time-hint">Millisecond</div>
        </div>
        <div class="swim-date-time__ampm-group">
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm === 'AM' ? 'selected' : ''}"
            ?disabled="${hourDisabled}"
            @click="${() => this._onAmPmChange('AM')}"
          >
            AM
          </button>
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm === 'PM' ? 'selected' : ''}"
            ?disabled="${hourDisabled}"
            @click="${() => this._onAmPmChange('PM')}"
          >
            PM
          </button>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Dialog helpers
  // ---------------------------------------------------------------------------

  private get _calendarMinView(): string {
    if (this.precision === 'month') return 'month';
    if (this.precision === 'year') return 'year';
    return 'date';
  }

  private _getDialogHeaderText(): unknown {
    if (!this._dialogModel) {
      return 'No value';
    }
    const type = this._effectiveInputType;
    const tz = normalizeTimezone(this.timezone);

    if (type === DateTimeType.time) {
      return formatDate(this._dialogModel, 'h:mm a', tz);
    }
    if (type === DateTimeType.datetime) {
      const datePart = formatDate(this._dialogModel, 'ddd, MMM D YYYY', tz);
      const timePart = formatDate(this._dialogModel, 'h:mm a', tz);
      return html`${datePart} <small>${timePart}</small>`;
    }
    // date only
    return formatDate(this._dialogModel, 'ddd, MMM D YYYY', tz);
  }

  private _setDialogDate(date: Date): void {
    this._dialogModel = new Date(date);
    const hours = this._dialogModel.getHours();
    this._dialogHour = hours % 12 || 12;
    this._dialogMinute = String(this._dialogModel.getMinutes()).padStart(2, '0');
    this._dialogSecond = String(this._dialogModel.getSeconds()).padStart(2, '0');
    this._dialogMillisecond = String(this._dialogModel.getMilliseconds()).padStart(3, '0');
    this._dialogAmPm = hours >= 12 ? 'PM' : 'AM';
  }

  private _isTimeDisabled(mode: string): boolean {
    if (!this.precision) return false;
    return this._modes.indexOf(this.precision) > this._modes.indexOf(mode);
  }

  private _isCurrent(): boolean {
    if (!this._dialogModel) return false;
    const now = new Date();
    const type = this._effectiveInputType;

    if (type === DateTimeType.time) {
      return (
        now.getHours() === this._dialogModel.getHours() &&
        now.getMinutes() === this._dialogModel.getMinutes() &&
        now.getSeconds() === this._dialogModel.getSeconds() &&
        now.getMilliseconds() === this._dialogModel.getMilliseconds()
      );
    }

    if (type === DateTimeType.datetime) {
      return (
        now.getFullYear() === this._dialogModel.getFullYear() &&
        now.getMonth() === this._dialogModel.getMonth() &&
        now.getDate() === this._dialogModel.getDate() &&
        now.getHours() === this._dialogModel.getHours() &&
        now.getMinutes() === this._dialogModel.getMinutes() &&
        now.getSeconds() === this._dialogModel.getSeconds() &&
        now.getMilliseconds() === this._dialogModel.getMilliseconds()
      );
    }

    // date only — compare to minute
    return (
      now.getFullYear() === this._dialogModel.getFullYear() &&
      now.getMonth() === this._dialogModel.getMonth() &&
      now.getDate() === this._dialogModel.getDate()
    );
  }

  // ---------------------------------------------------------------------------
  // Dialog actions
  // ---------------------------------------------------------------------------

  private _openPicker(): void {
    if (this.disabled || this._dialogOpen) return;

    const dateVal = this._value instanceof Date && isValidDate(this._value) ? this._value : new Date();
    this._setDialogDate(dateVal);

    this._dialogOpen = true;
  }

  private _apply = (): void => {
    if (this._dialogModel) {
      this.value = this._dialogModel;
      this._update();
      this.dispatchEvent(new CustomEvent('date-time-selected', { detail: this.value, bubbles: true, composed: true }));
      this.dispatchEvent(new CustomEvent('change', { detail: this.value, bubbles: true, composed: true }));
    }
    this._close();
  };

  private _clear = (): void => {
    this.value = undefined;
    this._update();
    this.dispatchEvent(new CustomEvent('date-time-selected', { detail: undefined, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: undefined, bubbles: true, composed: true }));
    this._close();
  };

  private _selectCurrent = (): void => {
    this._setDialogDate(new Date());
  };

  private _close = (): void => {
    this._dialogOpen = false;
    this._update();
  };

  private _onCalendarChange = (e: CustomEvent): void => {
    e.stopPropagation();
    const selectedDate = e.detail as Date;
    if (selectedDate && isValidDate(selectedDate)) {
      // Preserve time from dialog model if we have one
      if (this._dialogModel && this._showTime) {
        selectedDate.setHours(
          this._dialogModel.getHours(),
          this._dialogModel.getMinutes(),
          this._dialogModel.getSeconds(),
          this._dialogModel.getMilliseconds()
        );
      }
      this._setDialogDate(selectedDate);
    }
  };

  // ---------------------------------------------------------------------------
  // Time input handlers
  // ---------------------------------------------------------------------------

  private _onHourChange = (e: Event): void => {
    const val = +(e.target as HTMLInputElement).value % 12;
    const hours = this._dialogAmPm === 'PM' ? 12 + val : val;
    if (this._dialogModel) {
      const d = new Date(this._dialogModel);
      d.setHours(hours);
      this._setDialogDate(d);
    }
  };

  private _onMinuteChange = (e: Event): void => {
    const val = +(e.target as HTMLInputElement).value;
    if (this._dialogModel) {
      const d = new Date(this._dialogModel);
      d.setMinutes(val);
      this._setDialogDate(d);
    }
  };

  private _onSecondChange = (e: Event): void => {
    const val = +(e.target as HTMLInputElement).value;
    if (this._dialogModel) {
      const d = new Date(this._dialogModel);
      d.setSeconds(val);
      this._setDialogDate(d);
    }
  };

  private _onMillisecondChange = (e: Event): void => {
    const val = +(e.target as HTMLInputElement).value;
    if (this._dialogModel) {
      const d = new Date(this._dialogModel);
      d.setMilliseconds(val);
      this._setDialogDate(d);
    }
  };

  private _onAmPmChange(newVal: 'AM' | 'PM'): void {
    if (!this._dialogModel) return;
    const d = new Date(this._dialogModel);
    const hours = d.getHours();
    if (newVal === 'AM' && this._dialogAmPm === 'PM') {
      d.setHours(hours - 12);
    } else if (newVal === 'PM' && this._dialogAmPm === 'AM') {
      d.setHours(hours + 12);
    }
    this._setDialogDate(d);
  }

  private _onDialogKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      this._close();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // ---------------------------------------------------------------------------
  // Input event handlers
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
      if (this._dialogOpen) {
        this._close();
      }
      e.stopPropagation();
    }
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
