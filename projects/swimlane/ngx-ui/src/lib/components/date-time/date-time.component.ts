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
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import moment from 'moment-timezone';

import { DialogService } from '../dialog/dialog.service';
import { DateTimeType } from './date-time-type.enum';
import { Datelike } from './date-like.type';
import { InputComponent } from '../input/input.component';

import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { CoerceNumberProperty } from '../../utils/coerce/coerce-number';

import { Size } from '../../mixins/size/size.enum';
import { Appearance } from '../../mixins/appearance/appearance.enum';
import {
  format,
  isSameMinute,
  isValid,
  parse,
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfSecond,
  startOfYear
} from 'date-fns';

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
  @Input() inputFormats: any[] = ['P', 'p', 'P p', moment.ISO_8601];

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

  @Input()
  get inputType(): string {
    if (!this._inputType) {
      return DateTimeType.date;
    }
    return this._inputType;
  }
  set inputType(val: string) {
    this._inputType = val;
    this.displayValue = this.getDisplayValue();
  }

  @Input()
  get format(): string {
    if (!this._format) {
      if (this.inputType === DateTimeType.date) {
        return 'P';
      } else if (this.inputType === DateTimeType.datetime) {
        return 'P p';
      } else {
        return 'p';
      }
    }

    return this._format;
  }
  set format(val: string) {
    this._format = val;
    this.displayValue = this.getDisplayValue();
  }

  @Input() requiredIndicator: string | boolean = '*';

  @Input()
  @CoerceBooleanProperty()
  required = false;

  get value() {
    return this._value;
  }
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

    const isValid = this.validate(date.toDate());
    this._value = date && date.isValid() ? date.toDate() : val;

    // notify of changes only when the component is cleared
    // or when the set value is valid
    if ((!val || isValid) && !isSame) {
      this.onChangeCallback(val);
      this.change.emit(val);
    }
    this.inputChange.emit(val);
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
    this.validate(this.parseDate(this._value).toDate());
  }

  @Input()
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(val: Date | string) {
    this._maxDate = val;
    this.validate(this.parseDate(this._value).toDate());
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

  private _value: Date | string;
  private _displayValue = '';
  private _format: string;
  private _inputType: string;
  private _maxDate: Date | string;
  private _minDate: Date | string;

  constructor(private readonly dialogService: DialogService, private readonly cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.close();
  }

  writeValue(val: any): void {
    this.value = val;
    this.displayValue = this.getDisplayValue();
  }

  onBlur(event?: Event) {
    this.onTouchedCallback();

    const value = this.parseDate(this.value);
    if (this.validate(value.toDate())) {
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

    this.setDialogDate(isValid ? value.toDate() : new Date());

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
    this.dialogModel = moment(this.createDate(date));
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
    const now = this.createDate(new Date());
    const dialogModel = this.dialogModel.toDate();
    if (this.inputType === 'time') {
      return now.getHours() === dialogModel.getHours() && now.getMinutes() === dialogModel.getMinutes();
    }
    return isSameMinute(dialogModel, now);
  }

  clear(): void {
    this.value = undefined;
    this.displayValue = this.getDisplayValue();
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
    this.validate(date.toDate());
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private roundTo(val: Date, key: string): Date {
    /* istanbul ignore if */
    if (!key || !val) {
      return val;
    }

    switch (key) {
      case 'millisecond':
        // TODO(jose): there is no date-fns function for this. not sure if needed though
        return val;
      case 'second':
        return startOfSecond(val);
      case 'minute':
        return startOfMinute(val);
      case 'hour':
        return startOfHour(val);
      case 'date':
        return startOfDay(val);
      case 'month':
        return startOfMonth(val);
      case 'year':
        return startOfYear(val);
      default:
        throw new Error(`Unknown time component '${key}'`);
    }
  }

  private validate(date: Date | undefined) {
    const momentDate = date ? moment(date) : undefined;

    // check if date input is empty
    const dateInput = momentDate?.creationData().input;
    const isEmpty = dateInput === '' || dateInput === null || dateInput === undefined; // 0 is a valid date input

    // date can be either valid, or an empty value if not required
    const isValidDate = isValid(date) || (!this.required && isEmpty);
    const isInRange = !this.getDayDisabled(momentDate);

    let errorMsg = '';
    if (this.required && isEmpty) {
      /* no datetime component specific error message */
    } else if (!isValidDate) errorMsg = 'Invalid Date';
    else if (!isInRange) errorMsg = 'Date out of range';
    this.errorMsg = errorMsg;

    return isValidDate && isInRange;
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

    const date = this.createDate(this.value);
    return isValid(date) ? format(date, this.format) : '' + String(this.value);
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
    m = this.precision ? moment(this.roundTo(m.toDate(), this.precision)) : m;
    return m;
  }

  private createDate(date: Datelike): Date {
    date = date instanceof Date ? date : parse(this.format, date, new Date());
    date = this.timezone ? moment(date).tz(this.timezone).toDate() : date;
    date = this.precision ? this.roundTo(date, this.precision) : date;
    return date;
  }
}
