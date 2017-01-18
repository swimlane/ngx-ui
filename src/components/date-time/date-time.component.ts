import {
  Component, Input, Output, EventEmitter, ViewEncapsulation,
  forwardRef, OnInit, ViewChild, TemplateRef, OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { debounceable } from '../../utils';
import { DialogService } from '../dialog';
import { DateTimeType } from './date-time.type';
import * as template from './date-time.template.html';

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
  templateUrl: './date-time.component.html'
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

  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() format: string;
  @Input() inputType: DateTimeType = DateTimeType.date;

  @Output() change = new EventEmitter();

  get value() { return this._value; }

  set value(val: any) {
    const date = moment(val);
    const sameDiff = this.inputType === DateTimeType.date ? 'day' : undefined;
    const isSame = date.isSame(this._value, sameDiff);

    if (!isSame) {
      this._value = val;
      this.onChangeCallback(val);
      this.change.emit(val);
    }
  }

  @ViewChild('dialogTpl')
  calendarTpl: TemplateRef<any>;

  _value: any;
  errorMsg: string;
  dialog: any;
  dialogModel: any;
  hour: any;
  minute: any;
  amPmVal: any;

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
    if(!this.format) {
      if(this.inputType === DateTimeType.date) {
        this.format = 'MM/DD/Y';
      } else if(this.inputType === DateTimeType.datetime) {
        this.format = 'MM/DD/Y  hh:mm a';
      } else if(this.inputType === DateTimeType.time) {
        this.format = 'hh:mm a';
      }
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  writeValue(val: any): void {
    const date = moment(val);
    const sameDiff = this.inputType === DateTimeType.date ? 'day' : undefined;
    const isSame = date.isSame(this._value, sameDiff);

    if (!isSame) {
      this._value = val;
    }
  }

  open(): void {
    this.dateSelected(this._value);

    this.dialog = this.dialogService.create({
      cssClass: 'ngx-date-time-dialog',
      template: this.calendarTpl,
      closeButton: false
    });
  }

  apply(): void {
    this.value = this.dialogModel.clone();
    this.close();
  }

  dateSelected(date): void {
    this.dialogModel = moment(date).clone();
    this.hour = this.dialogModel.format('hh');
    this.minute = this.dialogModel.format('mm');
    this.amPmVal = this.dialogModel.format('A');
  }

  minuteChanged(newVal): void {
    const diff = newVal - this.minute;
    const clone = this.dialogModel.clone();
    this.dialogModel = clone.add(diff, 'm');
  }

  hourChanged(newVal): void {
    const diff = newVal - this.hour;
    const clone = this.dialogModel.clone();
    this.dialogModel = clone.add(diff, 'h');
  }

  selectCurrent(): void {
    this.dateSelected(new Date());
  }

  clear(): void {
    this.dialogModel = undefined;
  }

  onAmPmChange(newVal): void {
    const clone = this.dialogModel.clone();

    if(newVal === 'AM') {
      clone.add(12, 'h');
    } else {
      clone.subtract(12, 'h');
    }

    this.dialogModel = clone;
  }

  getDayDisabled(date): boolean {
    if(!date) return false;

    const isBeforeMin = this.minDate && date.isSameOrBefore(this.minDate);
    const isAfterMax = this.maxDate && date.isSameOrAfter(this.maxDate);

    return isBeforeMin || isAfterMax;
  }

  @debounceable(500)
  inputChanged(val): void {
    const date = moment(val);
    const isValid = date.isValid();
    const outOfRange = this.getDayDisabled(date);

    if(isValid && !outOfRange) {
      this.value = date.toDate();
    }

    let errorMsg = '';
    if(!isValid) errorMsg = 'Invalid Date';
    if(outOfRange) errorMsg = 'Date out of range';
    this.errorMsg = errorMsg;
  }

  close(): void {
    if(!this.dialog) return;

    // tear down the dialog instance
    this.dialogService.destroy(this.dialog);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  }

}
