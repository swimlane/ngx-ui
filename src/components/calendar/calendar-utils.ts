import * as moment from 'moment';

export interface CalenderDay {
  num: number;
  dayOfWeek: number;
  date: moment.Moment;
  today?: boolean;
  nextMonth?: boolean;
  prevMonth?: boolean;
  classes?: string[]|Set<string>|{[klass: string]: any};
}

export type Month = CalenderDay[][];

/**
 * Creates a range for the given start/finish
 * @param  {Number} start
 * @param  {Number} finish
 * @return {Array}  result of range
 */
export function range(start: number, finish: number): number[] {
  const arr = [];
  let i = start;

  while(i < finish) {
    arr.push(i++);
  }

  return arr;
}

/**
 * Returns the month offset correctly
 * @param  {Object} active
 * @return {Object} days
 */
export function getMonth(active: moment.Moment): Month {
  const days = getDaysForMonth(active);
  const offset = active.startOf('month').isoWeekday();
  return getWeeksForDays(days, offset);
}

/**
 * Gets a array of days split by week
 * @param  {array} days
 * @param  {number} offset
 * @return {array} days by week
 */
export function getWeeksForDays(days: CalenderDay[], startDay: number): Month {
  const weeks: Month = [];
  let offset = 7;

  // fill front row
  if(startDay < 7) {
    offset = 7 - startDay;
  }

  while(days.length) {
    let wk = days.slice(0, offset);
    days.splice(0, offset);

    // fill front row
    if(offset < 7) {
      const firstDay = wk[0].date;
      const fill = range(0, startDay)
        .map((d, i) => {
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
    if(!days.length && wk.length !== 7) {
      const lastDay = wk[wk.length - 1].date;
      const fill = range(wk.length, 7)
        .map((d, i) => {
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

    wk.forEach(day => {
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

/**
 * Get the days for the month
 * @param  {Object} active
 * @return {array} array of days
 */
export function getDaysForMonth(active: moment.Moment): CalenderDay[] {
  return range(1, active.daysInMonth() + 1).map(i => {
    const date = active.date(i).clone();
    const today = date.isSame(new Date(), 'day');

    return {
      num: date.date(),
      dayOfWeek: date.day(),
      date,
      today
    };
  });
}
