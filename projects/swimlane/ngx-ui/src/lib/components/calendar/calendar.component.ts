import { Component, Input, Output, EventEmitter, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment-timezone';
import { getMonth, CalenderDay, Month, getDecadeStartYear } from './calendar-utils';

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

type View = 'year' | 'month' | 'date';

@Component({
  selector: 'ngx-calendar',
  providers: [CALENDAR_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.scss'],
  template: `
    <div class="ngx-calendar-wrap">
      <div fxFlex="100%" class="text-center" [ngSwitch]="currentView">
        <div *ngSwitchCase="'date'">
          <div 
            class="title-row" 
            fxLayout="row" 
            fxLayoutWrap="nowrap" 
            fxLayoutAlign="center center">
            <button
              type="button"
              class="prev-month"
              [disabled]="disabled"
              title="Previous Month"
              (click)="prevMonth()">
              <span class="icon-arrow-left"></span>
            </button>
            <span class="title" (click)="changeViews()">
              {{ activeDate | amTimeZone: timezone | amDateFormat: 'MMMM YYYY' }}
            </span>
            <button
              type="button"
              class="next-month"
              title="Next Month"
              [disabled]="disabled"
              (click)="nextMonth()">
              <span class="icon-arrow-right"></span>
            </button>
          </div>
          <div class="day-name-row">
            <div 
              fxLayout="row" 
              fxLayoutWrap="nowrap" 
              fxFill>
              <div
                class="day-name text-center"
                fxFlex="30px"
                *ngFor="let d of daysOfWeek">
                {{d}}
              </div>
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
                fxFlex="30px">
                <button
                  *ngIf="day.num"
                  class="day"
                  type="button"
                  [title]="day.date | amTimeZone: timezone | amDateFormat: 'LL'"
                  [class.active]="isDayActive(day.date)"
                  [ngClass]="day.classes"
                  [disabled]="isDisabled(day.date, 'day')"
                  (click)="onDayClick(day)">
                  {{day.num}}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div *ngSwitchCase="'month'">
          <div 
            class="title-row" 
            fxLayout="row" 
            fxLayoutWrap="nowrap" 
            fxLayoutAlign="center center">
            <button
              type="button"
              class="prev-month"
              [disabled]="disabled"
              title="Previous Year"
              (click)="prevYear()">
              <span class="icon-arrow-left"></span>
            </button>
            <span class="title" (click)="changeViews()">
              {{ activeDate | amTimeZone: timezone | amDateFormat: 'YYYY' }}
            </span>
            <button
              type="button"
              class="next-month"
              title="Next Year"
              [disabled]="disabled"
              (click)="nextYear()">
              <span class="icon-arrow-right"></span>
            </button>
          </div>
          <div class="months-container">
            <div class="months-row">
              <button 
                class="month" 
                type="button"
                [class.active]="isMonthActive(month)" 
                [class.current]="isCurrentMonth(month)"
                *ngFor="let month of monthsList" 
                (click)="onMonthClick(month)" 
                [disabled]="isDisabled(month, 'month')">
                {{month}}
              </button>
            </div>
          </div>
        </div>

        <div *ngSwitchCase="'year'">
          <div 
            class="title-row" 
            fxLayout="row" 
            fxLayoutWrap="nowrap" 
            fxLayoutAlign="center center">
            <button
              type="button"
              class="prev-month"
              [disabled]="disabled"
              title="Previous Two Decades"
              (click)="prevTwoDecades()">
              <span class="icon-arrow-left"></span>
            </button>
            <span class="title" (click)="changeViews()">
              {{ startYear }} - {{startYear + 20}}
            </span>
            <button
              type="button"
              class="next-month"
              title="Next Two Decades"
              [disabled]="disabled"
              (click)="nextTwoDecades()">
              <span class="icon-arrow-right"></span>
            </button>
          </div>
          <div class="years-container">
            <div class="years-row">
              <button 
                class="year" 
                type="button"
                *ngFor="let dummy of ' '.repeat(20).split(''), let x = index"
                [class.active]="isYearActive(x+startYear)" 
                [class.current]="isCurrentYear(x+startYear)"
                (click)="onYearClick(x+startYear)" 
                [disabled]="isDisabled(x+startYear, 'year')">
                {{x + startYear}}
              </button>
            </div>
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
  @Input() minDate: Date | string;
  @Input() disabled: boolean;
  @Input() maxDate: Date | string;
  @Input() daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Input() timezone: string;
  @Input() inputFormats: any[] = [
    'L',
    `LT`,
    'L LT',
    moment.ISO_8601
  ];

  @Input('minView')
  set minView(val: View) {
    this._minView = val;
    this.validateView();
  }

  get minView(): View {
    // default: 'date'
    return this._minView ? this._minView : 'date';
  }

  @Input('defaultView')
  set defaultView(val: View) {
    this._defaultView = val;
    this.validateView();
  }

  get defaultView(): View {
    return this._defaultView ? this._defaultView : this.minView;
  }

  @Output() change: EventEmitter<any> = new EventEmitter();

  get value(): Date {
    return this._value;
  }

  set value(val: Date) {
    const date = this.createMoment(val);
    if (date.isValid() && !date.isSame(this._value, 'day')) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.change.emit(this._value);
    }
  }

  activeDate: moment.Moment;
  _value: Date;
  weeks: Month;

  currentView: View;
  monthsList: string[] = moment.monthsShort();
  // today's date
  current: moment.Moment;
  startYear: number;
  _minView: View;
  _defaultView: View;
  
  changeViews(): void {
    if (this.currentView === 'date') {
      this.currentView = 'month';
    } else if (this.currentView === 'month') {
      this.currentView = 'year';
    } else if (this.currentView === 'year') {
      this.currentView = this.minView;
    }
    this.weeks = getMonth(this.activeDate);
  }

  validateView(): void {
    const viewsList = ['date', 'month', 'year'];
    // date time picker precision validation
    if (!viewsList.includes(this.minView)) {
      this.minView = 'date';
    }
    // defaultView cannot be below minView
    if (viewsList.indexOf(this.minView) > viewsList.indexOf(this.defaultView)) {
      this.defaultView = this.minView;
    }
    this.currentView = this.defaultView;
  }

  ngOnInit(): void {
    this.activeDate = this.createMoment(this.value);
    this.weeks = getMonth(this.activeDate);
    this.monthsList = moment.monthsShort();
    this.current = this.activeDate;
    this.startYear = getDecadeStartYear(this.current.year());
    this.validateView();
  }

  /**
   * Checks if `date` matches selected value
   */
  isDayActive(date: moment.Moment): boolean {
    return date.isSame(this.value, 'day');
  }

  /**
   * Checks if `month` matches selected value, in the viewed year
   */
  isMonthActive(month: string): boolean {
    const date = this.createMoment(this.value).month(month);
    return date.isSame(this.value, 'month') && date.isSame(this.activeDate, 'year');
  };

  /**
   * Checks if `month` and year matches current
   */
  isCurrentMonth(month: string): boolean {
    const date = this.activeDate.clone().month(month);
    return date.isSame(this.current, 'month') && date.isSame(this.current, 'year');
  }

  /**
   * Checks if `year` matches selected year
   */
  isYearActive(year: number): boolean {
    const date = this.createMoment(this.value).year(year);
    return date.isSame(this.value, 'year');
  }

  /**
   * Checks if year matches current year
   */
  isCurrentYear(year: number): boolean {
    const date = this.createMoment(this.value).year(year);
    return date.isSame(this.current, 'year');
  }

  isDisabled(value: any, type: string): boolean {
    if (this.disabled) return true;
    if (!value) return false;

    let date;
    switch(type) {
      case 'day':
        date = value;
        break;
      case 'month':
        date = this.activeDate.clone().month(value);
        break;
      case 'year':
        date = this.activeDate.clone().year(value);
        break;
      default:
        return false;
    }
    const isBeforeMin = this.minDate && date.isBefore(this.parseDate(this.minDate), type);
    const isAfterMax = this.maxDate && date.isAfter(this.parseDate(this.maxDate), type);
    return isBeforeMin || isAfterMax;
  }

  onDayClick(day: CalenderDay): void {
    console.log(day)
    this.activeDate = day.date.clone();
    this.value = this.activeDate.toDate();
    if (day.prevMonth || day.nextMonth) {
      this.weeks = getMonth(this.activeDate);
    }
  }

  onMonthClick(month: string): void {
    this.activeDate.month(month);
    this.value = this.activeDate.toDate();
    if (this.minView !== 'month') {
      this.currentView = 'date';
      this.weeks = getMonth(this.activeDate);
    }
  }

  onYearClick(year: number): void {
    this.activeDate.year(year);
    this.value = this.activeDate.toDate();
    if (this.minView !== 'year') {
      this.currentView = 'month';
      this.weeks = getMonth(this.activeDate);
    }
  }

  prevMonth(): void {
    const date = this.activeDate.clone();
    this.activeDate = date.subtract(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  nextMonth(): void {
    const date = this.activeDate.clone();
    this.activeDate = date.add(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  prevYear(): void {
    const date = this.activeDate.clone();
    this.activeDate = date.subtract(1, 'year');
  }

  nextYear(): void {
    const date = this.activeDate.clone();
    this.activeDate = date.add(1, 'year');
  }

  prevTwoDecades() {
    this.startYear = this.startYear - 20;
  }

  nextTwoDecades() {
    this.startYear = this.startYear + 20;
  }

  writeValue(val: any): void {
    const activeDate = this.createMoment(val);
    if (activeDate.isValid() && !activeDate.isSame(this.value, 'day')) {
      this.activeDate = activeDate;
      this.weeks = getMonth(this.activeDate);      
      this._value = val;
      this.startYear = getDecadeStartYear(this.activeDate.year());
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  private parseDate(date: string | Date) {
    date = date instanceof Date ? date.toISOString() : date;
    return this.timezone ?
      moment.tz(date, this.inputFormats, this.timezone) :
      moment(date, this.inputFormats);
  }

  private createMoment(date: string | Date | moment.Moment): moment.Moment {
    const m = moment(date).clone();
    return this.timezone ?
      m.tz(this.timezone) :
      m;
  }
}
