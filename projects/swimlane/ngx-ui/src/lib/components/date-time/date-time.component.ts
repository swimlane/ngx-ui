import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  forwardRef,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import moment from 'moment-timezone';

import { debounceable } from '../../utils';
import { DialogService } from '../dialog';
import { DateTimeType } from './date-time.type';

let nextId = 0;

const DATE_TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true
};

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
              {{dialogModel | amTimeZone: timezone | amDateFormat: 'ddd, MMM D YYYY'}}
              <small *ngIf="inputType === 'datetime'">
                {{dialogModel | amTimeZone: timezone | amDateFormat: 'h:mm a'}}
              </small>
            </span>
            <span *ngIf="dialogModel && inputType === 'time'">
              {{dialogModel | amTimeZone: timezone | amDateFormat: 'h:mm a'}}
            </span>
            <span *ngIf="!dialogModel">No value</span>
          </h1>
        </div>
        <ngx-calendar
          [id]="id + '-cal'"
          *ngIf="inputType === 'date' || inputType === 'datetime'"
          (change)="dateSelected($event)"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [ngModel]="dialogModel"
          [timezone]="timezone"
          name="calendar">
        </ngx-calendar>
        <div class="time-row" *ngIf="inputType === 'time' || inputType === 'datetime'">
          <div 
            fxLayout="row" 
            fxLayoutGap="10px"
            fxLayoutWrap="nowrap" 
            fxLayoutAlign="center baseline">
            <div fxFlex>
              <ngx-input
                type="number"
                hint="Hour"
                [id]="id + '-hour'"
                [ngModel]="hour"
                min="0"
                max="12"
                (change)="hourChanged($event)">
              </ngx-input>
            </div>
            <div fxFlex>
              <ngx-input
                type="number"
                hint="Minute"
                [id]="id + '-minute'"
                [ngModel]="minute"
                min="0"
                max="60"
                (change)="minuteChanged($event)">
              </ngx-input>
            </div>
            <div fxFlex>
              <button
                class="ampm"
                type="button"
                [class.selected]="amPmVal === 'AM'"
                (click)="onAmPmChange('AM')">
                AM
              </button>
              <button
                class="ampm"
                type="button"
                [class.selected]="amPmVal === 'PM'"
                (click)="onAmPmChange('PM')">
                PM
              </button>
            </div>
          </div>
        </div>
        <nav role="navigation" class="ngx-dialog-footer">
          <div 
            fxLayout="row" 
            fxLayoutWrap="nowrap">
            <div class="text-left" fxFlex="1 1 50%">
              <button type="button" class="btn btn-link today-btn" (click)="selectCurrent()">
                Current
              </button>
            </div>
            <div class="text-right" fxFlex="1 1 50%">
              <button type="button" class="btn btn-link clear-btn" (click)="clear()">
                Clear
              </button>
              <button type="button" class="btn btn-link apply-btn" (click)="apply()">
                Apply
              </button>
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
        [ngModel]="value | amTimeZone: timezone | amDateFormat: format"
        (change)="inputChanged($event)">
        <ngx-input-hint>
          <div fxLayout="row" fxLayoutGap="10px" fxLayoutWrap="nowrap">
            <div fxFlex *ngIf="hint" class="text-left">
              {{hint}}
            </div>
            <div *ngIf="errorMsg" fxFlex class="text-right input-error">
              {{errorMsg}}
            </div>
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
        class="calendar-dialog-btn">
      </button>
    </div>
  `
})
export class DateTimeComponent implements OnInit, OnDestroy, ControlValueAccessor {
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
  @Input() format: string;
  @Input() inputType: DateTimeType = DateTimeType.date;
  @Input() timezone: string;
  @Input() inputFormats: any[] = [
    'L',
    `LT`,
    'L LT',
    moment.ISO_8601
  ];

  @Output() change = new EventEmitter<any>();

  get value(): Date {
    return this._value;
  }

  set value(val: Date) {

    let date;
    let isSame;

    if (val) {
      date = moment(val);
      const sameDiff = this.inputType === DateTimeType.date ? 'day' : undefined;
      isSame = this._value && date.isSame(this._value, sameDiff as any);
    } else {
      // if we have a val and had no val before, ensure
      // we set the property correctly even if its same
      isSame = val === this._value;
    }

    if (!isSame) {
      this._value = date ? date.toDate() : val;
      this.onChangeCallback(val);
      this.change.emit(val);
    }
  }

  @ViewChild('dialogTpl') calendarTpl: TemplateRef<ElementRef>;
  @ViewChild('input') input: any;

  _value: Date;
  errorMsg: string;
  dialog: any;
  dialogModel: moment.Moment;
  hour: number;
  minute: number;
  amPmVal: string;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    if (!this.format) {
      if (this.inputType === DateTimeType.date) {
        this.format = 'L';
      } else if (this.inputType === DateTimeType.datetime) {
        this.format = 'L LT';
      } else if (this.inputType === DateTimeType.time) {
        this.format = 'LT';
      }
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  writeValue(val: any): void {
    const date = moment(new Date(val));
    const sameDiff = this.inputType === DateTimeType.date ? 'day' : undefined;
    const isSame = date.isSame(this._value, sameDiff as any);

    if (!isSame) {
      this._value = date.toDate();
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
    this.close();
  }

  setDialogDate(date) {
    this.dialogModel = this.createMoment(date);
    this.hour = +this.dialogModel.format('hh');
    this.minute = +this.dialogModel.format('mm');
    this.amPmVal = this.dialogModel.format('A');
  }

  dateSelected(date: any): void {
    this.dialogModel = this.createMoment(date);
    this.hour = +this.dialogModel.format('hh');
    this.minute = +this.dialogModel.format('mm');
    this.amPmVal = this.dialogModel.format('A');
  }

  minuteChanged(newVal: number): void {
    this.dialogModel = this.dialogModel.clone().minute(newVal);
    this.minute = +this.dialogModel.format('mm');
  }

  hourChanged(newVal: number): void {
    this.dialogModel = this.dialogModel.clone().hour(newVal);
    this.hour = +this.dialogModel.format('hh');
  }

  selectCurrent(): void {
    this.setDialogDate(new Date);
  }

  clear(): void {
    this.value = undefined;
    this.close();
  }

  onAmPmChange(newVal: string): void {
    const clone = this.dialogModel.clone();
    if (newVal === 'AM' && this.amPmVal === 'PM') {
      this.dialogModel = clone.subtract(12, 'h');
    } else if (this.amPmVal === 'AM') {
      this.dialogModel = clone.add(12, 'h');
    }
    this.amPmVal = this.dialogModel.format('A');
  }

  getDayDisabled(date: moment.Moment): boolean {
    if (!date) return false;

    const minDate = this.minDate;

    const isBeforeMin = this.minDate && date.isBefore(this.parseDate(this.minDate));
    const isAfterMax = this.maxDate && date.isAfter(this.parseDate(this.maxDate));

    return isBeforeMin || isAfterMax;
  }

  @debounceable(500)
  inputChanged(val: string): void {
    const date = this.parseDate(val);

    if (this.validate(date)) {
      this.value = date.toDate();

      // Update value in inputbox, value can be the same but timzone changes
      const displayValue = this.getDisplayValue();
      if (val !== displayValue) {
        this.input.value = displayValue;
      }
    }
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

  private getDisplayValue() {  // note same as {{ value | amTimeZone: timezone | amDateFormat: format }}
    return this.createMoment(this.value).format(this.format);
  }

  private parseDate(date: string | Date) {
    date = date instanceof Date ? date.toISOString() : date;
    const inputFormats = [this.format, ...this.inputFormats];
    return this.timezone ?
      moment.tz(date, inputFormats, this.timezone) :
      moment(date, inputFormats);
  }

  private createMoment(date: string | Date | moment.Moment): moment.Moment {
    const m = moment(date).clone();
    return this.timezone ?
      m.tz(this.timezone) :
      m;
  }
}
