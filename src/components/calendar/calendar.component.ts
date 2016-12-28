import { Component, Input, Output, EventEmitter, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { getMonth } from './calendar-utils';

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

@Component({
  selector: 'ngx-calendar',
  providers: [CALENDAR_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.scss'],
  template: `
    <div class="ngx-calendar-wrap">
      <div 
        class="title-row" 
        fxLayout="row" 
        fxLayoutWrap="nowrap" 
        fxFill
        fxLayoutAlign="center center">
        <div fxFlex="10%">
          <button
            type="button"
            class="prev-month"
            [disabled]="disabled"
            title="Previous Month"
            (click)="prevMonth()">
            <span class="icon-arrow-left"></span>
          </button>
        </div>
        <div fxFlex class="text-center">
          <span class="current-month">
            {{ activeDate | amDateFormat: 'MMMM YYYY' }}
          </span>
        </div>
        <div fxFlex="10%">
          <button
            type="button"
            class="next-month"
            title="Next Month"
            [disabled]="disabled"
            (click)="nextMonth()">
            <span class="icon-arrow-right"></span>
          </button>
        </div>
      </div>
      <div 
        class="day-name-row" 
        fxLayout="row" 
        fxLayoutWrap="nowrap" 
        fxFill>
        <div
          class="day-name text-center"
          fxFlex="35px"
          *ngFor="let d of daysOfWeek">
          {{d}}
        </div>
      </div>
      <div class="day-container">
        <div
          *ngFor="let week of weeks"
          class="day-row"
          fxLayout="row" 
          fxLayoutWrap="nowrap" 
          fxFill>
          <div
            *ngFor="let day of week"
            class="day-cell text-center"
            fxFlex="35px">
            <button
              *ngIf="day.num"
              class="day"
              type="button"
              [title]="day.date | amDateFormat: 'LL'"
              [ngClass]="getDayClass(day)"
              [disabled]="getDayDisabled(day.date)"
              (click)="onDayClick(day.date)">
              {{day.num}}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'ngx-calendar',
    tabindex: '1',
    '(blur)': 'onTouchedCallback()'
  }
})
export class CalendarComponent implements OnInit, ControlValueAccessor {

  @Input() minDate: Date;
  @Input() disabled: boolean;
  @Input() maxDate: Date;
  @Input() daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Output() change: EventEmitter<any> = new EventEmitter();

  get value() {
    return this._value;
  }

  set value(val: any) {
    const isSame = moment(val).isSame(this._value, 'day');
    if (!isSame) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.change.emit(this._value);
    }
  }

  activeDate: any;
  _value: any;
  weeks: any[];

  ngOnInit(): void {
    this.activeDate = moment(this.value);
    this.weeks = getMonth(this.activeDate);
  }

  getDayClass(day): any {
    return {
      'first-day-of-month': day.num === 1,
      'last-day-of-week': day.dayOfWeek === 6,
      today: day.today,
      active: day.date.isSame(this.value, 'day')
    };
  }

  getDayDisabled(date): boolean {
    if(this.disabled) return true;
    if(!date) return false;

    const isBeforeMin = this.minDate && date.isSameOrBefore(this.minDate);
    const isAfterMax = this.maxDate && date.isSameOrAfter(this.maxDate);

    return isBeforeMin || isAfterMax;
  }

  onDayClick(day): void {
    this.value = day.clone().toDate();
  }

  prevMonth(): void {
    let date = this.activeDate.clone();
    this.activeDate = date.subtract(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  nextMonth(): void {
    let date = this.activeDate.clone();
    this.activeDate = date.add(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  writeValue(val: any): void {
    const isSame = moment(val).isSame(this.value, 'day');
    if (!isSame) {
      this._value = val;
      this.activeDate = moment(val);
      this.weeks = getMonth(this.activeDate);
    }
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
