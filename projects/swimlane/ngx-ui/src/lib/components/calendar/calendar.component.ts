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

  @HostBinding('class.ngx-calendar--disabled')
  @Input()
  disabled: boolean;

  @Input() maxDate: Date | string;
  @Input() daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Input() timezone: string;
  @Input() inputFormats: Array<string | MomentBuiltinFormat> = ['L', 'LT', 'L LT', moment.ISO_8601];
  @Input() selectType: string = CalendarSelect.Single;

  @Input() rangeStart: Date = undefined;
  @Input() rangeEnd: Date = undefined;

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
  @Output() onRangeSelect = new EventEmitter<{ startDate: Date; endDate: Date }>();
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

  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  startAmPmVal: string;
  endAmPmVal: string;

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
    this.startHour = this.rangeStart
      ? this.rangeStart.getHours() % 12
      : +moment('2001-01-01T00:00:00').format('hh') % 12;
    this.endHour = this.rangeEnd ? this.rangeEnd.getHours() % 12 : +moment('2001-01-01T00:00:00').format('hh') % 12;

    this.startMinute = this.rangeStart ? this.rangeStart.getMinutes() : +moment('2001-01-01T00:00:00').format('mm');
    this.endMinute = this.rangeEnd ? this.rangeEnd.getMinutes() : +moment('2001-01-01T00:00:00').format('mm');
    this.startAmPmVal = this.rangeStart
      ? this.rangeStart.getHours() >= 12
        ? 'PM'
        : 'AM'
      : moment('2001-01-01T00:00:00').format('A');
    this.endAmPmVal = this.rangeEnd
      ? this.rangeEnd.getHours() >= 12
        ? 'PM'
        : 'AM'
      : moment('2001-01-01T00:00:00').format('A');
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
  isDayRangeExtreme(date: Moment): boolean {
    if (this.rangeStart && this.rangeEnd)
      return date.isSame(this.rangeStart, 'day') || date.isSame(this.rangeEnd, 'day');
    if (this.rangeStart) return date.isSame(this.rangeStart, 'day');
    else return false;
  }

  /**
   * Checks if `date` matches the extreme ends of range
   */
  isDayInRange(date: Moment): boolean {
    if (this.rangeStart && this.rangeEnd) return date.isBetween(this.rangeStart, this.rangeEnd, 'day', '()');
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

    if (this.rangeStart === undefined && this.rangeEnd === undefined) {
      this.rangeStart = this.focusDate.toDate();
      this.rangeStart.setHours(this.startHour);
      this.rangeStart.setMinutes(+this.startMinute);
      this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
    } else if (this.rangeEnd === undefined) {
      if (this.focusDate.toDate() > this.rangeStart) {
        this.rangeEnd = this.focusDate.toDate();
        this.rangeEnd.setHours(this.endHour);
        this.rangeEnd.setMinutes(+this.endMinute);
        this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
      } else {
        this.rangeStart = this.focusDate.toDate();
        this.rangeStart.setHours(this.startHour);
        this.rangeStart.setMinutes(+this.startMinute);
        this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
      }
    } else {
      this.rangeStart = this.focusDate.toDate();
      this.rangeStart.setHours(this.startHour);
      this.rangeStart.setMinutes(+this.startMinute);
      this.rangeEnd = undefined;
      this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
    }
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

  hourChanged(newVal: number, type: string) {
    newVal = +newVal % 12;
    if (type === 'start') {
      if (this.rangeStart) {
        if (this.startAmPmVal === 'PM') newVal = 12 + newVal;
        this.rangeStart.setHours(newVal);
        this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
      }
      this.startHour = newVal % 12;
    } else {
      if (this.rangeEnd) {
        if (this.endAmPmVal === 'PM') newVal = 12 + newVal;
        this.rangeEnd.setHours(newVal);
        this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
      }
      this.endHour = newVal % 12;
    }
  }
  minuteChanged(newVal: number, type: string) {
    if (type === 'start') {
      if (this.rangeStart) this.rangeStart.setMinutes(newVal);
      this.startMinute = newVal;
      this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
    } else {
      if (this.rangeEnd) this.rangeEnd.setMinutes(newVal);
      this.endMinute = newVal;
      this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
    }
  }
  onAmPmChange(newVal, type) {
    if (type === 'start') {
      if (this.rangeStart) {
        const hourClone = this.rangeStart.getHours();
        if (newVal === 'AM' && this.startAmPmVal === 'PM') {
          this.rangeStart.setHours(hourClone - 12);
          this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
        } else if (newVal === 'PM' && this.startAmPmVal === 'AM') {
          this.rangeStart.setHours(hourClone + 12);
          this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
        }
      }
      this.startAmPmVal = newVal;
    } else {
      if (this.rangeEnd) {
        const hourClone = this.rangeEnd.getHours();
        if (newVal === 'AM' && this.endAmPmVal === 'PM') {
          this.rangeEnd.setHours(hourClone - 12);
          this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
        } else if (newVal === 'PM' && this.endAmPmVal === 'AM') {
          this.rangeEnd.setHours(hourClone + 12);
          this.onRangeSelect.emit({ startDate: this.rangeStart, endDate: this.rangeEnd });
        }
      }
      this.endAmPmVal = newVal;
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
    const moment = this.createMoment(date);

    return moment.format('MMM D YYYY');
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
