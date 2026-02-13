import { LitElement, html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../icon/icon.component';
import { baseStyles } from '../../styles/base';
import { calendarStyles } from './calendar.styles';
import {
  getMonth,
  getDecadeStartYear,
  isSameDay,
  isSameYear,
  isBeforeDate,
  isAfterDate,
  MONTHS_SHORT,
  DAYS_OF_WEEK
} from './calendar-utils';
import type { CalendarMonth } from './calendar-utils';
import { parseDate, isValidDate } from '../date-time/date-format';

/**
 * Calendar view modes.
 */
enum CalendarView {
  Date = 'date',
  Month = 'month',
  Year = 'year'
}

const CALENDAR_TAG = 'swim-calendar';

/**
 * SwimCalendar — A calendar component matching @swimlane/ngx-ui design system.
 *
 * Provides day, month, and year views for date selection with keyboard navigation.
 *
 * @fires change - Fired when a date is selected.
 * @fires day-key-enter - Fired when Enter is pressed on a day.
 */
export class SwimCalendar extends LitElement {
  static styles = [baseStyles, calendarStyles];

  // ---------------------------------------------------------------------------
  // Public properties
  // ---------------------------------------------------------------------------

  /** The currently selected date value. */
  @property({ attribute: false })
  get value(): Date | null {
    return this._value;
  }
  set value(val: Date | null | undefined) {
    const old = this._value;
    if (val && isValidDate(val)) {
      this._value = new Date(val);
    } else {
      this._value = null;
    }
    this.requestUpdate('value', old);
  }
  private _value: Date | null = null;

  /** Minimum selectable date. */
  @property({ attribute: 'min-date' })
  minDate?: string | Date;

  /** Maximum selectable date. */
  @property({ attribute: 'max-date' })
  maxDate?: string | Date;

  /** Whether the calendar is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** IANA timezone name. */
  @property({ type: String })
  timezone?: string;

  /** Minimum view: 'date', 'month', or 'year'. */
  @property({ type: String, attribute: 'min-view' })
  set minView(val: string) {
    this._minView = val as CalendarView;
    this._validateView();
    this.requestUpdate();
  }
  get minView(): string {
    return this._minView || CalendarView.Date;
  }
  private _minView?: CalendarView;

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  @state() private _currentView: CalendarView = CalendarView.Date;
  @state() private _focusDate: Date = new Date();
  @state() private _weeks: CalendarMonth = [];
  @state() private _startYear = 0;

  private _currentDate = new Date(); // today, for highlighting

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  connectedCallback(): void {
    super.connectedCallback();
    this._init();
  }

  updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('value') && this._value) {
      this._focusDate = new Date(this._value);
      this._weeks = getMonth(this._focusDate);
      this._startYear = getDecadeStartYear(this._focusDate.getFullYear());
    }
  }

  // ---------------------------------------------------------------------------
  // Public methods
  // ---------------------------------------------------------------------------

  /** Focus the active/focused day button. */
  focusDay(): void {
    const btn = this.shadowRoot?.querySelector('button.focus') as HTMLElement;
    btn?.focus();
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  render() {
    switch (this._currentView) {
      case CalendarView.Month:
        return this._renderMonthView();
      case CalendarView.Year:
        return this._renderYearView();
      default:
        return this._renderDateView();
    }
  }

  private _renderDateView() {
    const monthYear = this._formatMonthYear(this._focusDate);

    return html`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Month"
            @click="${this._prevMonth}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">${monthYear}</button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Month"
            @click="${this._nextMonth}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <div class="day-name-row">${DAYS_OF_WEEK.map(d => html`<div class="day-name text-center">${d}</div>`)}</div>
        <table class="day-container" role="grid">
          ${this._weeks.map(
            week => html`
              <tr class="day-row" role="row">
                ${week.map(day => {
                  if (!day.num) {
                    return html`<td class="day-cell text-center" role="gridcell"></td>`;
                  }
                  const isActive = this._value ? isSameDay(day.date, this._value) : false;
                  const isFocus = isSameDay(day.date, this._focusDate);
                  const isDayDisabled = this.disabled || this._isDayDisabled(day.date);
                  const classes = ['day'];
                  if (day.prevMonth) classes.push('prev-month');
                  if (day.nextMonth) classes.push('next-month');
                  if (day.today) classes.push('today');
                  if (isActive) classes.push('active');
                  if (isFocus && !isDayDisabled) classes.push('focus');

                  return html`
                    <td class="day-cell text-center" role="gridcell">
                      <button
                        type="button"
                        class="${classes.join(' ')}"
                        ?disabled="${isDayDisabled}"
                        tabindex="${isFocus && !isDayDisabled ? 0 : -1}"
                        @click="${() => this._onDayClick(day)}"
                        @keydown="${this._onDayKeyDown}"
                      >
                        ${day.num}
                      </button>
                    </td>
                  `;
                })}
              </tr>
            `
          )}
        </table>
      </div>
    `;
  }

  private _renderMonthView() {
    const year = String(this._focusDate.getFullYear());

    return html`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Year"
            @click="${this._prevYear}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">${year}</button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Year"
            @click="${this._nextYear}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <table class="months-container" role="grid">
          <tr class="months-row" role="row">
            ${MONTHS_SHORT.map((month, idx) => {
              const isActive = this._isMonthActive(idx);
              const isCurrent = this._isCurrentMonth(idx);
              const isFocus = this._focusDate.getMonth() === idx && isSameYear(this._focusDate, this._focusDate);
              const isMonthDisabled = this.disabled || this._isMonthDisabled(idx);
              const classes = ['month'];
              if (isActive) classes.push('active');
              if (isCurrent) classes.push('current');
              if (isFocus) classes.push('focus');

              return html`
                <td class="month-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${classes.join(' ')}"
                    ?disabled="${isMonthDisabled}"
                    tabindex="${isFocus && !isMonthDisabled ? 0 : -1}"
                    @click="${() => this._onMonthClick(idx)}"
                    @keydown="${this._onMonthKeyDown}"
                  >
                    ${month}
                  </button>
                </td>
              `;
            })}
          </tr>
        </table>
      </div>
    `;
  }

  private _renderYearView() {
    const years = Array.from({ length: 20 }, (_, i) => this._startYear + i);

    return html`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Two Decades"
            @click="${this._prevTwoDecades}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">
            ${this._startYear} - ${this._startYear + 20}
          </button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Two Decades"
            @click="${this._nextTwoDecades}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <table class="years-container" role="grid">
          <tr class="years-row" role="row">
            ${years.map(year => {
              const isActive = this._isYearActive(year);
              const isCurrent = year === this._currentDate.getFullYear();
              const isFocus = year === this._focusDate.getFullYear();
              const isYearDisabled = this.disabled || this._isYearDisabled(year);
              const classes = ['year'];
              if (isActive) classes.push('active');
              if (isCurrent) classes.push('current');
              if (isFocus) classes.push('focus');

              return html`
                <td class="year-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${classes.join(' ')}"
                    ?disabled="${isYearDisabled}"
                    tabindex="${isFocus && !isYearDisabled ? 0 : -1}"
                    @click="${() => this._onYearClick(year)}"
                    @keydown="${this._onYearKeyDown}"
                  >
                    ${year}
                  </button>
                </td>
              `;
            })}
          </tr>
        </table>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  private _init(): void {
    if (this._value) {
      this._focusDate = new Date(this._value);
    }
    this._weeks = getMonth(this._focusDate);
    this._currentDate = new Date();
    this._startYear = getDecadeStartYear(this._focusDate.getFullYear());
    this._validateView();
  }

  private _validateView(): void {
    const views = [CalendarView.Date, CalendarView.Month, CalendarView.Year];
    const minIdx = views.indexOf(this._minView || CalendarView.Date);
    if (minIdx < 0) {
      this._minView = CalendarView.Date;
    }
    this._currentView = this._minView || CalendarView.Date;
  }

  private _formatMonthYear(date: Date): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  private _resolveMin(): Date | null {
    if (!this.minDate) return null;
    if (this.minDate instanceof Date) return this.minDate;
    return parseDate(this.minDate);
  }

  private _resolveMax(): Date | null {
    if (!this.maxDate) return null;
    if (this.maxDate instanceof Date) return this.maxDate;
    return parseDate(this.maxDate);
  }

  private _isDayDisabled(date: Date): boolean {
    return isBeforeDate(date, this._resolveMin(), 'day') || isAfterDate(date, this._resolveMax(), 'day');
  }

  private _isMonthDisabled(month: number): boolean {
    const date = new Date(this._focusDate.getFullYear(), month, 1);
    return isBeforeDate(date, this._resolveMin(), 'month') || isAfterDate(date, this._resolveMax(), 'month');
  }

  private _isYearDisabled(year: number): boolean {
    const date = new Date(year, 0, 1);
    return isBeforeDate(date, this._resolveMin(), 'year') || isAfterDate(date, this._resolveMax(), 'year');
  }

  private _isMonthActive(month: number): boolean {
    if (!this._value) return false;
    return this._value.getMonth() === month && this._value.getFullYear() === this._focusDate.getFullYear();
  }

  private _isCurrentMonth(month: number): boolean {
    return this._currentDate.getMonth() === month && this._currentDate.getFullYear() === this._focusDate.getFullYear();
  }

  private _isYearActive(year: number): boolean {
    if (!this._value) return false;
    return this._value.getFullYear() === year;
  }

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  private _prevMonth(): void {
    const d = new Date(this._focusDate);
    d.setMonth(d.getMonth() - 1);
    this._focusDate = d;
    this._weeks = getMonth(this._focusDate);
  }

  private _nextMonth(): void {
    const d = new Date(this._focusDate);
    d.setMonth(d.getMonth() + 1);
    this._focusDate = d;
    this._weeks = getMonth(this._focusDate);
  }

  private _prevYear(): void {
    const d = new Date(this._focusDate);
    d.setFullYear(d.getFullYear() - 1);
    this._focusDate = d;
  }

  private _nextYear(): void {
    const d = new Date(this._focusDate);
    d.setFullYear(d.getFullYear() + 1);
    this._focusDate = d;
  }

  private _prevTwoDecades(): void {
    this._startYear -= 20;
  }

  private _nextTwoDecades(): void {
    this._startYear += 20;
  }

  private _changeViews(): void {
    if (this._currentView === CalendarView.Date) {
      this._currentView = CalendarView.Month;
    } else if (this._currentView === CalendarView.Month) {
      this._currentView = CalendarView.Year;
    } else {
      this._currentView = (this._minView || CalendarView.Date) as CalendarView;
    }
    this._weeks = getMonth(this._focusDate);
  }

  // ---------------------------------------------------------------------------
  // Day interaction
  // ---------------------------------------------------------------------------

  private _onDayClick(day: { date: Date; prevMonth: boolean; nextMonth: boolean }): void {
    this._focusDate = new Date(day.date);
    this._value = new Date(day.date);

    if (day.prevMonth || day.nextMonth) {
      this._weeks = getMonth(this._focusDate);
    }

    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('change', { detail: this._value, bubbles: true, composed: true }));
  }

  private _onMonthClick(month: number): void {
    const d = new Date(this._focusDate);
    d.setMonth(month);
    this._focusDate = d;
    this._value = new Date(d);

    if ((this._minView || CalendarView.Date) !== CalendarView.Month) {
      this._currentView = CalendarView.Date;
      this._weeks = getMonth(this._focusDate);
    }

    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('change', { detail: this._value, bubbles: true, composed: true }));
  }

  private _onYearClick(year: number): void {
    const d = new Date(this._focusDate);
    d.setFullYear(year);
    this._focusDate = d;
    this._value = new Date(d);

    if ((this._minView || CalendarView.Date) !== CalendarView.Year) {
      this._currentView = CalendarView.Month;
      this._weeks = getMonth(this._focusDate);
    }

    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('change', { detail: this._value, bubbles: true, composed: true }));
  }

  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------

  private _moveFocus(amount: number, unit: 'day' | 'week' | 'month' | 'year'): void {
    const d = new Date(this._focusDate);
    switch (unit) {
      case 'day':
        d.setDate(d.getDate() + amount);
        break;
      case 'week':
        d.setDate(d.getDate() + amount * 7);
        break;
      case 'month':
        d.setMonth(d.getMonth() + amount);
        break;
      case 'year':
        d.setFullYear(d.getFullYear() + amount);
        break;
    }
    this._focusDate = d;
    this._weeks = getMonth(this._focusDate);
    if (this._focusDate.getFullYear() < this._startYear) {
      this._prevTwoDecades();
    } else if (this._focusDate.getFullYear() > this._startYear + 20) {
      this._nextTwoDecades();
    }
    this.requestUpdate();
    this.updateComplete.then(() => this.focusDay());
  }

  private _onDayKeyDown = (e: KeyboardEvent): void => {
    let stop = false;
    switch (e.code) {
      case 'ArrowDown':
        this._moveFocus(1, 'week');
        stop = true;
        break;
      case 'ArrowUp':
        this._moveFocus(-1, 'week');
        stop = true;
        break;
      case 'ArrowLeft':
        this._moveFocus(-1, 'day');
        stop = true;
        break;
      case 'ArrowRight':
        this._moveFocus(1, 'day');
        stop = true;
        break;
      case 'PageUp':
        this._moveFocus(-1, e.altKey ? 'year' : 'month');
        stop = true;
        break;
      case 'PageDown':
        this._moveFocus(1, e.altKey ? 'year' : 'month');
        stop = true;
        break;
      case 'Home': {
        const d = new Date(this._focusDate);
        if (e.altKey) {
          d.setDate(1);
        } else {
          // Start of week (Sunday)
          d.setDate(d.getDate() - d.getDay());
        }
        this._focusDate = d;
        this._weeks = getMonth(this._focusDate);
        this.requestUpdate();
        this.updateComplete.then(() => this.focusDay());
        stop = true;
        break;
      }
      case 'End': {
        const d = new Date(this._focusDate);
        if (e.altKey) {
          d.setMonth(d.getMonth() + 1, 0); // last day of month
        } else {
          // End of week (Saturday)
          d.setDate(d.getDate() + (6 - d.getDay()));
        }
        this._focusDate = d;
        this._weeks = getMonth(this._focusDate);
        this.requestUpdate();
        this.updateComplete.then(() => this.focusDay());
        stop = true;
        break;
      }
      case 'Enter':
        setTimeout(() => {
          this.dispatchEvent(new CustomEvent('day-key-enter', { bubbles: true, composed: true }));
        }, 200);
        break;
    }

    if (stop) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  private _onMonthKeyDown = (e: KeyboardEvent): void => {
    let stop = false;
    switch (e.code) {
      case 'ArrowDown':
        this._moveFocus(3, 'month');
        stop = true;
        break;
      case 'ArrowUp':
        this._moveFocus(-3, 'month');
        stop = true;
        break;
      case 'ArrowLeft':
        this._moveFocus(-1, 'month');
        stop = true;
        break;
      case 'ArrowRight':
        this._moveFocus(1, 'month');
        stop = true;
        break;
      case 'PageUp':
        this._moveFocus(-1, 'year');
        stop = true;
        break;
      case 'PageDown':
        this._moveFocus(1, 'year');
        stop = true;
        break;
      case 'Enter':
        setTimeout(() => {
          this.dispatchEvent(new CustomEvent('day-key-enter', { bubbles: true, composed: true }));
        }, 200);
        break;
    }
    if (stop) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  private _onYearKeyDown = (e: KeyboardEvent): void => {
    let stop = false;
    switch (e.code) {
      case 'ArrowDown':
        this._moveFocus(4, 'year');
        stop = true;
        break;
      case 'ArrowUp':
        this._moveFocus(-4, 'year');
        stop = true;
        break;
      case 'ArrowLeft':
        this._moveFocus(-1, 'year');
        stop = true;
        break;
      case 'ArrowRight':
        this._moveFocus(1, 'year');
        stop = true;
        break;
      case 'PageUp':
        this._moveFocus(-20, 'year');
        stop = true;
        break;
      case 'PageDown':
        this._moveFocus(20, 'year');
        stop = true;
        break;
      case 'Enter':
        setTimeout(() => {
          this.dispatchEvent(new CustomEvent('day-key-enter', { bubbles: true, composed: true }));
        }, 200);
        break;
    }
    if (stop) {
      e.stopPropagation();
      e.preventDefault();
    }
  };
}

if (!customElements.get(CALENDAR_TAG)) {
  customElements.define(CALENDAR_TAG, SwimCalendar);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-calendar': SwimCalendar;
  }
}
