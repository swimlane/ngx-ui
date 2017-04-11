/**
 * Creates a range for the given start/finish
 * @param  {Number} start
 * @param  {Number} finish
 * @return {Array}  result of range
 */
/**
 * Creates a range for the given start/finish
 * @param  {Number} start
 * @param  {Number} finish
 * @return {Array}  result of range
 */ export function range(start, finish) {
    var arr = [];
    var i = start;
    while (i < finish) {
        arr.push(i++);
    }
    return arr;
}
/**
 * Returns the month offset correctly
 * @param  {Object} active
 * @return {Object} days
 */
export function getMonth(active) {
    var days = getDaysForMonth(active);
    var offset = active.startOf('month').isoWeekday();
    return getWeeksForDays(days, offset);
}
/**
 * Gets a array of days split by week
 * @param  {array} days
 * @param  {number} offset
 * @return {array} days by week
 */
export function getWeeksForDays(days, startDay) {
    var weeks = [];
    var offset = 7;
    // fill front row
    if (startDay < 7) {
        offset = 7 - startDay;
    }
    while (days.length) {
        var wk = days.slice(0, offset);
        days.splice(0, offset);
        // fill front row
        if (offset < 7) {
            var fill = range(0, startDay);
            wk = fill.concat(wk);
            offset = 7;
        }
        // fill last row
        if (!days.length && wk.length !== 7) {
            var fill = range(wk.length, 7);
            wk = wk.concat(fill);
        }
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
    return range(1, active.daysInMonth() + 1).map(function (i) {
        var date = active.date(i).clone();
        var today = date.isSame(new Date(), 'day');
        return {
            num: date.date(),
            dayOfWeek: date.day(),
            date: date,
            today: today
        };
    });
}
//# sourceMappingURL=calendar-utils.js.map