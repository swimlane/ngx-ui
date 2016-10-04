import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { noop } from '../../utils';
import { getMonth } from './calendar-utils';
import './calendar.scss';

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

@Component({
  selector: 'swui-calendar',
  providers: [CALENDAR_VALUE_ACCESSOR],
  template: `
    <div class="swui-calendar">
      <div class="title-row u-flex">
        <button
          type="button"
          class="prev-month u-sizeFit"
          (click)="prevMonth()">
          <span class="icon-arrow-left"></span>
        </button>
        <span class="current-month u-sizeFill u-textCenter">
          {{ activeDate | amDateFormat: 'MMMM YYYY' }}
        </span>
        <button
          type="button"
          class="next-month u-sizeFit"
          (click)="nextMonth()">
          <span class="icon-arrow-right"></span>
        </button>
      </div>
      <div class="day-name-row u-flex u-flexRow">
        <div
          class="day-name FlexItem"
          *ngFor="let d of daysOfWeek">
          {{d}}
        </div>
      </div>
      <div class="day-container">
        <div
          class="day-row u-flex u-flexRow"
          *ngFor="let week of weeks">
          <div
            class="day-cell FlexItem"
            *ngFor="let day of week">
            <button
              *ngIf="day.num"
              class="day"
              type="button"
              [title]="day.date | amDateFormat: 'LL'"
              [ngClass]="getDayClass(day)"
              [disabled]="getDayDisabled(day)"
              (click)="onDayClick(day.date)">
              {{day.num}}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    tabindex: '0',
    '(blur)': 'onTouchedCallback()'
  }
})
export class CalendarComponent implements OnInit, ControlValueAccessor {

  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  @Output() onSelect = new EventEmitter();

  get value() {
    return this._value;
  }

  set value(val: any) {
    const isSame = moment(val).isSame(this._value, 'day');
    if (!isSame) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.onSelect.emit(this._value);
    }
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  private activeDate: any;
  private _value: any;
  private weeks: any[];

  ngOnInit() {
    this.activeDate = moment(this.value);
    this.weeks = getMonth(this.activeDate);
  }

  getDayClass(day) {
    return {
      'first-day-of-month': day.num === 1,
      'last-day-of-week': day.dayOfWeek === 6,
      'today': day.today,
      'active': day.date.isSame(this.value, 'day')
    };
  }

  getDayDisabled(day) {
    const isBeforeMin = this.minDate && day.date.isBefore(this.minDate);
    const isAfterMax = this.maxDate && day.date.isAfter(this.maxDate);
    return isBeforeMin || isAfterMax;
  }

  onDayClick(day) {
    this.value = day.clone().toDate();
  }

  prevMonth() {
    this.activeDate.subtract(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  nextMonth() {
    this.activeDate.add(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  writeValue(val: any) {
    const isSame = moment(val).isSame(this.value, 'day');
    if (!isSame) {
      this._value = val;
      this.activeDate = moment(val);
      this.weeks = getMonth(this.activeDate);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
