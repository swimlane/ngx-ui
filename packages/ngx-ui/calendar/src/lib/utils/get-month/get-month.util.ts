import type { Moment } from 'moment';
import type { CalendarDay } from '../../models';
import { getDaysForMonth } from '../get-days-for-month/get-days-for-month.util';
import { getWeeksForDays } from '../get-weeks-for-days/get-weeks-for-days.util';

/**
 * Returns the month offset correctly
 * @param active
 * @return days
 */
export function getMonth(active: Moment): CalendarDay[][] {
  const date = active.clone();
  const days = getDaysForMonth(date);
  const offset = date.startOf('month').isoWeekday();
  return getWeeksForDays(days, offset);
}
