import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  forwardRef,
  ViewChild,
  TemplateRef,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

import moment from 'moment-timezone';
import { ClipboardService } from 'ngx-clipboard';

import { DialogService } from '../dialog/dialog.service';
import { DateTimeType } from './date-time-type.enum';
import { Datelike } from './date-like.type';
import { InputComponent } from '../input/input.component';
import { NotificationService } from '../notification/notification.service';
import { NotificationStyleType } from '../notification/notification-style-type.enum';

import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { CoerceNumberProperty } from '../../utils/coerce/coerce-number';

import { Size } from '../../mixins/size/size.enum';
import { Appearance } from '../../mixins/appearance/appearance.enum';
import {
  DATE_DISPLAY_FORMATS,
  DATE_DISPLAY_INPUT_FORMATS,
  DATE_DISPLAY_TYPES
} from '../time-display/date-formats.enum';

let nextId = 0;

const MIN_WIDTH = 60;

const DATE_TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true
};

const DATE_TIME_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true
};

function isValidDate(date: moment.Moment | undefined) {
  if (!date) {
    return true;
  }

  // check if date input is empty
  const dateInput = date?.creationData().input;

  if (dateInput === '' || dateInput === null || dateInput === undefined) return true; // 0 is a valid date input

  // date can be either valid, or an empty value if not required
  return date.isValid();
}

@Component({
  exportAs: 'ngxDateTime',
  selector: 'ngx-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [DATE_TIME_VALUE_ACCESSOR, DATE_TIME_VALIDATORS],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-date-time',
    '[class.legacy]': 'appearance === "legacy"',
    '[class.fill]': 'appearance === "fill"',
    '[class.sm]': 'size === "sm"',
    '[class.md]': 'size === "md"',
    '[class.lg]': 'size === "lg"',
    '[class.autosize]': 'autosize',
    '[class.marginless]': '!withMargin',
    '[class.no-label]': '!label'
  }
})
export class DateTimeComponent implements OnDestroy, ControlValueAccessor {
  @Input() id = `datetime-${++nextId}`;
  @Input() name: string;
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder = '';
  @Input() size: Size = Size.Small;
  @Input() appearance: Appearance = Appearance.Legacy;
  @Input() withMargin = true;
  @Input() precision: moment.unitOfTime.StartOf;
  @Input() timezone: string;
  @Input() inputFormats: any[] = DATE_DISPLAY_INPUT_FORMATS;

  @Input()
  @CoerceBooleanProperty()
  disabled = false;

  @CoerceNumberProperty()
  minWidth: number = MIN_WIDTH;

  @Input()
  @CoerceNumberProperty()
  tabindex: number;

  @Input()
  @CoerceBooleanProperty()
  autofocus = false;

  // date, time, dateTime
  @Input()
  get inputType(): string {
    if (!this._inputType) {
      return DateTimeType.date;
    }
    return this._inputType;
  }
  set inputType(val: string) {
    this._inputType = val;
    this.update();
  }

  /**
   * Display mode for date/time
   * 'user' - display date/time with a timezone
   * 'local' - display date/time without timezone
   *
   * Defaults to LOCAL unless timezone is set
   */
  @Input()
  set displayMode(val: DATE_DISPLAY_TYPES) {
    this._displayMode = val;
    this.update();
  }
  // Defaults to LOCAL unless
  get displayMode(): DATE_DISPLAY_TYPES {
    if (typeof this._displayMode === 'string') {
      return this._displayMode;
    }
    return this.timezone ? DATE_DISPLAY_TYPES.USER : DATE_DISPLAY_TYPES.LOCAL;
  }

  /**
   * Display format for date/time
   * Considers if mode is user (has timezone), local (no timezone)
   */
  @Input()
  get format(): string {
    if (this._format) return DATE_DISPLAY_FORMATS[this._format] || this._format;

    if (this.displayMode === DATE_DISPLAY_TYPES.USER) {
      if (this.inputType === DateTimeType.date) {
        return DATE_DISPLAY_FORMATS.localeDate;
      } else if (this.inputType === DateTimeType.time) {
        return DATE_DISPLAY_FORMATS.fullTime;
      }
      return DATE_DISPLAY_FORMATS.fullDateTime;
    }

    if (this.inputType === DateTimeType.date) {
      return DATE_DISPLAY_FORMATS.localeDate;
    } else if (this.inputType === DateTimeType.time) {
      return DATE_DISPLAY_FORMATS.localeTime;
    }

    return DATE_DISPLAY_FORMATS.localeDateTime;
  }
  set format(val: string) {
    this._format = val;
    this.update();
  }

  @Input()
  @CoerceBooleanProperty()
  tooltipDisabled = false;

  @HostBinding('class.ngx-date-time--has-popup')
  get hasPopup() {
    return !this.dateInvalid && DATE_DISPLAY_TYPES.LOCAL !== this.displayMode;
  }

