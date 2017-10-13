import * as moment from 'moment';
export interface CalenderDay {
    num: number;
    dayOfWeek: number;
    date: moment.Moment;
    today?: boolean;
    nextMonth?: boolean;
    prevMonth?: boolean;
    classes?: string[] | Set<string> | {
        [klass: string]: any;
    };
}
export declare type Month = CalenderDay[][];
/**
 * Creates a range for the given start/finish
 * @param  {Number} start
 * @param  {Number} finish
 * @return {Array}  result of range
 */
export declare function range(start: number, finish: number): number[];
/**
 * Returns the month offset correctly
 * @param  {Object} active
 * @return {Object} days
 */
export declare function getMonth(active: moment.Moment): Month;
/**
 * Gets a array of days split by week
 * @param  {array} days
 * @param  {number} offset
 * @return {array} days by week
 */
export declare function getWeeksForDays(days: CalenderDay[], startDay: number): Month;
/**
 * Get the days for the month
 * @param  {Object} active
 * @return {array} array of days
 */
export declare function getDaysForMonth(active: moment.Moment): CalenderDay[];
