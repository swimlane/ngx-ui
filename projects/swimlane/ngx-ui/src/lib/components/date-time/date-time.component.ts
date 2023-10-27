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
  HostBinding,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import moment from 'moment-timezone';

import { Clipboard } from '@angular/cdk/clipboard';

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
import { DATE_DISPLAY_FORMATS, DATE_DISPLAY_INPUT_FORMATS, DATE_DISPLAY_TYPES } from '../../enums/date-formats.enum';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { CalendarComponent } from '../calendar/calendar.component';
import { defaultDisplayFormat, defaultInputFormat } from '../../utils/date-formats/default-formats';
import { TooltipDirective } from '../tooltip/tooltip.directive';

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

const guessTimeZone = moment.tz.guess();

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
export class DateTimeComponent implements OnDestroy, OnChanges, ControlValueAccessor, Validator {
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
  set value(val: Date | string) {
    if (typeof val === 'string') {
      val = val.trim();
    }

    if (!val && !this._value) {
      val = this._value = null; // Match falsely values
    }

    let isSame = val === this._value;
    if (isSame) return; // if values are the same at this point, do nothing

    let isDate = false;
    const date = this.parseDate(val);
    if (val && date.isValid()) {
      isDate = true;
      if (this._value instanceof Date) {
        // only compare precision if old values is a date
        const sameDiff: moment.unitOfTime.StartOf = this.precision
          ? this.precision
          : this.inputType === DateTimeType.date
          ? 'day'
          : 'second';
        isSame = this._value ? date.isSame(this._value, sameDiff) : false;
      }
    }

    this._value = isDate ? date.toDate() : val;

    if (!isSame) {
      // update the display value and table
      this.update();

      // notify of changes only when the component is cleared
      // or when the set value is valid
      if (!this.dateInvalid) {
        this.change.emit(this._value);
      }

      // called each time for validation
      this.onChangeCallback(this._value);
      this.valueChange.emit(val);
    }
  }
  get value(): Date | string {
    return this._value;
  }

  @Input()
  @CoerceBooleanProperty()
  disabled = false;

  @Input()
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
  set inputType(val: string) {
    this._inputType = val;
  }
  get inputType(): string {
    if (this._inputType) return this._inputType;
    if (this.precision === 'hour' || this.precision === 'minute') return DateTimeType.datetime;
    return DateTimeType.date;
  }

  /**
   * Display mode for date/time
   * 'timezone' - display date/time with a timezone
   * 'local' - display date/time without timezone
   *
   * Defaults to LOCAL unless timezone is set
   */
  @Input()
  set displayMode(val: DATE_DISPLAY_TYPES) {
    this._displayMode = val;
  }
  // Defaults to LOCAL unless
  get displayMode(): DATE_DISPLAY_TYPES {
    if (typeof this._displayMode === 'string') {
      return this._displayMode;
    }
    return this.timezone ? DATE_DISPLAY_TYPES.TIMEZONE : DATE_DISPLAY_TYPES.LOCAL;
  }

  /**
   * Display format for date/time
   * Considers if mode is user (has timezone), local (no timezone)
   */
  @Input()
  set format(val: string) {
    this._format = val;
  }
  get format(): string {
    if (this._format) return DATE_DISPLAY_FORMATS[this._format] || this._format;
    return defaultInputFormat(this.displayMode, this.inputType as DateTimeType, this.precision);
  }

  @Input()
  set tooltipFormat(val: string) {
    this._tooltipFormat = val;
  }
  get tooltipFormat(): string {
    if (this._tooltipFormat) return DATE_DISPLAY_FORMATS[this._tooltipFormat] || this._tooltipFormat;
    if (this._format) return DATE_DISPLAY_FORMATS[this._format] || this._format;

    return defaultDisplayFormat(this.displayMode, this.inputType as DateTimeType, this.precision);
  }

  @Input()
  @CoerceBooleanProperty()
  tooltipDisabled = false;

  @HostBinding('class.ngx-date-time--has-popup')
  get hasPopup() {
    if (DATE_DISPLAY_TYPES.LOCAL === this.displayMode) return false;
    if (this.tooltipDisabled) return false;
    if (this._focused) return false;
    return !!this.value && !this.dateInvalid;
  }

  @HostBinding('class.ngx-date-time--date-invalid')
  dateInvalid = false;

