import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import { DialogService } from '@swimlane/ngx-ui/dialog';
import { InputComponent } from '@swimlane/ngx-ui/input';
import type { DateLike, EnumKey } from '@swimlane/ngx-ui/types';
import { Appearance, Size } from '@swimlane/ngx-ui/types';
import type { Moment, MomentBuiltinFormat } from 'moment';
import { ISO_8601, unitOfTime } from 'moment';

import * as momentImported from 'moment-timezone';
import { DateTimeType } from './enums';

const moment = momentImported;

let nextId = 0;

const MIN_WIDTH = 60;

const DATE_TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true,
};

@Component({
  selector: 'ngx-date-time',
  exportAs: 'ngxDateTime',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_TIME_VALUE_ACCESSOR],
})
export class DateTimeComponent implements OnInit {
  static ngAcceptInputType_minWidth: NumericInput;
  static ngAcceptInputType_tabIndex: NumericInput;
  static ngAcceptInputType_marginless: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_autofocus: BooleanInput;
  static ngAcceptInputType_autosize: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;

  @Input() id: string = `datetime-${++nextId}`;
  @Input() name?: string;
  @Input() label = '';
  @Input() hint?: string;
  @Input() placeholder = '';

  @InputEnum(Size)
  @Input('size')
  _size!: EnumKey<typeof Size>;
  size = Size.small;

  @InputEnum(Appearance)
  @Input('appearance')
  _appearance!: EnumKey<typeof Appearance>;
  appearance = Appearance.legacy;

  @Input() minDate?: string | Date;
  @Input() maxDate?: string | Date;

  @Input() precision?: unitOfTime.StartOf;
  @Input() timezone?: string;

  @Input() inputFormats: (string | MomentBuiltinFormat)[] = [
    'L',
    `LT`,
    'L LT',
    ISO_8601,
  ];

  @InputNumeric(MIN_WIDTH)
  @Input()
  minWidth = MIN_WIDTH;

  @HostBinding('class.marginless')
  @InputBoolean()
  @Input()
  marginless = false;

  @InputBoolean()
  @Input()
  disabled = false;

  @InputNumeric()
  @Input()
  tabindex?: number;

  @InputBoolean()
  @Input()
  autofocus = false;

  @Input() requiredIndicator: string | boolean = '*';

  @InputBoolean()
  @Input()
  required = false;

