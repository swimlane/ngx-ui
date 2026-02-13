/**
 * Calendar utility functions — pure Date-based equivalents of the
 * moment-powered helpers in @swimlane/ngx-ui's calendar component.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CalendarDay {
  /** Day number (1-31). 0 means empty padding cell. */
  num: number;
  /** 0=Sun ... 6=Sat */
  dayOfWeek: number;
  /** The full Date for this cell. */
  date: Date;
  /** Whether this day is "today". */
  today: boolean;
  /** Whether this day belongs to the previous month. */
  prevMonth: boolean;
  /** Whether this day belongs to the next month. */
  nextMonth: boolean;
}

export type CalendarMonth = CalendarDay[][];

// Short month names matching moment.monthsShort()
export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isSameYear(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear();
}

/** Number of days in a given month (1-indexed month). */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Build a CalendarDay for a specific date.
 */
function makeDay(date: Date, activeMonth: number, today: Date): CalendarDay {
  return {
    num: date.getDate(),
    dayOfWeek: date.getDay(),
    date: new Date(date),
    today: isSameDay(date, today),
    prevMonth: date.getMonth() < activeMonth || (date.getMonth() === 11 && activeMonth === 0),
    nextMonth: date.getMonth() > activeMonth || (date.getMonth() === 0 && activeMonth === 11)
  };
}

/**
 * Generate the weeks grid for a given month.
 * Each week is an array of 7 CalendarDay objects.
 * Fills in days from the previous and next months to complete the grid.
 */
export function getMonth(active: Date): CalendarMonth {
  const today = new Date();
  const year = active.getFullYear();
  const month = active.getMonth();
  const totalDays = daysInMonth(year, month);

  // Day-of-week offset for the 1st of the month (0=Sun)
  const firstDow = new Date(year, month, 1).getDay();

  const days: CalendarDay[] = [];

  // Fill previous month days
  if (firstDow > 0) {
    const prevMonthDays = daysInMonth(year, month - 1);
    for (let i = firstDow - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthDays - i);
      days.push(makeDay(d, month, today));
    }
  }

  // Fill current month days
  for (let d = 1; d <= totalDays; d++) {
    days.push(makeDay(new Date(year, month, d), month, today));
  }

  // Fill next month days to complete the last row
  const remainder = days.length % 7;
  if (remainder > 0) {
    const fill = 7 - remainder;
    for (let d = 1; d <= fill; d++) {
      days.push(makeDay(new Date(year, month + 1, d), month, today));
    }
  }

  // Split into weeks of 7
  const weeks: CalendarMonth = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

/**
 * Get the start year for a 20-year block (decade view).
 */
export function getDecadeStartYear(year: number): number {
  return Math.floor(year / 20) * 20;
}

/**
 * Check if date a is the same day as date b.
 */
export { isSameDay, isSameMonth, isSameYear };

/**
 * Check whether a date is before the given minimum.
 */
export function isBeforeDate(
  date: Date,
  min: Date | null | undefined,
  granularity: 'day' | 'month' | 'year' = 'day'
): boolean {
  if (!min) return false;
  switch (granularity) {
    case 'year':
      return date.getFullYear() < min.getFullYear();
    case 'month':
      return (
        date.getFullYear() < min.getFullYear() ||
        (date.getFullYear() === min.getFullYear() && date.getMonth() < min.getMonth())
      );
    default:
      return (
        new Date(date.getFullYear(), date.getMonth(), date.getDate()) <
        new Date(min.getFullYear(), min.getMonth(), min.getDate())
      );
  }
}

/**
 * Check whether a date is after the given maximum.
 */
export function isAfterDate(
  date: Date,
  max: Date | null | undefined,
  granularity: 'day' | 'month' | 'year' = 'day'
): boolean {
  if (!max) return false;
  switch (granularity) {
    case 'year':
      return date.getFullYear() > max.getFullYear();
    case 'month':
      return (
        date.getFullYear() > max.getFullYear() ||
        (date.getFullYear() === max.getFullYear() && date.getMonth() > max.getMonth())
      );
    default:
      return (
        new Date(date.getFullYear(), date.getMonth(), date.getDate()) >
        new Date(max.getFullYear(), max.getMonth(), max.getDate())
      );
  }
}
