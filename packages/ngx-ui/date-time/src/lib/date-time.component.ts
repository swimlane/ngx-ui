import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AppearanceControllerDirective,
  NGX_APPEARANCE_CONTROLLER_PROVIDER,
  NGX_APPEARANCE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/appearance';
import {
  AutofocusControllerDirective,
  NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
  NGX_AUTOFOCUS_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/autofocus';
import {
  AutosizeControllerDirective,
  NGX_AUTOSIZE_CONTROLLER_PROVIDER,
  NGX_AUTOSIZE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/autosize';
import { DialogComponent, DialogService } from '@swimlane/ngx-ui/dialog';
import { InputComponent } from '@swimlane/ngx-ui/input';
import {
  InputAttributeControllerDirective,
  NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
  NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/input-attribute';
import {
  MarginlessControllerDirective,
  NGX_MARGINLESS_CONTROLLER_PROVIDER,
  NGX_MARGINLESS_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/marginless';
import {
  NGX_SIZE_CONTROLLER_PROVIDER,
  NGX_SIZE_WATCHED_CONTROLLER,
  SizeControllerDirective,
} from '@swimlane/ngx-ui/size';
import { DateLike, DateTimeType, EnumKey } from '@swimlane/ngx-ui/typings';
import type { Moment, MomentBuiltinFormat, unitOfTime } from 'moment-timezone';
import * as momentImported from 'moment-timezone';

const moment = momentImported;

let nextId = 0;

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
  providers: [
    DATE_TIME_VALUE_ACCESSOR,
    NGX_SIZE_CONTROLLER_PROVIDER,
    NGX_APPEARANCE_CONTROLLER_PROVIDER,
    NGX_MARGINLESS_CONTROLLER_PROVIDER,
    NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
    NGX_AUTOSIZE_CONTROLLER_PROVIDER,
    NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
  ],
})
export class DateTimeComponent implements ControlValueAccessor {
  static ngAcceptInputType_dateTimeInputType: EnumKey<typeof DateTimeType>;

  @HostBinding('class.ngx-date-time') hostClass = true;

  @Input() id = `datetime-${++nextId}`;

  @Input() precision?: unitOfTime.StartOf;
  @Input() timezone?: string;
  @Input() inputFormats: (string | MomentBuiltinFormat)[] = [
    'L',
    `LT`,
    'L LT',
    moment.ISO_8601,
  ];

  @Input()
  get dateTimeInputType(): string {
    if (!this._dateTimeInputType) {
      return DateTimeType.date;
    }
    return this._dateTimeInputType;
  }

  set dateTimeInputType(val: string) {
    this._dateTimeInputType = val;
    this.displayValue = this.getDisplayValue();
  }

  private _dateTimeInputType = '';

  @Input()
  get minDate() {
    return this._minDate;
  }

  set minDate(val: Date | string | undefined) {
    this._minDate = val;
    if (this._value) {
      this.validate(this.parseDate(this._value));
    }
  }

  private _minDate?: Date | string;

  @Input()
  get maxDate() {
    return this._maxDate;
  }

  set maxDate(val: Date | string | undefined) {
    this._maxDate = val;
    if (this._value) {
      this.validate(this.parseDate(this._value));
    }
  }

  private _maxDate?: Date | string;

  @Input()
  get format(): string {
    if (!this._format) {
      if (this.dateTimeInputType === DateTimeType.date) {
        return 'L';
      }

      if (this.dateTimeInputType === DateTimeType.dateTime) {
        return 'L LT';
      }

      return 'LT';
    }

    return this._format;
  }

  set format(val: string) {
    this._format = val;
    this.displayValue = this.getDisplayValue();
  }

  private _format = '';

  get displayValue(): string {
    return this._displayValue;
  }

  set displayValue(value: string) {
    this._displayValue = value;
    this.cdr.markForCheck();
  }

  private _displayValue = '';

  get value() {
    return this._value;
  }

  set value(val: Date | string | undefined) {
    let date: Moment | undefined;
    let isSame: boolean;

    if (val) {
      date = this.parseDate(val);
      let sameDiff: unitOfTime.StartOf;

      if (this.precision) {
        sameDiff = this.precision;
      } else {
        sameDiff =
          this.dateTimeInputType === DateTimeType.date ? 'day' : 'second';
      }

      isSame = !!this._value && date.isSame(this._value, sameDiff);
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
      this.dateTimeChange.emit(val);
    }
    this.inputChange.emit(val);
  }

  private _value: Date | string | undefined;

  @Output() dateTimeChange = new EventEmitter<string | Date>();
  @Output() dateTimeBlur = new EventEmitter<Event>();
  @Output() dateTimeSelected = new EventEmitter<Date | string>();

  /**
   * this output will emit anytime the value changes regardless of validity.
   * @see change when only emitting
   */
  @Output() inputChange = new EventEmitter<string | Date>();

  @ViewChild('dialogTpl', { static: true })
  readonly calendarTpl!: TemplateRef<ElementRef>;

  @ViewChild('input', { static: true })
  readonly input!: InputComponent;

  errorMsg = '';
  dialog?: ComponentRef<DialogComponent>;
  dialogModel!: Moment;
  hour?: number;
  minute?: string;
  amPmVal?: string;
  modes = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];

  constructor(
    @Inject(NGX_APPEARANCE_WATCHED_CONTROLLER)
    public readonly appearanceController: AppearanceControllerDirective,
    @Inject(NGX_SIZE_WATCHED_CONTROLLER)
    public readonly sizeController: SizeControllerDirective,
    @Inject(NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER)
    public readonly inputAttributeController: InputAttributeControllerDirective,
    @Inject(NGX_AUTOFOCUS_WATCHED_CONTROLLER)
    public readonly autofocusController: AutofocusControllerDirective,
    @Inject(NGX_AUTOSIZE_WATCHED_CONTROLLER)
    public readonly autosizeController: AutosizeControllerDirective,
    @Inject(NGX_MARGINLESS_WATCHED_CONTROLLER)
    public readonly marginlessController: MarginlessControllerDirective,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialogService: DialogService
  ) {}

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

  onBlur(event?: FocusEvent) {
    this.onTouchedCallback();

    if (this.value) {
      const value = this.parseDate(this.value);
      if (this.validate(value)) {
        const displayValue = this.getDisplayValue();
        if (this.input.value !== displayValue) {
          this.input.value = displayValue;
        }
      }
    }
    this.dateTimeBlur.emit(event);
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
    if (this.dateTimeInputType === 'time') {
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

  inputChanged(val: string): void {
    const date = this.parseDate(val);
    this.value = date.isValid() ? date.toDate() : val;
    this.displayValue = val;
  }

  close(): void {
    if (!this.dialog) return;

    // tear down the dialog instance
    this.dialogService.destroy(this.dialog);

    if (this.value) {
      const date = this.parseDate(this.value);
      this.validate(date);
    }
  }

  writeValue(val: Date | string): void {
    this.value = val;
    this.displayValue = this.getDisplayValue();
  }

  registerOnChange(fn: (val: Date | string | undefined) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  getDayDisabled(date: Moment | undefined): boolean {
    if (!date) return false;

    const isBeforeMin =
      this.minDate && date.isBefore(this.parseDate(this.minDate));
    const isAfterMax =
      this.maxDate && date.isAfter(this.parseDate(this.maxDate));

    return !!isBeforeMin || !!isAfterMax;
  }

  isTimeDisabled(mode: unitOfTime.StartOf): boolean {
    return (
      this.modes.indexOf(`${this.precision}`) > this.modes.indexOf(`${mode}`)
    );
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
          val = (val as unknown as Record<string, (val: number) => Moment>)[
            mode
          ](mode === 'date' ? 1 : 0);
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
    const isValid =
      date?.isValid() || (!this.inputAttributeController.required && isEmpty);
    const isInRange = !this.getDayDisabled(date);

    let errorMsg = '';
    if (this.inputAttributeController.required && isEmpty) {
      /* no datetime component specific error message */
    } else if (!isValid) errorMsg = 'Invalid Date';
    else if (!isInRange) errorMsg = 'Date out of range';
    this.errorMsg = errorMsg;

    return isValid && isInRange;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: Date | string | undefined) => void = () => {
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
