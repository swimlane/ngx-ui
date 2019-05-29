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
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import moment from 'moment-timezone';

import { DialogService } from '../dialog/dialog.service';
import { DateTimeType } from './date-time.type';

let nextId = 0;

const DATE_TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true
};

type Datelike = string | Date | moment.Moment;

@Component({
  selector: 'ngx-date-time',
  providers: [DATE_TIME_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./date-time.component.scss'],
  template: `
    <div class="ngx-date-time">
      <ng-template #dialogTpl>
        <div class="selected-header text-center">
          <h1>
            <span *ngIf="dialogModel && (inputType === 'datetime' || inputType === 'date')">
              {{ dialogModel | amTimeZone: timezone | amDateFormat: 'ddd, MMM D YYYY' }}
              <small *ngIf="inputType === 'datetime'">
                {{ dialogModel | amTimeZone: timezone | amDateFormat: 'h:mm a' }}
              </small>
            </span>
            <span *ngIf="dialogModel && inputType === 'time'">
              {{ dialogModel | amTimeZone: timezone | amDateFormat: 'h:mm a' }}
            </span>
            <span *ngIf="!dialogModel">No value</span>
          </h1>
        </div>
        <ngx-calendar
          [id]="id + '-cal'"
          *ngIf="inputType === 'date' || inputType === 'datetime'"
          (change)="setDialogDate($event)"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [ngModel]="dialogModel"
          [timezone]="timezone"
          [minView]="precision"
          name="calendar"
        >
        </ngx-calendar>
        <div class="time-row" *ngIf="inputType === 'time' || inputType === 'datetime'">
          <div fxLayout="row" fxLayoutGap="10px" fxLayoutWrap="nowrap" fxLayoutAlign="center baseline">
            <div fxFlex>
              <ngx-input
                type="number"
                hint="Hour"
                [id]="id + '-hour'"
                [ngModel]="hour"
                min="1"
                max="12"
                (change)="hourChanged($event)"
                [disabled]="isTimeDisabled('hour')"
              >
              </ngx-input>
            </div>
            <div fxFlex>
              <ngx-input
                type="number"
                hint="Minute"
                [id]="id + '-minute'"
                [ngModel]="minute"
                min="0"
                max="59"
                (change)="minuteChanged($event)"
                [disabled]="isTimeDisabled('minute')"
              >
              </ngx-input>
            </div>
            <div fxFlex>
              <button
                class="ampm"
                type="button"
                [class.selected]="amPmVal === 'AM'"
                (click)="onAmPmChange('AM')"
                [disabled]="isTimeDisabled('hour')"
              >
                AM
              </button>
              <button
                class="ampm"
                type="button"
                [class.selected]="amPmVal === 'PM'"
                (click)="onAmPmChange('PM')"
                [disabled]="isTimeDisabled('hour')"
              >
                PM
              </button>
            </div>
          </div>
        </div>
        <nav role="navigation" class="ngx-dialog-footer">
          <div fxLayout="row" fxLayoutWrap="nowrap">
            <div class="text-left" fxFlex="1 1 50%">
              <button type="button" class="btn btn-link today-btn" (click)="selectCurrent()" [hidden]="isCurrent()">
                Current
              </button>
            </div>
            <div class="text-right" fxFlex="1 1 50%">
              <button type="button" class="btn btn-link clear-btn" (click)="clear()">Clear</button>
              <button type="button" class="btn btn-link apply-btn" (click)="apply()">Apply</button>
            </div>
          </div>
        </nav>
      </ng-template>
      <ngx-input
        #input
        [id]="id + '-input'"
        [autocorrect]="false"
        [autocomplete]="false"
        [spellcheck]="false"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [autofocus]="autofocus"
        [tabindex]="tabindex"
        [label]="label"
        [ngModel]="displayValue"
        (ngModelChange)="inputChanged($event)"
        (blur)="onBlur()"
      >
        <ngx-input-hint>
          <div fxLayout="row" fxLayoutGap="10px" fxLayoutWrap="nowrap">
            <div fxFlex *ngIf="hint" class="text-left">{{ hint }}</div>
            <div *ngIf="errorMsg" fxFlex class="text-right input-error">{{ errorMsg }}</div>
          </div>
        </ngx-input-hint>
      </ngx-input>
      <button
        title="Show date/time selector"
        type="button"
        [disabled]="disabled"
        (click)="open()"
        [ngClass]="{
          'icon-calendar': inputType === 'date',
          'icon-calendar-clock': inputType === 'datetime',
          'icon-clock': inputType === 'time'
        }"
        class="calendar-dialog-btn"
      ></button>
    </div>
  `
})
export class DateTimeComponent implements OnDestroy, ControlValueAccessor {
  @Input() id: string = `datetime-${++nextId}`;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() tabindex: number;
  @Input() autofocus: boolean = false;

  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string = '';

  @Input() minDate: string | Date;
  @Input() maxDate: string | Date;
  @Input() precision: moment.unitOfTime.StartOf;

  @Input() timezone: string;
  @Input() inputFormats: any[] = ['L', `LT`, 'L LT', moment.ISO_8601];

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
      } else if (this.inputType === DateTimeType.time) {
        return 'LT';
      }
    }
    return this._format;
  }
  set format(val: string) {
    this._format = val;
    this.displayValue = this.getDisplayValue();
  }

  get value(): Date | string {
    return this._value;
  }
  set value(val: Date | string) {
    let date: moment.Moment;
    let isSame;

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

    if (val && date) {
      this.validate(date);
    }
    this._value = date && date.isValid() ? date.toDate() : val;

    if (!isSame) {
      this.onChangeCallback(val);
      this.change.emit(val);
    }
  }

  @Output() change = new EventEmitter<any>();

  @ViewChild('dialogTpl', { static: true }) calendarTpl: TemplateRef<ElementRef>;
  @ViewChild('input', { static: true }) input: any;

  errorMsg: string;
  dialog: any;
  dialogModel: moment.Moment;
  hour: number;
  minute: string;
  amPmVal: string;
  displayValue = '';
  modes = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];

  private _value: Date | string;
  private _format: string;
  private _inputType: string;

  constructor(private dialogService: DialogService) {}

  ngOnDestroy(): void {
    this.close();
  }

  writeValue(val: any): void {
    this.value = val;
    this.displayValue = this.getDisplayValue();
  }

  onBlur() {
    this.onTouchedCallback();

    const value = this.parseDate(this.value);
    if (this.validate(value)) {
      const displayValue = this.getDisplayValue();
      if (this.input.value !== displayValue) {
        this.input.value = displayValue;
      }
    }
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
    this.displayValue = this.getDisplayValue();
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

  isTimeDisabled(mode: string): boolean {
    return this.modes.indexOf(`${this.precision}`) > this.modes.indexOf(mode);
  }

  inputChanged(val: string): void {
    const date = this.parseDate(val);
    this.value = date.isValid() ? date.toDate() : val;
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

  private roundTo(val: moment.Moment, key: string): moment.Moment {
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

  private validate(date: moment.Moment) {
    const isValid = date.isValid();
    const outOfRange = this.getDayDisabled(date);

    let errorMsg = '';
    if (!isValid) errorMsg = 'Invalid Date';
    if (outOfRange) errorMsg = 'Date out of range';
    this.errorMsg = errorMsg;

    return isValid && !outOfRange;
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

  private createMoment(date: Datelike): moment.Moment {
    let m = moment(date).clone();
    m = this.timezone ? m.tz(this.timezone) : m;
    m = this.precision ? this.roundTo(m, this.precision) : m;
    return m;
  }
}
