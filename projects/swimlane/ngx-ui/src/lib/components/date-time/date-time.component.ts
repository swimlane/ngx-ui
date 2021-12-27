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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
import { DATE_DISPLAY_FORMATS, DATE_DISPLAY_TYPES } from '../time-display/date-formats.enum';

let nextId = 0;

const MIN_WIDTH = 60;

const DATE_TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true
};

@Component({
  exportAs: 'ngxDateTime',
  selector: 'ngx-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [DATE_TIME_VALUE_ACCESSOR],
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
  @Input() inputFormats: any[] = ['L', 'LT', 'L LT', moment.ISO_8601];

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
    let date: moment.Moment;
    let isSame: boolean;

    if (val) {
      date = this.parseDate(val);
      let sameDiff: moment.unitOfTime.StartOf;

      if (this.precision) {
        sameDiff = this.precision;
      } else {
        sameDiff = this.inputType === DateTimeType.date ? 'day' : 'second';
      }

      isSame = this._value && date.isSame(this._value, sameDiff);
    } else {
      // if we have a val and had no val before, ensure
      // we set the property correctly even if its same
      isSame = val === this._value;
    }

    const isValid = this.validate(date);
    this._value = date && date.isValid() ? date.toDate() : val;

    // notify of changes only when the component is cleared
    // or when the set value is valid
    if ((!val || isValid) && !isSame) {
      this.onChangeCallback(val);
      this.change.emit(val);
    }
    this.inputChange.emit(val);
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
   * @see inputChange for always emitting the value
   */
  @Output() change = new EventEmitter<string | Date>();
  @Output() blur = new EventEmitter<Event>();
  @Output() dateTimeSelected = new EventEmitter<Date | string>();

  /**
   * this output will emit anytime the value changes regardless of validity.
   * @see change when only emitting
   */
  @Output() inputChange = new EventEmitter<string | Date>();

  @ViewChild('dialogTpl', { static: true })
  readonly calendarTpl: TemplateRef<ElementRef>;

  @ViewChild('input', { static: true })
  readonly input: InputComponent;

  errorMsg: string;
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
    this.update();
  }

  onBlur(event?: Event) {
    this.onTouchedCallback();

    const value = this.parseDate(this.value);
    if (this.validate(value)) {
      const displayValue = this.getDisplayValue();
      if (this.input.value !== displayValue) {
        this.input.value = displayValue;
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
    const date = this.parseDate(val);
    this.value = date.isValid() ? date.toDate() : val;
    this.displayValue = val;
  }

  close(): void {
    if (!this.dialog) return;

    // tear down the dialog instance
    this.dialogService.destroy(this.dialog);

    const date = this.parseDate(this.value);
    this.validate(date);
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

  private validate(date: moment.Moment | undefined) {
    // check if date input is empty
    const dateInput = date?.creationData().input;
    const isEmpty = dateInput === '' || dateInput === null || dateInput === undefined; // 0 is a valid date input

    // date can be either valid, or an empty value if not required
    const isValid = date?.isValid() || (!this.required && isEmpty);
    const isInRange = !this.getDayDisabled(date);

    let errorMsg = '';
    if (this.required && isEmpty) {
      /* no datetime component specific error message */
    } else if (!isValid) errorMsg = 'Invalid Date';
    else if (!isInRange) errorMsg = 'Date out of range';

    this.errorMsg = errorMsg;

    return isValid && isInRange;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: any) => void = () => {
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
    this.dateInvalid = !this.validate(this.parseDate(this.value));

    this.timeValues = {};

    if (this.dateInvalid) {
      return;
    }

    const localTimezone = moment.tz.guess();
    const mdate = this.createMoment(this.value);

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
