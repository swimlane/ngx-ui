/**
 * Creates a range for the given start/finish
 * @param  {Number} start
 * @param  {Number} finish
 * @return {Array}  result of range
 */
export function range(start: number, finish: number) {
  let arr = [];
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
export function getMonth(active: any) {
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
export function getWeeksForDays(days: any[], startDay: number) {
  let weeks = [];
  let fill = range(0, startDay);
  let first = true;

  while(days.length) {
    const offset = first ? 7 - startDay : 7;
    let wk = days.slice(0, offset);
    days.splice(0, offset);

    if(first) {
      wk = [...fill, ...wk];
    }

    first = false;
    weeks.push(wk);
  }

  return weeks;
}

/**
 * Get the days for the month
 * @param  {Object} active
 * @return {array} array of days
 */
export function getDaysForMonth(active) {
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
