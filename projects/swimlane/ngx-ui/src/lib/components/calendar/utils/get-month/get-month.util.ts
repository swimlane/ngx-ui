import * as moment from 'moment';

import { getWeeksForDays } from '../get-weeks-for-days';
import { getDaysForMonth } from '../get-days-for-month';

/**
 * Returns the month offset correctly
 * @param active
 * @return days
 */
export function getMonth(active: moment.Moment) {
  const date = active.clone();
  const days = getDaysForMonth(date);
  const offset = date.startOf('month').isoWeekday();
  return getWeeksForDays(days, offset);
}
