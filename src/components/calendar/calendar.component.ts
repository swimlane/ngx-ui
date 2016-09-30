import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import * as moment from 'moment';
import { getDaysForMonth } from './calendar-utils';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};
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
                (click)="onDayClick($event, day, week)">
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
export class CalendarComponent implements ControlValueAccessor {

  @Input() daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Output() change = new EventEmitter();

  get value() {
    return this._value;
  }

  set value(val: any) {
    // convert to string for compare
    const newVal = val && val.toString ?
      val.toString() : val;

    const oldVal = this._value && this._value.toString ?
      this._value.toString() : this._value;

    if (newVal !== oldVal) {
      // always store as raw
      if(val && val.toDate) val = val.toDate();

      this._value = val;
      this.onChangeCallback(val);
      this.change.emit(val)
    }
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  private weeks: number[];
  private active: any = moment();
  private _value: any;

  ngOnInit() {
    this.weeks = getDaysForMonth(this.active);
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

    const newDate = this.active.clone();
    this.writeValue(newDate);
  }

  prevMonth() {
    this.active.subtract(1, 'month');
    this.weeks = getDaysForMonth(this.active);
  }

  nextMonth() {
    this.active.add(1, 'month');
    this.weeks = getDaysForMonth(this.active);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
