import {
  Component, Input, Output, EventEmitter, ViewEncapsulation,
  forwardRef, OnInit, ViewChild, TemplateRef
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
  template: `
    <div class="ngx-date-time">
      <template #dialogTpl>
        <div class="selected-header">
          <h1>
            <span *ngIf="dialogModel && (inputType === 'datetime' || inputType === 'date')">
              {{dialogModel | amDateFormat: 'ddd, MMM D YYYY'}}
              <small *ngIf="inputType === 'datetime'">
                {{dialogModel | amDateFormat: 'h:mm a'}}
              </small>
            </span>
            <span *ngIf="dialogModel && inputType === 'time'">
              {{dialogModel | amDateFormat: 'h:mm a'}}
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
          [ngModel]="value"
          name="calendar">
        </ngx-calendar>
        <div class="time-row" *ngIf="inputType === 'time' || inputType === 'datetime'">
          <div class="Grid Grid--fit Grid--withGutter Grid--alignMiddle">
            <div class="Grid-cell u-size1of3">
              <ngx-input
                type="number"
                hint="Hour"
                [id]="id + '-hour'"
                [ngModel]="hour"
                [min]="0"
                [max]="12"
                (change)="hourChanged($event)">
              </ngx-input>
            </div>
            <div class="Grid-cell u-size1of3">
              <ngx-input
                type="number"
                hint="Minute"
                [id]="id + '-minute'"
                [ngModel]="minute"
                [min]="0"
                [max]="60"
                (change)="minuteChanged($event)">
              </ngx-input>
            </div>
            <div class="Grid-cell u-size1of3">
              <select
                [id]="id + '-ampm'"
                [value]="amPmVal"
                (change)="onAmPmChange($event)">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
        <nav role="navigation" class="ngx-dialog-footer">
          <div class="Grid Grid--fit">
            <div class="Grid-cell u-textLeft">
              <button type="button" class="btn btn-link today-btn" (click)="selectCurrent()">
                Current
              </button>
            </div>
            <div class="Grid-cell u-textRight">
              <button type="button" class="btn btn-link ok-btn" (click)="apply()">
                Ok
              </button>
              <button type="button" class="btn btn-link cancel-btn" (click)="close()">
                Cancel
              </button>
            </div>
          </div>
        </nav>
      </template>
      <ngx-input
        [id]="id + '-input'"
        [autocorrect]="false"
        [autocomplete]="false"
        [spellcheck]="false"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [autofocus]="autofocus"
        [tabindex]="tabindex"
        [label]="label"
        [ngModel]="value | amDateFormat: format"
        (change)="inputChanged($event)">
        <ngx-input-hint>
          <div class="u-flex u-flexRow">
            <div
              class="FlexItem u-textLeft u-flexExpandRight"
              *ngIf="hint">
              {{hint}}
            </div>
            <div
              class="FlexItem input-error u-textRight u-flexExpandLeft"
              *ngIf="errorMsg">
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
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [require('./date-time.component.scss')]
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

    this.dialog = this.dialogService.create({
      cssClass: 'ngx-date-time-dialog',
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

  onAmPmChange(newVal) {
    let clone = this.dialogModel.clone();

    if(newVal === 'AM') {
      clone.add(12, 'h');
    } else {
      clone.subtract(12, 'h');
    }

    this.dialogModel = clone;
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
    this.dialogService.destroy(this.dialog);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  }

}
