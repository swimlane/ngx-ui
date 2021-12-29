import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment-timezone';

import { getMonth } from './utils/get-month/get-month.util';
import { getDecadeStartYear } from './utils/get-decade-start-year/get-decade-start-year.util';
import { CalendarDay } from './calendar-day.interface';
import { CalendarMonth } from './calendar-month.type';
import { CalendarView } from './calendar-view.enum';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

@Component({
  selector: 'ngx-calendar',
  exportAs: 'ngxCalendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  host: {
    class: 'ngx-calendar',
    tabindex: '1',
    '(blur)': 'onTouchedCallback()'
  },
  providers: [CALENDAR_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() minDate: Date | string;
  @Input() disabled: boolean;
  @Input() maxDate: Date | string;
  @Input() daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Input() timezone: string;
  @Input() inputFormats: Array<string | moment.MomentBuiltinFormat> = ['L', 'LT', 'L LT', moment.ISO_8601];

  @Input('minView')
  get minView() {
    return this._minView ? this._minView : CalendarView.Date;
  }
  set minView(val: CalendarView) {
    this._minView = val;
    this.validateView();
  }

  @Input('defaultView')
  get defaultView() {
    return this._defaultView ? this._defaultView : this.minView;
  }
  set defaultView(val: CalendarView) {
    this._defaultView = val;
    this.validateView();
  }

  @Output() change = new EventEmitter<Date>();
  @Output() dayKeyEnter = new EventEmitter<Date>();

  @HostBinding('attr.tabindex')
  tabindex = -1;

  get value() {
    return this._value;
  }
  set value(val: Date) {
    const date = this.createMoment(val);

    if (date.isValid()) {
      if (!date.isSame(this._value, 'day')) {
        this._value = val;
        this.onChangeCallback(this._value);
      }

      this.change.emit(this._value);
    }
  }

  get current(): moment.Moment {
    return this._current;
  }

  focusDate: moment.Moment;
  weeks: CalendarMonth;
  currentView: CalendarView;
  monthsList = moment.monthsShort();
  startYear: number;

  private _value: Date;
  private _current: moment.Moment;
  private _minView: CalendarView;
  private _defaultView: CalendarView;

  constructor(private readonly cdr: ChangeDetectorRef, private readonly elm: ElementRef) {}

  ngOnInit() {
    this.focusDate = this.createMoment(this.value);
    this.weeks = getMonth(this.focusDate);
    this.monthsList = moment.monthsShort();
    this._current = this.focusDate;
    this.startYear = getDecadeStartYear(this._current.year());
    this.validateView();
  }

  ngAfterViewInit() {
    this.cdr.markForCheck();
  }

  changeViews() {
    if (this.currentView === CalendarView.Date) {
      this.currentView = CalendarView.Month;
    } else if (this.currentView === CalendarView.Month) {
      this.currentView = CalendarView.Year;
    } else {
      this.currentView = this.minView;
    }

    this.weeks = getMonth(this.focusDate);
  }

  validateView() {
    const viewsList = [CalendarView.Date, CalendarView.Month, CalendarView.Year];

    // date time picker precision validation
    if (!viewsList.includes(this.minView)) {
      this.minView = CalendarView.Date;
    }

    // defaultView cannot be below minView
    if (viewsList.indexOf(this.minView) > viewsList.indexOf(this.defaultView)) {
      this.defaultView = this.minView;
    }

    this.currentView = this.defaultView;
  }

  /**
   * Checks if `date` matches selected value
   */
  isDayActive(date: moment.Moment): boolean {
    return date.isSame(this.value, 'day');
  }

  /**
   * Checks if `date` matches selected value
   */
  isDayFocus(date: moment.Moment): boolean {
    if (!this.focusDate) return false;
    return date.isSame(this.focusDate, 'day');
  }

  /**
   * Checks if `month` matches selected value, in the viewed year
   */
  isMonthActive(month: string): boolean {
    const date = this.createMoment(this.value).month(month);
    return date.isSame(this.value, 'month') && date.isSame(this.focusDate, 'year');
  }

  /**
   * Checks if `month` and year matches current
   */
  isCurrentMonth(month: string): boolean {
    const date = this.focusDate.clone().month(month);
    return date.isSame(this._current, 'month') && date.isSame(this._current, 'year');
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
    return date.isSame(this._current, 'year');
  }

  isDisabled(value: any, type: string): boolean {
    if (this.disabled) return true;
    if (!value) return false;

    let date: moment.Moment;

    switch (type) {
      case 'day':
        date = value;
        break;
      case 'month':
        date = this.focusDate.clone().month(value);
        break;
      case 'year':
        date = this.focusDate.clone().year(value);
        break;
      default:
        return false;
    }

    const isBeforeMin = this.minDate && date.isBefore(this.parseDate(this.minDate), type);
    const isAfterMax = this.maxDate && date.isAfter(this.parseDate(this.maxDate), type);

    return isBeforeMin || isAfterMax;
  }

  onDayClick(day: CalendarDay) {
    this.focusDate = day.date.clone();
    this.value = this.focusDate.toDate();

    if (day.prevMonth || day.nextMonth) {
      this.weeks = getMonth(this.focusDate);
    }
  }

  onDayFocus(day: CalendarDay) {
    this.focusDate = day.date.clone();
    this.cdr.detectChanges();
    this.focus();
  }

  onMonthClick(month: string) {
    this.focusDate.month(month);
    this.value = this.focusDate.toDate();

    if (this.minView !== CalendarView.Month) {
      this.currentView = CalendarView.Date;
      this.weeks = getMonth(this.focusDate);
    }
  }

  onYearClick(year: number) {
    this.focusDate.year(year);
    this.value = this.focusDate.toDate();

    if (this.minView !== CalendarView.Year) {
      this.currentView = CalendarView.Month;
      this.weeks = getMonth(this.focusDate);
    }
  }

  prevMonth() {
    const date = this.focusDate.clone();
    this.focusDate = date.subtract(1, 'month');
    this.weeks = getMonth(this.focusDate);
  }

  nextMonth() {
    const date = this.focusDate.clone();
    this.focusDate = date.add(1, 'month');
    this.weeks = getMonth(this.focusDate);
  }

  prevYear() {
    const date = this.focusDate.clone();
    this.focusDate = date.subtract(1, 'year');
  }

  nextYear() {
    const date = this.focusDate.clone();
    this.focusDate = date.add(1, 'year');
    this.value = this.focusDate.toDate();
  }

  moveFocus(amount: number, duration: string) {
    const date = this.focusDate.clone();
    this.focusDate = date.add(amount as any, duration as any);
    this.weeks = getMonth(this.focusDate);
    this.cdr.detectChanges();
    this.focus();
  }

  prevTwoDecades() {
    this.startYear = this.startYear - 20;
  }

  nextTwoDecades() {
    this.startYear = this.startYear + 20;
  }

  writeValue(val: any) {
    const focusDate = this.createMoment(val);

    if (focusDate.isValid() && !focusDate.isSame(this.value, 'day')) {
      this.focusDate = focusDate;
      this.weeks = getMonth(this.focusDate);
      this._value = val;
      this.startYear = getDecadeStartYear(this.focusDate.year());
    }

    this.cdr.markForCheck();
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

  focus() {
    const elm = this.elm.nativeElement.querySelector('button.day.focus');
    if (elm) {
      elm.focus();
    }
  }

  onDayDown(event: KeyboardEvent) {
    // console.log(event.code);

    let stop = false;

    if (this.currentView === CalendarView.Date) {
      switch (event.code) {
        case KeyboardKeys.ARROW_DOWN: /// next week
          this.moveFocus(1, 'week');
          stop = true;
          break;
        case KeyboardKeys.ARROW_UP: // prev week
          this.moveFocus(-1, 'week');
          stop = true;
          break;
        case KeyboardKeys.ARROW_LEFT: // prev day
          this.moveFocus(-1, 'day');
          stop = true;
          break;
        case KeyboardKeys.ARROW_RIGHT: // next day
          this.moveFocus(1, 'day');
          stop = true;
          break;
        case KeyboardKeys.PAGE_UP: // TODO: Sets focus on the same day of the same week
          if (event.altKey) {
            this.moveFocus(-1, 'year'); // alt + page up - go to prev year
          } else {
            this.moveFocus(-1, 'month'); // page up - go to prev month
          }
          stop = true;
          break;
        case KeyboardKeys.PAGE_DOWN: // TODO: Sets focus on the same day of the same week
          if (event.altKey) {
            this.moveFocus(1, 'year'); // alt + page down - go to next year
          } else {
            this.moveFocus(1, 'month'); // page down - go to next month
          }
          stop = true;
          break;
        case KeyboardKeys.ENTER: // enter and close if in dialog
          setTimeout(() => {
            // wait for click event to fire
            this.dayKeyEnter.emit();
          }, 200);
          break;
        case KeyboardKeys.HOME: // home - go to first day of week
          this.focusDate = this.focusDate.clone().startOf('week');
          this.moveFocus(0, 'day');
          stop = true;
          break;
        case KeyboardKeys.END: // end - go to last day of week
          this.focusDate = this.focusDate.clone().endOf('week');
          this.moveFocus(0, 'day');
          stop = true;
          break;

        // TODO?:
        // home - go to first day of month
        // end - go to last day of month
      }
    }

    // TODO: month and year views

    if (stop) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.cdr.detectChanges();
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  private parseDate(date: string | Date): moment.Moment {
    date = date instanceof Date ? date.toISOString() : date;
    return this.timezone ? moment.tz(date, this.inputFormats, this.timezone) : moment(date, this.inputFormats);
  }

  private createMoment(date: string | Date | moment.Moment): moment.Moment {
    const m = moment(date).clone();
    return this.timezone ? m.tz(this.timezone) : m;
  }
}
