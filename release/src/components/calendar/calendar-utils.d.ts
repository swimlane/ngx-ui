/**
 * Creates a range for the given start/finish
 * @param  {Number} start
 * @param  {Number} finish
 * @return {Array}  result of range
 */
export declare function range(start: number, finish: number): any[];
/**
 * Returns the month offset correctly
 * @param  {Object} active
 * @return {Object} days
 */
export declare function getMonth(active: any): any[];
/**
 * Gets a array of days split by week
 * @param  {array} days
 * @param  {number} offset
 * @return {array} days by week
 */
export declare function getWeeksForDays(days: any[], startDay: number): any[];
/**
 * Get the days for the month
 * @param  {Object} active
 * @return {array} array of days
 */
export declare function getDaysForMonth(active: any): {
    num: any;
    dayOfWeek: any;
    date: any;
    today: any;
}[];