  @HostBinding('class.ngx-date-time--date-invalid')
  dateInvalid = true;

  // Used to display date in other timezones
  /**
   * Used to display date in other timezones
   *
   * Only used if displayMode is 'user' or timezone is set
   */
  @Input()
  timezones: Record<string, string> = {
    UTC: 'Etc/UTC',
    Local: ''
  };

  @Input()
  tooltipCssClass = 'date-tip-tooltip';

  @Input()
  set clipFormat(val: string) {
    this._clipFormat = val;
  }
  get clipFormat(): string {
    return DATE_DISPLAY_FORMATS[this._clipFormat] || this._clipFormat || DATE_DISPLAY_FORMATS.shortLocale;
  }

  @Input() requiredIndicator: string | boolean = '*';

  @Input()
  @CoerceBooleanProperty()
  required = false;

  @Input()
  set value(val: Date | string) {
    if (!val && !this._value) this._value = val; // Match falsey values

    let isSame = val === this._value;
    if (isSame) return; // if values are the same at this point, do nothing

    let isDate = false;
    const date = this.parseDate(val);
    if (val && date.isValid()) {
      const sameDiff: moment.unitOfTime.StartOf = this.precision
        ? this.precision
        : this.inputType === DateTimeType.date
        ? 'day'
        : 'second';
      isSame = this._value ? date.isSame(this._value, sameDiff) : false;
      if (!isSame) isDate = true;
    }

    if (!isSame) {
      this._value = isDate ? date.toDate() : val;
      // notify of changes only when the component is cleared
      // or when the set value is valid
      if (isValidDate(this.parseDate(val))) {
        this.change.emit(val);
      }

      // called each time for validation
      this.onChangeCallback(val);
      this.valueChange.emit(val);

      // update the display value and table
      this.update();
    }
  }
  get value() {
    return this._value;
  }

  get displayValue(): string {
    return this._displayValue;
  }
  set displayValue(value: string) {
    this._displayValue = value;
    this.cdr.markForCheck();
  }

  @Input()
  @CoerceBooleanProperty()
  autosize = false;

  @Input()
  get minDate() {
    return this._minDate;
  }
  set minDate(val: Date | string) {
    this._minDate = val;
    this.update();
  }

  @Input()
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(val: Date | string) {
    this._maxDate = val;
    this.update();
  }

  /**
   * this output will emit only when the input value is valid or cleared.
   */
  @Output() change = new EventEmitter<string | Date>();

  /**
   * this output will emit anytime the value changes regardless of validity.
   */
  @Output() valueChange = new EventEmitter<string | Date>();

  /**
   * this output will emit anytime the value changes in the input, regardless of validity.
   */
  @Output() inputChange = new EventEmitter<string | Date>();

  @Output() blur = new EventEmitter<Event>();
  @Output() dateTimeSelected = new EventEmitter<Date | string>();

  @ViewChild('dialogTpl', { static: true })
  readonly calendarTpl: TemplateRef<ElementRef>;

  @ViewChild('input', { static: true })
  readonly input: InputComponent;

