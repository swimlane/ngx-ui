import { CalendarMonth } from '../../calendar-month.type';
import { CalendarDay } from '../../calendar-day.interface';

import { getNumberRange } from '../get-number-range/get-number-range.util';

/**
 * Gets a array of days split by week
 * @param days
 * @param offset
 * @return days by week
 */
export function getWeeksForDays(days: CalendarDay[], startDay: number) {
  const weeks: CalendarMonth = [];
  let offset = 7;

  // fill front row
  if (startDay < 7) {
    offset = 7 - startDay;
  }

  while (days.length) {
    let wk = days.slice(0, offset);
    days.splice(0, offset);

    // fill front row
    if (offset < 7) {
      const firstDay = wk[0].date;
      const fill = getNumberRange(0, startDay).map((_, i) => {
        const date = firstDay.clone().subtract(startDay - i, 'd');
        return {
          num: date.date(),
          dayOfWeek: date.day(),
          date,
          prevMonth: true
        };
      });

      wk = [...fill, ...wk];
      offset = 7;
    }

    // fill last row
    if (!days.length && wk.length !== 7) {
      const lastDay = wk[wk.length - 1].date;
      const fill = getNumberRange(wk.length, 7).map((_, i) => {
        const date = lastDay.clone().add(i + 1, 'd');
        return {
          num: date.date(),
          dayOfWeek: date.day(),
          date,
          nextMonth: true
        };
      });

      wk = [...wk, ...fill];
    }

    wk.forEach((day) => {
      day.classes = {
        'first-day-of-month': day.num === 1,
        'last-day-of-week': day.dayOfWeek === 6,
        today: day.today,
        'next-month': day.nextMonth,
        'prev-month': day.prevMonth
      };
    });

    weeks.push(wk);
  }

  return weeks;
}
