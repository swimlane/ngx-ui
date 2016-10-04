import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { noop } from '../../utils';
import { getDaysForMonth } from './calendar-utils';
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
          {{ active.format('MMMM YYYY') }}
        </span>
        <button
          type="button"
          class="next-month u-sizeFit"
          (click)="nextMonth()">
          <span class="icon-arrow-right"></span>
        </button>
      </div>
      <table>
        <thead>
          <tr class="day-name-row">
            <td *ngFor="let d of daysOfWeek">
              {{d}}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="week-row"
            *ngFor="let week of weeks; let wkNum = index">
            <td *ngFor="let day of week">
              <button
                type="button"
                [ngClass]="getDayClass(day, wkNum)"
                (click)="onDayClick($event, day, wkNum)">
                {{day}}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  host: {
    tabindex: '0',
    '(blur)': 'onTouchedCallback()'
  }
})
export class CalendarComponent implements OnInit, ControlValueAccessor {

  @Input() daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Output() onSelect = new EventEmitter();

  get value() {
    return this._value;
  }

  set value(val: any) {
    if (!this.compareDates(val, this._value)) {
      // always store as raw
      if(val && val.toDate)
        val = val.toDate();

      this._value = val;
      this.onChangeCallback(this._value);
      this.onSelect.emit(this._value);
    }
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  private weeks: number[];
  private active: any;
  private _value: any;

  ngOnInit() {
    this.updateView();
  }

  updateView() {
    this.active = moment(this.value);
    this.weeks = getDaysForMonth(this.active);
  }

  compareDates(newDate, oldDate) {
    const newVal = newDate && newDate.toString ?
      newDate.toString() : newDate;

    const oldVal = oldDate && oldDate.toString ?
      oldDate.toString() : oldDate;

    return newVal === oldVal;
  }

  getDayClass(dayNum: number, weekNum: number) {
    const isPrevMonth = (weekNum === 0 && dayNum > 7);
    const isNextMonth = (weekNum >= 4 && dayNum <= 14);
    const currentDay = this.active.date();
    const isCurrentDay = !isPrevMonth && !isNextMonth && (dayNum === currentDay);

    return {
      'prev-month': isPrevMonth,
      'next-month': isNextMonth,
      'current-day': isCurrentDay
    };
  }

  onDayClick(event, dayNum, weekNum) {
    const prevMonth = (weekNum === 0 && dayNum > 7);
    const nextMonth = (weekNum >= 4 && dayNum <= 14);

    if(prevMonth) this.active.subtract(1, 'month');
    if(nextMonth) this.active.add(1, 'month');
    this.active.date(dayNum);

    // if we were outside current range, update view
    if(prevMonth || nextMonth) {
      this.weeks = getDaysForMonth(this.active);
    }

    const newDate = this.active.clone();
    this.value = newDate;
  }

  prevMonth() {
    this.active.subtract(1, 'month');
    this.weeks = getDaysForMonth(this.active);
  }

  nextMonth() {
    this.active.add(1, 'month');
    this.weeks = getDaysForMonth(this.active);
  }

  writeValue(val: any) {
    if (!this.compareDates(val, this._value)) {
      // always store as raw
      if(val && val.toDate)
        val = val.toDate();

      this._value = val;
      this.updateView();
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
