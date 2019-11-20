import * as moment from 'moment';

import { CalendarDay } from '../../calendar-day.interface';
import { getNumberRange } from '../get-number-range';

/**
 * Get the days for the month
 * @param active
 * @return array of days
 */
export function getDaysForMonth(active: moment.Moment): CalendarDay[] {
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