  @HostBinding('class.autosize')
  @InputBoolean()
  @Input()
  autosize = false;

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
        return 'L';
      } else if (this.inputType === DateTimeType.datetime) {
        return 'L LT';
      } else {
        return 'LT';
      }
    }

    return this._format;
  }

  set format(val: string) {
    this._format = val;
    this.displayValue = this.getDisplayValue();
  }

  /**
   * this output will emit only when the input value is valid or cleared.
   * @see {@link inputChange} for always emitting the value
   */
  @Output() change = new EventEmitter<string | Date>();
  @Output() blur = new EventEmitter<Event>();

  @Output() dateTimeSelected = new EventEmitter<Date | string>();

  /**
   * this output will emit anytime the value changes regardless of validity.
   * @see {@link change} when only emitting
   */
  @Output() inputChange = new EventEmitter<string | Date>();

  @ViewChild('dialogTpl', { static: true })
  readonly calendarTpl!: TemplateRef<ElementRef>;

  @ViewChild(InputComponent, { static: true })
  readonly input!: InputComponent;

  @HostBinding('class.ngx-date-time') hostClass = true;

  @HostBinding('class.legacy') get legacyClass() {
    return this.appearance === Appearance.legacy;
  }

  @HostBinding('class.fill') get fillClass() {
    return this.appearance === Appearance.fill;
  }

  @HostBinding('class.sm') get smallClass() {
    return this.size === Size.small;
  }

  @HostBinding('class.md') get mediumClass() {
    return this.size === Size.medium;
  }

  @HostBinding('class.lg') get largeClass() {
    return this.size === Size.large;
  }

  @HostBinding('class.no-label') get noLabelClass() {
    return !this.label;
  }

  errorMsg?: string;
  dialog?: any;
  dialogModel!: Moment;
  hour?: number;
  minute?: string;
  amPmVal?: string;
  modes = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];

  get value() {
    return this._value;
  }

  set value(val: Date | string | undefined) {
    let date: Moment;
    let isSame: boolean;

    if (val) {
      date = this.parseDate(val);
      let sameDiff: unitOfTime.StartOf;

      if (this.precision) {
        sameDiff = this.precision;
      } else {
        sameDiff = this.inputType === DateTimeType.date ? 'day' : 'second';
      }

      isSame = !!this._value && date.isSame(this._value, sameDiff);
    } else {
      // if we have a val and had no val before, ensure
      // we set the property correctly even if its same
      isSame = val === this._value;
    }

    const isValid = this.validate(date!);
    this._value = !!date! && date.isValid() ? date.toDate() : val;

    // notify of changes only when the component is cleared
    // or when the set value is valid
    if ((!val || isValid) && !isSame) {
      this.onChangeCallback(val);
      this.change.emit(val);
    }
    this.inputChange.emit(val);
  }

  private _value!: Date | string | undefined;

  get displayValue(): string {
    return this._displayValue;
  }

  set displayValue(value: string) {
    this._displayValue = value;
    this.cdr.markForCheck();
  }

  private _displayValue = '';

  private _format!: string;
  private _inputType!: string;

  constructor(
    private readonly dialogService: DialogService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  writeValue(val: any): void {
    this.value = val;
    this.displayValue = this.getDisplayValue();
  }

  onBlur(event?: Event) {
    this.onTouchedCallback();

    const value = this.parseDate(this.value!);
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
      closeButton: false,
    });
  }

  apply(): void {
    this.value = this.dialogModel.toDate();
    this.displayValue = this.getDisplayValue();
    this.dateTimeSelected.emit(this.value);
    this.close();
  }

  setDialogDate(date: DateLike) {
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
      return (
        now.hour() === this.dialogModel.hour() &&
        now.minute() === this.dialogModel.minute()
      );
    }
    return now.isSame(this.dialogModel, 'minute');
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

  getDayDisabled(date: Moment): boolean {
    if (!date) return false;

    const isBeforeMin =
      !!this.minDate && date.isBefore(this.parseDate(this.minDate));
    const isAfterMax =
      !!this.maxDate && date.isAfter(this.parseDate(this.maxDate));

    return isBeforeMin || isAfterMax;
  }

  isTimeDisabled(mode: moment.unitOfTime.StartOf): boolean {
    return (
      this.modes.indexOf(`${this.precision}`) > this.modes.indexOf(`${mode}`)
    );
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

    const date = this.parseDate(this.value!);
    this.validate(date);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private roundTo(val: Moment, key: string): Moment {
    /* istanbul ignore if */
    if (!key || !val) {
      return val;
    }
    val = val.clone();

    const idx = this.modes.indexOf(key);
    if (idx > 0) {
      this.modes.forEach((mode, index) => {
        if (index < idx) {
          val = (val as any)[mode](mode === 'date' ? 1 : 0);
        }
      });
    }
    return val;
  }

  private validate(date: Moment | undefined) {
    // check if date input is empty
    const dateInput = date?.creationData().input;
    const isEmpty =
      dateInput === '' || dateInput === null || dateInput === undefined; // 0 is a valid date input

    // date can be either valid, or an empty value if not required
    const isValid = date?.isValid() || (!this.required && isEmpty);
    const isInRange = !this.getDayDisabled(date!);

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

  private parseDate(date: string | Date): Moment {
    if (date instanceof Date) {
      /* istanbul ignore next */
      date = isNaN(date.getTime()) ? date.toString() : date.toISOString();
    }
    const inputFormats = [...this.inputFormats];
    if (this.format && !inputFormats.includes(this.format)) {
      inputFormats.unshift(this.format);
    }
    let m = this.timezone
      ? moment.tz(date, inputFormats, this.timezone)
      : moment(date, inputFormats);
    m = this.precision ? this.roundTo(m, this.precision) : m;
    return m;
  }

  private createMoment(date: DateLike): Moment {
    let m = moment(date).clone();
    m = this.timezone ? m.tz(this.timezone) : m;
    m = this.precision ? this.roundTo(m, this.precision) : m;
    return m;
  }
}
