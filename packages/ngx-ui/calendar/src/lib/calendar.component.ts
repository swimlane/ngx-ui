import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import type { Moment, MomentBuiltinFormat, MomentInput } from 'moment';
import * as momentImported from 'moment-timezone';
import { CalendarView } from './enums';
import type { CalendarDay, CalendarMonth } from './models';
import { getDecadeStartYear, getMonth } from './utils';

const moment = momentImported;

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CALENDAR_VALUE_ACCESSOR]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {
  static ngAcceptInputType_disabled: BooleanInput;

  @Input() minDate!: Date | string;
  @Input() maxDate!: Date | string;
  @Input() daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Input() timezone!: string;
  @Input() inputFormats: Array<string | MomentBuiltinFormat> = ['L', `LT`, 'L LT', moment.ISO_8601];

  @InputBoolean()
  @Input()
  disabled = false;

  @Input()
  set minView(val: EnumKey<typeof CalendarView>) {
    this._minView = CalendarView[val];
    this.validateView();
  }

  private _minView = CalendarView.date;

  @Input()
  set defaultView(val: EnumKey<typeof CalendarView>) {
    this._defaultView = CalendarView[val];
    this.validateView();
  }

  private _defaultView: CalendarView = this._minView;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<Date>();

  @HostBinding('class.ngx-calendar') hostClass = true;
  @HostBinding('tabindex') hostTabIndex = '1';

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

  private _value!: Date;

  get current(): Moment {
    return this._current;
  }

  private _current!: Moment;
  activeDate!: Moment;
  weeks!: CalendarMonth;

  currentView?: CalendarView;
  monthsList = moment.monthsShort();
  startYear!: number;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.activeDate = this.createMoment(this.value);
    this.weeks = getMonth(this.activeDate);
    this.monthsList = moment.monthsShort();
    this._current = this.activeDate;
    this.startYear = getDecadeStartYear(this._current.year());
    this.validateView();
  }

  changeViews() {
    if (this.currentView === CalendarView.date) {
      this.currentView = CalendarView.month;
    } else if (this.currentView === CalendarView.month) {
      this.currentView = CalendarView.year;
    } else {
      this.currentView = this._minView;
    }

    this.weeks = getMonth(this.activeDate);
  }

  validateView() {
    const viewsList = [CalendarView.date, CalendarView.month, CalendarView.year];

    // date time picker precision validation
    if (!viewsList.includes(this._minView)) {
      this.minView = 'date';
    }

    // defaultView cannot be below minView
    if (viewsList.indexOf(this._minView) > viewsList.indexOf(this._defaultView)) {
      this.defaultView = Object.keys(CalendarView).find(
        key => CalendarView[key as keyof typeof CalendarView] === this._minView
      ) as keyof typeof CalendarView;
    }

    this.currentView = this._defaultView;
  }

  /**
   * Checks if `date` matches selected value
   */
  isDayActive(date: Moment): boolean {
    return date.isSame(this.value, 'day');
  }

  /**
   * Checks if `month` matches selected value, in the viewed year
   */
  isMonthActive(month: string): boolean {
    const date = this.createMoment(this.value).month(month);
    return date.isSame(this.value, 'month') && date.isSame(this.activeDate, 'year');
  }

  /**
   * Checks if `month` and year matches current
   */
  isCurrentMonth(month: string): boolean {
    const date = this.activeDate.clone().month(month);
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

  isDisabled(value: string | number | Moment, type: string): boolean {
    if (this.disabled) return true;
    if (!value) return false;

    let date: Moment;

    switch (type) {
      case 'day':
        date = value as Moment;
        break;
      case 'month':
        date = this.activeDate.clone().month(value as string | number);
        break;
      case 'year':
        date = this.activeDate.clone().year(value as number);
        break;
      default:
        return false;
    }

    const isBeforeMin = this.minDate && date.isBefore(this.parseDate(this.minDate), type);
    const isAfterMax = this.maxDate && date.isAfter(this.parseDate(this.maxDate), type);

    return !!isBeforeMin || !!isAfterMax;
  }

  onDayClick(day: CalendarDay) {
    this.activeDate = day.date.clone();
    this.value = this.activeDate.toDate();

    if (day.prevMonth || day.nextMonth) {
      this.weeks = getMonth(this.activeDate);
    }
  }

  onMonthClick(month: string) {
    this.activeDate.month(month);
    this.value = this.activeDate.toDate();

    if (this._minView !== CalendarView.month) {
      this.currentView = CalendarView.date;
      this.weeks = getMonth(this.activeDate);
    }
  }

  onYearClick(year: number) {
    this.activeDate.year(year);
    this.value = this.activeDate.toDate();

    if (this._minView !== CalendarView.year) {
      this.currentView = CalendarView.month;
      this.weeks = getMonth(this.activeDate);
    }
  }

  prevMonth() {
    const date = this.activeDate.clone();
    this.activeDate = date.subtract(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  nextMonth() {
    const date = this.activeDate.clone();
    this.activeDate = date.add(1, 'month');
    this.weeks = getMonth(this.activeDate);
  }

  prevYear() {
    const date = this.activeDate.clone();
    this.activeDate = date.subtract(1, 'year');
  }

  nextYear() {
    const date = this.activeDate.clone();
    this.activeDate = date.add(1, 'year');
  }

  prevTwoDecades() {
    this.startYear = this.startYear - 20;
  }

  nextTwoDecades() {
    this.startYear = this.startYear + 20;
  }

  /**
   *
   * @internal
   */
  registerOnChange(fn: CalendarComponent['onChangeCallback']): void {
    this.onChangeCallback = fn;
  }

  /**
   *
   * @internal
   */
  registerOnTouched(fn: CalendarComponent['onTouchedCallback']): void {
    this.onTouchedCallback = fn;
  }

  /**
   *
   * @internal
   */
  writeValue(val: unknown) {
    const activeDate = this.createMoment(val as MomentInput);

    if (activeDate.isValid() && !activeDate.isSame(this.value, 'day')) {
      this.activeDate = activeDate;
      this.weeks = getMonth(this.activeDate);
      this._value = val as Date;
      this.startYear = getDecadeStartYear(this.activeDate.year());
    }

    this.cdr.markForCheck();
  }

  @HostListener('blur')
  /**
   *
   * @internal
   */
  onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: unknown) => void = () => {
    // placeholder
  };

  private parseDate(date: string | Date): Moment {
    date = date instanceof Date ? date.toISOString() : date;
    return this.timezone ? moment.tz(date, this.inputFormats, this.timezone) : moment(date, this.inputFormats);
  }

  private createMoment(date: MomentInput): Moment {
    const m = moment(date).clone();
    return this.timezone ? m.tz(this.timezone) : m;
  }
}
