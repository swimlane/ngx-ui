import type { Moment } from 'moment-timezone';

import { CalendarDay } from '../../calendar-day.interface';
import { getNumberRange } from '../get-number-range/get-number-range.util';

/**
 * Get the days for the month
 *
 * @param active
 * @return array of days
 */
export function getDaysForMonth(active: Moment): CalendarDay[] {
  return getNumberRange(1, active.daysInMonth() + 1).map(i => {
    const date = active.clone().date(i);
    const today = date.isSame(new Date(), 'day');

    return {
      num: date.date(),
      dayOfWeek: date.day(),
      date,
      today
    };
  });
}
