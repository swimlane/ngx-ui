import moment from 'moment-timezone';

export const DATE_DISPLAY_FORMATS = {
  // for input
  shortDate: 'l', // 1/1/2020
  shortTime: 'LT', // 9:00 PM
  shortDateTime: 'l LT', // 1/1/2020 9:00 PM
  shortDateTimeSeconds: 'l LTS', // 1/1/2020 9:00 PM

  date: 'll', // Jan 1, 2000
  time: 'LT', // 9:00 PM
  dateTime: 'lll', // Jan 1, 2000 9:00 PM
  dateTimeSeconds: 'll LTS', // Jan 1, 2000 9:00:00 PM

  // Date min-modes
  dateMonth: 'MMM YYYY', // Jan 2000
  dateYear: 'YYYY', // 2000

  // full display
  fullDate: 'ddd, ll Z [(]zz[)]', // Sat, Jan 1, 2000 -07:00 (MST)
  fullTime: 'LT Z [(]zz[)]', // 9:00 PM -07:00 (MST)
  fullDateTime: 'llll Z [(]zz[)]', // Tue, Jan 1, 2000 9:00 PM -07:00 (MST)

  // Date min-modes
  fullDateMonth: 'MMM YYYY Z [(]zz[)]', // Jan 2000 -07:00 (MST)
  fullDateYear: 'YYYY Z [(]zz[)]', // 2000 -07:00 (MST)

  // Local (civil) time
  localeDate: 'L', // 09/04/1986
  localeDateTime: 'L LT', // 09/04/1986 8:30 PM
  localeTime: 'LT', // 8:30 PM

  // Timezone
  timezoneDate: 'L Z', // 09/04/1986 -07:00
  timezoneDateTime: 'L LT Z', // 09/04/1986 8:30 PM -07:00
  timezoneDateTimeSeconds: 'L LTS Z', // 09/04/1986 8:30 PM -07:00
  timezoneTime: 'LT Z', // 8:30 PM -07:00

  // Date min-modes
  timezoneDateMonth: 'MMM YYYY Z', // Jan 2000 -07:00
  timezoneDateYear: 'YYYY Z', // 2000 -07:00

  // Locale (civil) time
  locale: 'LLL',
  shortLocale: 'LL',
  fullLocale: 'LLLL'
};

export const DATE_DISPLAY_INPUT_FORMATS: Array<string | moment.MomentBuiltinFormat> = [
  DATE_DISPLAY_FORMATS.dateTime,
  DATE_DISPLAY_FORMATS.dateTimeSeconds,
  DATE_DISPLAY_FORMATS.date,
  DATE_DISPLAY_FORMATS.time,
  DATE_DISPLAY_FORMATS.shortDateTime,
  DATE_DISPLAY_FORMATS.shortDateTimeSeconds,
  DATE_DISPLAY_FORMATS.shortDate,
  DATE_DISPLAY_FORMATS.shortTime,
  DATE_DISPLAY_FORMATS.timezoneDateTime,
  DATE_DISPLAY_FORMATS.timezoneDateTimeSeconds,
  DATE_DISPLAY_FORMATS.timezoneDate,
  DATE_DISPLAY_FORMATS.timezoneTime,
  DATE_DISPLAY_FORMATS.localeDateTime,
  DATE_DISPLAY_FORMATS.localeDate,
  DATE_DISPLAY_FORMATS.localeTime,
  DATE_DISPLAY_FORMATS.locale,
  DATE_DISPLAY_FORMATS.shortLocale,
  DATE_DISPLAY_FORMATS.fullLocale,

  // Fall back to some US based formats
  'MM/DD',
  'MM/DD/YYYY',
  'M/DD/YYYY',
  'MM/DD/YY',
  'MM/DD/YYYY, h:mm A',
  'MM/DD/YYYY, h:mm:ss A',

  // Match HTML5 formats
  moment.HTML5_FMT.DATETIME_LOCAL, // YYYY-MM-DDTHH:mm <input type="datetime-local" />
  moment.HTML5_FMT.DATETIME_LOCAL_SECONDS, // YYYY-MM-DDTHH:mm:ss <input type="datetime-local" />
  moment.HTML5_FMT.DATETIME_LOCAL_MS, // YYYY-MM-DDTHH:mm:ss.SSS <input type="datetime-local" />
  moment.HTML5_FMT.DATE, // YYYY-MM-DD <input type="date" />
  moment.HTML5_FMT.TIME, // HH:mm <input type="time" />
  moment.HTML5_FMT.TIME_SECONDS, // HH:mm:ss <input type="time" />
  moment.HTML5_FMT.TIME_MS, // HH:mm:ss.SSS <input type="time" />
  moment.HTML5_FMT.MONTH, // YYYY-MM <input type="month" />

  // Finally ISO
  moment.ISO_8601
];

export enum DATE_DISPLAY_TYPES {
  HUMAN = 'human',
  TIMEZONE = 'timezone',
  LOCAL = 'local',
  CUSTOM = 'custom'
}
