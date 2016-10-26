import {
  Component, Input, Output, EventEmitter,
  forwardRef, OnInit, ViewChild, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { debounceable } from '../../utils';
import { DialogService } from '../dialog';
import { DateTimeType } from './date-time.type';
import * as template from './date-time.template.html';
import './date-time.scss';

let nextId = 0;

const DATE_TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true
};

@Component({
  selector: 'swui-date-time',
  providers: [DATE_TIME_VALUE_ACCESSOR],
  template
})
export class DateTimeComponent implements ControlValueAccessor {

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
  private calendarTpl: TemplateRef<any>;

  private _value: any;
  private errorMsg: string;
  private dialog: any;

  private dialogModel: any;
  private hour: any;
  private minute: any;
  private amPmVal: any;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
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

  ngOnDestroy() {
    this.close();
  }

  writeValue(val: any) {
    const date = moment(val);
    const sameDiff = this.inputType === DateTimeType.date ? 'day' : undefined;
    const isSame = date.isSame(this._value, sameDiff);

    if (!isSame) {
      this._value = val;
    }
  }

  open() {
    this.dateSelected(this._value);

    this.dialog = this.dialogService.open({
      cssClass: 'swui-date-time-dialog',
      template: this.calendarTpl,
      closeButton: false
    });
  }

  apply() {
    this.value = this.dialogModel.clone();
    this.close();
  }

  dateSelected(date) {
    this.dialogModel = moment(date).clone();
    this.hour = this.dialogModel.format('hh');
    this.minute = this.dialogModel.format('mm');
    this.amPmVal = this.dialogModel.format('A');
  }

  minuteChanged(newVal) {
    const diff = newVal - this.minute;
    let clone = this.dialogModel.clone();
    this.dialogModel = clone.add(diff, 'm');
  }

  hourChanged(newVal) {
    const diff = newVal - this.hour;
    let clone = this.dialogModel.clone();
    this.dialogModel = clone.add(diff, 'h');
  }

  selectCurrent() {
    this.dateSelected(new Date());
  }

  clear() {
    this.dialogModel = undefined;
  }

  toggleAmPm(newVal) {
    let clone = this.dialogModel.clone();
  }

  getDayDisabled(date) {
    if(!date) return false;

    const isBeforeMin = this.minDate && date.isSameOrBefore(this.minDate);
    const isAfterMax = this.maxDate && date.isSameOrAfter(this.maxDate);

    return isBeforeMin || isAfterMax;
  }

  @debounceable(500)
  inputChanged(val) {
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

  close() {
    if(!this.dialog) return;

    // tear down the dialog instance
    this.dialogService.destroy(this.dialog.instance.id);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

}
