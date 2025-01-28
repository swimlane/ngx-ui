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
import moment, { Moment, MomentBuiltinFormat } from 'moment-timezone';

import { getMonth } from './utils/get-month/get-month.util';
import { getDecadeStartYear } from './utils/get-decade-start-year/get-decade-start-year.util';
import { CalendarDay } from './calendar-day.interface';
import { CalendarMonth } from './calendar-month.type';
import { CalendarView } from './calendar-view.enum';
import { CalendarSelect } from './calendar-select.enum';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

export interface CalendarDateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CalendarComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() minDate: Date | string;

  @HostBinding('class.ngx-calendar--disabled')
  @Input()
  disabled: boolean;

  @Input() maxDate: Date | string;
  @Input() daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Input() timezone: string;
  @Input() inputFormats: Array<string | MomentBuiltinFormat> = ['L', 'LT', 'L LT', moment.ISO_8601];
  @Input() selectType: string = CalendarSelect.Single;
  @Input() dateLabelFormat: string = 'MMM D YYYY';
  @Input() range: CalendarDateRange = {
    startDate: undefined,
    endDate: undefined
  };

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
  @Output() onRangeSelect = new EventEmitter<CalendarDateRange>();
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

  get current(): Moment {
    return this._current;
  }

  focusDate: Moment;
  weeks: CalendarMonth;
  currentView: CalendarView;
  monthsList = moment.monthsShort();
  startYear: number;

  startHour: string;
  endHour: string;
  startMinute: string;
  endMinute: string;
  startAmPmVal = 'AM';
  endAmPmVal = 'AM';

  readonly CalendarView = CalendarView;
  readonly CalendarSelect = CalendarSelect;

  private _value: Date;
  private _current: Moment;
  private _minView: CalendarView;
  private _defaultView: CalendarView;

  constructor(private readonly cdr: ChangeDetectorRef, private readonly elm: ElementRef) {}

  ngOnInit() {
    this.focusDate = this.createMoment(this.value);
    this.weeks = getMonth(this.focusDate);
    this.monthsList = moment.monthsShort();
    this._current = this.focusDate;
    this.startYear = getDecadeStartYear(this._current.year());
    this.initializeTime();
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
   * Initializes the values for initial time
   */
  initializeTime(): void {
    let startDate: Date | undefined, endDate: Date | undefined;
    if (!this.range.startDate) {
      startDate = new Date(new Date().setHours(0, 0, 0, 0));
    } else {
      startDate = this.range.startDate;
    }
    if (!this.range.endDate) {
      endDate = new Date(new Date().setHours(0, 0, 0, 0));
    } else {
      endDate = this.range.endDate;
    }
    this.startHour = moment(startDate).format('hh');
    this.startMinute = moment(startDate).format('mm');
    this.startAmPmVal = moment(startDate).format('a').toUpperCase();
    this.endHour = moment(endDate).format('hh');
    this.endMinute = moment(endDate).format('mm');
    this.endAmPmVal = moment(endDate).format('a').toUpperCase();
  }

  /**
   * Checks if `date` matches selected value
   */
  isDayActive(date: Moment): boolean {
    return date.isSame(this.value, 'day');
  }

  /**
   * Checks if `date` matches the extreme ends of range
   */
  isDayRangeEnd(date: Moment): boolean {
    if (this.range.endDate) return date.isSame(this.range.endDate, 'day');
  }
  isDayRangeStart(date: Moment): boolean {
    if (this.range.startDate && this.range.endDate) return date.isSame(this.range.startDate, 'day');
  }
  isRangeStartActive(date: Moment): boolean {
    if (this.range.startDate) return date.isSame(this.range.startDate, 'day');
  }

  /**
   * Checks if `date` matches the extreme ends of range
   */
  isDayInRange(date: Moment): boolean {
    if (this.range.startDate && this.range.endDate)
      return date.isBetween(this.range.startDate, this.range.endDate, 'day', '()');
  }

  /**
   * Checks if `date` matches selected value
   */
  isDayFocus(date: Moment): boolean {
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
   * Checks if `month` and year matches current focus
   */
  isFocusMonth(month: string): boolean {
    const date = this.focusDate.clone().month(month);
    return date.isSame(this.focusDate, 'month') && date.isSame(this.focusDate, 'year');
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

  /**
   * Checks if year matches current focus
   */
  isFocusYear(year: number): boolean {
    const date = this.focusDate.clone().year(year);
    return date.isSame(this.focusDate, 'year');
  }

  isDisabled(value: any, type: string): boolean {
    if (this.disabled) return true;
    if (!value) return false;

    let date: Moment;

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

  onDaySelectRange(day: CalendarDay) {
    this.focusDate = day.date.clone();
    if (this.range.startDate === undefined && this.range.endDate === undefined) {
      this.range.startDate = this.focusDate.toDate();
      this.range.startDate.setHours(Number(this.startHour));
      this.range.startDate.setMinutes(Number(this.startMinute));
    } else if (this.range.endDate === undefined) {
      if (
        this.compareCalendarDays(this.focusDate.toDate(), this.range.startDate) ||
        this.focusDate.toDate() > this.range.startDate
      ) {
        this.range.endDate = this.focusDate.toDate();
        this.range.endDate.setHours(Number(this.endHour));
        this.range.endDate.setMinutes(Number(this.endMinute));
      } else {
        this.range.startDate = this.focusDate.toDate();
        this.range.startDate.setHours(Number(this.startHour));
        this.range.startDate.setMinutes(Number(this.startMinute));
      }
    } else {
      this.range.startDate = this.focusDate.toDate();
      this.range.startDate.setHours(Number(this.startHour));
      this.range.startDate.setMinutes(Number(this.startMinute));
      this.range.endDate = undefined;
    }

    this.onRangeSelect.emit({ startDate: this.range.startDate, endDate: this.range.endDate });

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

  hourChanged(newVal: string, type: string) {
    if (type === 'start') {
      if (this.range.startDate) {
        if (this.endAmPmVal === 'PM') {
          this.range.startDate.setHours(12 + Number(newVal));
        } else {
          this.range.startDate.setHours(Number(newVal));
        }
      }
      this.startHour = newVal;
    } else {
      if (this.range.endDate) {
        if (this.endAmPmVal === 'PM') {
          this.range.endDate.setHours(12 + Number(newVal));
        } else {
          this.range.endDate.setHours(Number(newVal));
        }
      }
      this.endHour = newVal;
    }
    this.onRangeSelect.emit({ startDate: this.range.startDate, endDate: this.range.endDate });
  }
  minuteChanged(newVal: string, type: string) {
    if (type === 'start') {
      if (this.range.startDate) {
        this.range.startDate.setMinutes(Number(newVal));
      }
      this.startMinute = newVal;
    } else {
      if (this.range.endDate) {
        this.range.endDate.setMinutes(Number(newVal));
      }
      this.endMinute = newVal;
    }
    this.onRangeSelect.emit({ startDate: this.range.startDate, endDate: this.range.endDate });
  }
  onAmPmChange(newVal, type) {
    if (type === 'start') {
      const hourClone = this.range.startDate.getHours();
      if (hourClone >= 12 && newVal === 'AM') {
        this.range.startDate.setHours(hourClone - 12);
      }
      if (hourClone >= 0 && hourClone < 12 && newVal === 'PM') {
        this.range.startDate.setHours(hourClone + 12);
      }
      this.startAmPmVal = newVal;
    } else {
      const hourClone = this.range.endDate.getHours();
      if (hourClone >= 12 && newVal === 'AM') {
        this.range.endDate.setHours(hourClone - 12);
      }
      if (hourClone >= 0 && hourClone < 12 && newVal === 'PM') {
        this.range.endDate.setHours(hourClone + 12);
      }
      this.endAmPmVal = newVal;
    }
    this.onRangeSelect.emit({ startDate: this.range.startDate, endDate: this.range.endDate });
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
  }

  moveFocus(amount: number, duration: moment.unitOfTime.DurationConstructor) {
    const focusDate = this.focusDate.clone().add(amount, duration);
    this.setFocus(focusDate);
  }

  setFocus(focusDate: Moment) {
    this.focusDate = focusDate;
    this.weeks = getMonth(this.focusDate);
    if (this.focusDate.year() < this.startYear) {
      this.prevTwoDecades();
    } else if (this.focusDate.year() > this.startYear + 20) {
      this.nextTwoDecades();
    }
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

  // Moves keyboard focus to the focused element
  focus() {
    const elm = this.elm.nativeElement.querySelector('button.focus');
    if (elm) {
      elm.focus();
    }
  }

  onDayDown(event: KeyboardEvent) {
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
        case KeyboardKeys.PAGE_UP: {
          // page up - go to prev month
          // alt + page up - go to prev year
          const prev = event.altKey ? 'year' : 'month';
          this.moveFocus(-1, prev);
          stop = true;
          break;
        }
        case KeyboardKeys.PAGE_DOWN: {
          // page down - go to next month
          // alt + page down - go to next year
          const next = event.altKey ? 'year' : 'month';
          this.moveFocus(1, next);
          stop = true;
          break;
        }
        case KeyboardKeys.ENTER: // enter and close if in dialog
          setTimeout(() => {
            // wait for click event to fire
            this.dayKeyEnter.emit();
          }, 200);
          break;
        case KeyboardKeys.HOME: {
          // home - go to first day of week
          // alt-home - go to first day of month
          const startOf = event.altKey ? 'month' : 'week';
          this.setFocus(this.focusDate.clone().startOf(startOf));
          stop = true;
          break;
        }
        case KeyboardKeys.END: {
          const endOf = event.altKey ? 'month' : 'week';
          // end - go to last day of week
          // alt-end - go to last day of month
          this.setFocus(this.focusDate.clone().endOf(endOf));
          stop = true;
          break;
        }
      }
    }

    // TODO: month and year views

    if (stop) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.cdr.detectChanges();
  }

  onMonthDown(event: KeyboardEvent) {
    let stop = false;

    if (this.currentView === CalendarView.Month) {
      switch (event.code) {
        case KeyboardKeys.ARROW_DOWN:
          this.moveFocus(3, 'month');
          stop = true;
          break;
        case KeyboardKeys.ARROW_UP:
          this.moveFocus(-3, 'month');
          stop = true;
          break;
        case KeyboardKeys.ARROW_LEFT:
          this.moveFocus(-1, 'month');
          stop = true;
          break;
        case KeyboardKeys.ARROW_RIGHT:
          this.moveFocus(1, 'month');
          stop = true;
          break;
        case KeyboardKeys.HOME:
          // home - go to first month
          this.setFocus(this.focusDate.clone().startOf('year'));
          stop = true;
          break;
        case KeyboardKeys.END:
          // end - go to last day of year
          this.setFocus(this.focusDate.clone().endOf('year'));
          stop = true;
          break;
        case KeyboardKeys.PAGE_UP:
          // page down - go to prev month
          this.moveFocus(-1, 'year');
          stop = true;
          break;
        case KeyboardKeys.PAGE_DOWN:
          // page down - go to next month
          this.moveFocus(1, 'year');
          stop = true;
          break;
        case KeyboardKeys.SPACE:
          setTimeout(() => {
            // wait for click event to fire
            this.setFocus(this.focusDate.clone());
          }, 200);
          break;
        case KeyboardKeys.ENTER: // enter and close if in dialog
          setTimeout(() => {
            // wait for click event to fire
            this.dayKeyEnter.emit();
          }, 200);
          break;
      }
    }

    if (stop) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.cdr.detectChanges();
  }

  onYearDown(event: KeyboardEvent) {
    let stop = false;

    if (this.currentView === CalendarView.Year) {
      switch (event.code) {
        case KeyboardKeys.ARROW_DOWN:
          this.moveFocus(4, 'year');
          stop = true;
          break;
        case KeyboardKeys.ARROW_UP:
          this.moveFocus(-4, 'year');
          stop = true;
          break;
        case KeyboardKeys.ARROW_LEFT:
          this.moveFocus(-1, 'year');
          stop = true;
          break;
        case KeyboardKeys.ARROW_RIGHT:
          this.moveFocus(1, 'year');
          stop = true;
          break;
        case KeyboardKeys.PAGE_UP:
          // page down - go to prev two decades
          this.moveFocus(-20, 'year');
          stop = true;
          break;
        case KeyboardKeys.PAGE_DOWN:
          // page down - go to next two decades
          this.moveFocus(20, 'year');
          stop = true;
          break;
        case KeyboardKeys.SPACE:
          setTimeout(() => {
            // wait for click event to fire
            this.setFocus(this.focusDate.clone());
          }, 200);
          break;
        case KeyboardKeys.ENTER: // enter and close if in dialog
          setTimeout(() => {
            // wait for click event to fire
            this.dayKeyEnter.emit();
          }, 200);
          break;
      }
    }

    if (stop) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.cdr.detectChanges();
  }

  formatDate(date: Date): string {
    const customMoment = this.createMoment(date);
    return customMoment.format(this.dateLabelFormat);
  }

  compareCalendarDays(date1: Date, date2: Date) {
    // Get the year, month, and day components of each date
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    // Check if the year, month, and day are the same
    return year1 === year2 && month1 === month2 && day1 === day2;
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  private parseDate(date: string | Date): Moment {
    date = date instanceof Date ? date.toISOString() : date;
    return this.timezone ? moment.tz(date, this.inputFormats, this.timezone) : moment(date, this.inputFormats);
  }

  private createMoment(date: string | Date | Moment): Moment {
    const m = moment(date).clone();
    return this.timezone ? m.tz(this.timezone) : m;
  }
}
