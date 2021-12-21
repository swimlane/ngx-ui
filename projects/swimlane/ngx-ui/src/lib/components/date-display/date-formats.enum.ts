import moment from 'moment';

export const DATE_DISPLAY_FORMATS = {
  // for input
  shortDate: 'MMM D, YYYY', // Jan 1, 2000
  shortTime: 'h:mm A', // 9:00 PM
  shortDateTime: 'MMM D, YYYY h:mm A', // Jan 1, 2000 9:00 PM

  // for display
  date: 'MMM D, YYYY', // Jan 1, 2000
  time: 'h:mm A Z', // 9:00 PM -07:00
  dateTime: 'MMM D, YYYY h:mm A Z', // Jan 1, 2000 9:00 PM -07:00

  // Date min-modes
  dateMonth: 'MMM YYYY', // Jan 2000
  dateYear: 'YYYY', // 2000

  // full display
  fullDate: 'ddd, MMM D, YYYY', // Sat, Jan 1, 2000
  fullTime: 'h:mm A Z [(]zz[)]', // 9:00 PM -07:00 (MST)
  fullDateTime: 'ddd, MMM D, YYYY h:mm A Z [(]zz[)]' // Tue, Jan 1, 2000 9:00 PM -07:00 (MST)
};

export const DATE_DISPLAY_INPUT_FORMATS: Array<string | moment.MomentBuiltinFormat> = [
  DATE_DISPLAY_FORMATS.dateTime,
  DATE_DISPLAY_FORMATS.date,
  DATE_DISPLAY_FORMATS.time,
  DATE_DISPLAY_FORMATS.shortDateTime,
  DATE_DISPLAY_FORMATS.shortDate,
  DATE_DISPLAY_FORMATS.shortTime,
  'MM/DD/YYYY',
  moment.HTML5_FMT.DATE, // 'YYYY-MM-DD'
  moment.HTML5_FMT.TIME, // 'HH:mm',
  moment.ISO_8601
];

export enum DATE_DISPLAY_TYPES {
  HUMAN = 'human', // 1
  USER = 'user', // 2
  CUSTOM = 'custom' // 3
}
