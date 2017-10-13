/**
 * Creates a range for the given start/finish
 * @param  {Number} start
 * @param  {Number} finish
 * @return {Array}  result of range
 */
export function range(start, finish) {
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
    var _loop_1 = function () {
        var wk = days.slice(0, offset);
        days.splice(0, offset);
        // fill front row
        if (offset < 7) {
            var firstDay_1 = wk[0].date;
            var fill = range(0, startDay)
                .map(function (d, i) {
                var date = firstDay_1.clone().subtract(startDay - i, 'd');
                return {
                    num: date.date(),
                    dayOfWeek: date.day(),
                    date: date,
                    prevMonth: true
                };
            });
            wk = fill.concat(wk);
            offset = 7;
        }
        // fill last row
        if (!days.length && wk.length !== 7) {
            var lastDay_1 = wk[wk.length - 1].date;
            var fill = range(wk.length, 7)
                .map(function (d, i) {
                var date = lastDay_1.clone().add(i + 1, 'd');
                return {
                    num: date.date(),
                    dayOfWeek: date.day(),
                    date: date,
                    nextMonth: true
                };
            });
            wk = wk.concat(fill);
        }
        wk.forEach(function (day) {
            day.classes = {
                'first-day-of-month': day.num === 1,
                'last-day-of-week': day.dayOfWeek === 6,
                today: day.today,
                'next-month': day.nextMonth,
                'prev-month': day.prevMonth
            };
        });
        weeks.push(wk);
    };
    while (days.length) {
        _loop_1();
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