  dialog: any;
  dialogModel: moment.Moment;
  hour: number;
  minute: string;
  amPmVal: string;
  modes = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];
  timeValues = {};

  private _value: Date | string;
  private _displayValue = '';
  private _format: string;
  private _inputType: string;
  private _maxDate: Date | string;
  private _minDate: Date | string;
  private _displayMode: DATE_DISPLAY_TYPES;
  private _clipFormat: string;

  constructor(
    private readonly dialogService: DialogService,
    private readonly cdr: ChangeDetectorRef,
    private readonly clipboardService: ClipboardService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnDestroy(): void {
    this.close();
  }

  writeValue(val: any): void {
    this.value = val;
  }

  onBlur(event?: Event) {
    this.onTouchedCallback();

    const value = this.parseDate(this.value);
    if (isValidDate(value)) {
      this.update();
      if (this.input.value !== this.displayValue) {
        this.input.value = this.displayValue;
      }
    }
    this.blur.emit(event);
  }

  open(): void {
    const value = moment(this._value);
    const isValid = value.isValid();

    this.setDialogDate(isValid ? value : new Date());

    this.dialog = this.dialogService.create({
      cssClass: 'ngx-date-time-dialog',
      template: this.calendarTpl,
      closeButton: false
    });
  }

  apply(): void {
    this.value = this.dialogModel.toDate();
    this.displayValue = this.getDisplayValue();
    this.dateTimeSelected.emit(this.value);
    this.close();
  }

  setDialogDate(date: Datelike) {
    this.dialogModel = this.createMoment(date);
    this.hour = +this.dialogModel.format('hh');
    this.minute = this.dialogModel.format('mm');
    this.amPmVal = this.dialogModel.format('A');
  }

  minuteChanged(newVal: number): void {
    this.dialogModel = this.dialogModel.clone().minute(newVal);
    this.minute = this.dialogModel.format('mm');
  }

  hourChanged(newVal: number): void {
    newVal = +newVal % 12;
    if (this.amPmVal === 'PM') {
      newVal = 12 + newVal;
    }
    this.dialogModel = this.dialogModel.clone().hour(newVal);
    this.hour = +this.dialogModel.format('hh');
  }

  selectCurrent(): void {
    this.setDialogDate(new Date());
  }

  isCurrent() {
    const now = this.createMoment(new Date());
    if (this.inputType === 'time') {
      return now.hour() === this.dialogModel.hour() && now.minute() === this.dialogModel.minute();
    }
    return now.isSame(this.dialogModel, 'minute');
  }

  clear(): void {
    this.value = undefined;
    this.update();
    this.dateTimeSelected.emit(this.value);
    this.close();
  }

  onAmPmChange(newVal: string): void {
    const clone = this.dialogModel.clone();
    if (newVal === 'AM' && this.amPmVal === 'PM') {
      this.dialogModel = clone.subtract(12, 'h');
    } else if (newVal === 'PM' && this.amPmVal === 'AM') {
      this.dialogModel = clone.add(12, 'h');
    }
    this.amPmVal = this.dialogModel.format('A');
  }

  getDayDisabled(date: moment.Moment): boolean {
    if (!date) return false;

    const isBeforeMin = this.minDate && date.isBefore(this.parseDate(this.minDate));
    const isAfterMax = this.maxDate && date.isAfter(this.parseDate(this.maxDate));

    return isBeforeMin || isAfterMax;
  }

  isTimeDisabled(mode: moment.unitOfTime.StartOf): boolean {
    return this.modes.indexOf(`${this.precision}`) > this.modes.indexOf(`${mode}`);
  }

  inputChanged(val: string): void {
    this.value = val;
    this.inputChange.emit(val);
    // since this update is coming from the input, we need to keep the display value
    this.displayValue = val;
  }

  close(): void {
    if (!this.dialog) return;

    // tear down the dialog instance
    this.dialogService.destroy(this.dialog);
    this.update();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onClick(item: any) {
    this.clipboardService.copyFromContent(item.value.clip);
    this.notificationService.create({
      body: `${item.key} date copied to clipboard`,
      styleType: NotificationStyleType.success,
      timeout: 3000
    });
  }

  validate(c: FormControl): ValidationErrors | null {
    if (!c.value) return null;

    const date = this.parseDate(c.value);
    const isValid = isValidDate(date);

    return {
      ...(isValid ? null : { invalid: true }),
      ...(isValid && !this.getDayDisabled(date) ? null : { outOfRange: true })
    };
  }

  private roundTo(val: moment.Moment, key: string): moment.Moment {
    /* istanbul ignore if */
    if (!key || !val) {
      return val;
    }
    val = val.clone();

    const idx = this.modes.indexOf(key);
    if (idx > 0) {
      this.modes.forEach((mode, index) => {
        if (index < idx) {
          val = val[mode](mode === 'date' ? 1 : 0);
        }
      });
    }
    return val;
  }

  onTouchedCallback: () => void = () => {
    // placeholder
  };

  onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  private getDisplayValue(): string {
    // note same as {{ value | amTimeZone: timezone | amDateFormat: format }}
    if (!this.value) {
      return '';
    }
    const m = this.createMoment(this.value);
    return m.isValid() ? m.format(this.format) : '' + String(this.value);
  }

  private parseDate(date: string | Date): moment.Moment {
    if (date instanceof Date) {
      /* istanbul ignore next */
      date = isNaN(date.getTime()) ? date.toString() : date.toISOString();
    }
    const inputFormats = [...this.inputFormats];
    if (this.format && !inputFormats.includes(this.format)) {
      inputFormats.unshift(this.format);
    }
    let m = this.timezone ? moment.tz(date, inputFormats, this.timezone) : moment(date, inputFormats);
    m = this.precision ? this.roundTo(m, this.precision) : m;
    return m;
  }

  // Converts datelike to a moment object, considers if timezone is needed
  private createMoment(date: Datelike): moment.Moment {
    let m = moment(date).clone();
    const timezone = this.timezone || (this.displayMode === DATE_DISPLAY_TYPES.USER ? moment.tz.guess() : undefined);
    m = timezone ? m.tz(timezone) : m;
    m = this.precision ? this.roundTo(m, this.precision) : m;
    return m;
  }

  private update() {
    this.displayValue = this.getDisplayValue();
    const mdate = this.createMoment(this.value);
    this.dateInvalid = !isValidDate(mdate);
    this.timeValues = {};

    if (this.dateInvalid || !this.hasPopup) {
      return;
    }

    const localTimezone = moment.tz.guess();

    for (const key in this.timezones) {
      const tz = this.timezones[key] || localTimezone;
      const date = mdate.clone().tz(tz);
      const clip = date.format(this.clipFormat);
      const display = date.format(this.format);
      this.timeValues[key] = {
        key,
        clip,
        display
      };
    }
  }
}