  @HostBinding('class.ngx-date-time--date-out-of-range')
  dateOutOfRange = false;

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
    if (this._clipFormat) return DATE_DISPLAY_FORMATS[this._clipFormat] || this._clipFormat;
    return this.format;
  }

  @Input() requiredIndicator: string | boolean = '*';

  @Input()
  @CoerceBooleanProperty()
  required = false;

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
  minDate: Date | string;

  @Input()
  maxDate: Date | string;

  /**
   * this output will emit only when the input value is valid or cleared.
   */
  @Output() change = new EventEmitter<string | Date | undefined | null>();

  /**
   * this output will emit anytime the value changes regardless of validity.
   */
  @Output() valueChange = new EventEmitter<string | Date | undefined | null>();

  /**
   * this output will emit anytime the value changes in the input, regardless of validity.
   */
  @Output() inputChange = new EventEmitter<string | Date | undefined | null>();

  /**
   * this output will emit a date is selected from the calendar
   */
  @Output() dateTimeSelected = new EventEmitter<Date | string>();

  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();

  @ViewChild('dialogTpl', { static: true })
  readonly calendarTpl: TemplateRef<ElementRef>;

  @ViewChild('input', { static: true })
  readonly input: InputComponent;

  @ViewChild(CalendarComponent, { static: false })
  readonly calendar: CalendarComponent;

  @ViewChild(TooltipDirective, { static: true })
  readonly tooltip: TooltipDirective;

  dialog: any;
  dialogModel: moment.Moment;
  hour: number;
  minute: string;
  second: string;
  millisecond: string;
  amPmVal: string;
  modes = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];
  timeValues = {};

  private _value: Date | string;
  private _displayValue = '';
  private _format: string;
  private _tooltipFormat: string;
  private _inputType: string;
  private _displayMode: DATE_DISPLAY_TYPES;
  private _clipFormat: string;
  private _focused = false;

  constructor(
    private readonly dialogService: DialogService,
    private readonly cdr: ChangeDetectorRef,
    private readonly clipboard: Clipboard,
    private readonly notificationService: NotificationService
  ) {}

  ngOnDestroy(): void {
    this.close();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('value' in changes && !changes.value.firstChange) return; // only on first change to value
    if (this._focused) return; // don't update if focused
    this.update();
  }

  writeValue(val: any): void {
    this.value = val;
  }

  onFocus(event?: Event) {
    this.tooltip.hideTooltip();
    this._focused = true;
    this.focus.emit(event);
  }

  onBlur(event?: Event) {
    this.onTouchedCallback();
    this._focused = false;

    this.update();
    if (!this.dateInvalid && this.input.value !== this.displayValue) {
      this.input.value = this.displayValue;
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
    this.update();
    this.dateTimeSelected.emit(this.value);
    this.close();
  }

  setDialogDate(date: Datelike) {
    this.dialogModel = this.createMoment(date);
    this.hour = +this.dialogModel.format('hh');
    this.minute = this.dialogModel.format('mm');
    this.second = this.dialogModel.format('ss');
    this.millisecond = this.dialogModel.format('SSS');
    this.amPmVal = this.dialogModel.format('A');
  }

  minuteChanged(newVal: number): void {
    this.dialogModel = this.dialogModel.clone().minute(newVal);
    this.minute = this.dialogModel.format('mm');
  }

  secondChanged(newVal: number): void {
    this.dialogModel = this.dialogModel.clone().second(newVal);
    this.second = this.dialogModel.format('ss');
  }

  millisecondChanged(newVal: number): void {
    this.dialogModel = this.dialogModel.clone().millisecond(newVal);
    this.millisecond = this.dialogModel.format('SSS');
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
      return (
        now.hour() === this.dialogModel.hour() &&
        now.minute() === this.dialogModel.minute() &&
        now.second() === this.dialogModel.second() &&
        now.millisecond() === this.dialogModel.millisecond()
      );
    }
    return now.isSame(this.dialogModel, 'millisecond');
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
    this.clipboard.copy(item.value.clip);
    this.notificationService.create({
      body: `${item.key} date copied to clipboard`,
      styleType: NotificationStyleType.success,
      timeout: 3000
    });
  }

  validate(c: FormControl): ValidationErrors | null {
    if (!c.value) return null;

    return {
      ...(this.dateInvalid ? { invalid: true } : null),
      ...(this.dateOutOfRange ? { outOfRange: true } : null)
    };
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onTouchedCallback: () => void = () => {
    // placeholder
  };

  onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.code === KeyboardKeys.ARROW_DOWN) {
      // Down Arrow	Open the calendar pop-up
      this.open();
      setTimeout(() => {
        this.calendar.focus();
      }, 200);
    } else if (event.code === KeyboardKeys.ESCAPE) {
      // Escape	Close the calendar pop-up
      this.close();
    }
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

  private parseDate(date: string | Date): moment.Moment {
    if (date instanceof Date) {
      /* istanbul ignore next */
      date = isNaN(date.getTime()) ? date.toString() : date.toISOString();
    }
    // Ensures that the input formats includes the display format
    const inputFormats = [...this.inputFormats];
    if (this.format && !inputFormats.includes(this.format)) {
      inputFormats.unshift(this.format);
    }
    const timezone = this.timezone || (this.displayMode === DATE_DISPLAY_TYPES.TIMEZONE ? guessTimeZone : undefined);
    let m = timezone ? moment.tz(date, inputFormats, timezone) : moment(date, inputFormats);
    m = this.precision ? this.roundTo(m, this.precision) : m;
    return m;
  }

  // Converts datelike to a moment object, considers if timezone is needed
  private createMoment(date: Datelike): moment.Moment {
    let m = moment(date).clone();
    const timezone = this.timezone || (this.displayMode === DATE_DISPLAY_TYPES.TIMEZONE ? guessTimeZone : undefined);
    m = timezone ? m.tz(timezone) : m;
    m = this.precision ? this.roundTo(m, this.precision) : m;
    return m;
  }

  private update() {
    const isDate = this.value instanceof Date;
    this.dateInvalid = !!this.value && !isDate; // if there is a value and it's not a date then it is invalid, falsy values are valid
    this.displayValue = !this.value ? '' : String(this.value);
    this.dateOutOfRange = false;
    this.timeValues = {};

    if (!isDate) return;

    const mdate = this.createMoment(this.value);
    this.displayValue = mdate.format(this.format);
    this.dateOutOfRange = !this.dateInvalid && this.getDayDisabled(mdate);

    if (!this.hasPopup) return;

    for (const key in this.timezones) {
      const tz = this.timezones[key] || guessTimeZone;
      const date = mdate.clone().tz(tz);
      const clip = date.format(this.clipFormat);
      const display = date.format(this.tooltipFormat);
      this.timeValues[key] = {
        key,
        clip,
        display
      };
    }
  }
}
