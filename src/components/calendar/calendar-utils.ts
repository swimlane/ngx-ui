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
 * Get the dates for the month in an array per 7 days each
 * @param  {Moment} month current month
 * @return {Array} month array
 */
export function getDaysForMonth(month) {
  const d = month.date();
  const d1 = month.clone().subtract(1, 'month').endOf('month').date();
  const d2 = month.clone().date(1).day();
  const d3 = month.clone().endOf('month').date();

  let days = [
    ...range(d1 - d2 + 1, d1 + 1),
    ...range(1, d3 + 1),
    ...range(1, 42 - d3 - d2 + 1)
  ];

  let weeks = [];
  let i = 0;

  while(days.length) {
    weeks.push(days.slice(i, 7));
    days.splice(i, 7);
  }

  return weeks;
}
