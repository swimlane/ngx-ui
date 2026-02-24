/**
 * Lightweight date formatting and parsing utility.
 * Supports a commonly-used subset of moment-compatible format tokens
 * so ngx-ui format strings work out-of-the-box without moment-timezone.
 */

import { DateTimeType } from './date-time-type.enum';
import { DateDisplayType } from './date-time-display.enum';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Locale format presets expanded to individual tokens. */
const LOCALE_TOKENS: Record<string, string> = {
  L: 'MM/DD/YYYY',
  l: 'M/D/YYYY',
  LL: 'MMMM D, YYYY',
  ll: 'MMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  lll: 'MMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A',
  llll: 'ddd, MMM D, YYYY h:mm A',
  LT: 'h:mm A',
  LTS: 'h:mm:ss A'
};

/**
 * Named format presets mirroring ngx-ui DATE_DISPLAY_FORMATS.
 * Keys are the preset names; values are locale or token-based format strings.
 */
const DISPLAY_FORMATS: Record<string, string> = {
  shortDate: 'l',
  shortTime: 'LT',
  shortDateTime: 'l LT',
  shortDateTimeSeconds: 'l LTS',
  date: 'll',
  time: 'LT',
  dateTime: 'lll',
  dateTimeSeconds: 'll LTS',
  dateMonth: 'MMM YYYY',
  dateYear: 'YYYY',
  fullDate: 'ddd, ll Z [(]zz[)]',
  fullTime: 'LT Z [(]zz[)]',
  fullDateTime: 'llll Z [(]zz[)]',
  fullDateMonth: 'MMM YYYY Z [(]zz[)]',
  fullDateYear: 'YYYY Z [(]zz[)]',
  localeDate: 'L',
  localeDateTime: 'L LT',
  localeTime: 'LT',
  timezoneDate: 'L Z',
  timezoneDateTime: 'L LT Z',
  timezoneDateTimeSeconds: 'L LTS Z',
  timezoneTime: 'LT Z',
  timezoneDateMonth: 'MMM YYYY Z',
  timezoneDateYear: 'YYYY Z',
  locale: 'LLL',
  shortLocale: 'LL',
  fullLocale: 'LLLL'
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function pad(n: number, width = 2): string {
  return String(n).padStart(width, '0');
}

interface DateParts {
  year: number;
  month: number; // 0-indexed
  day: number;
  hour: number;
  minute: number;
  second: number;
  ms: number;
  dow: number; // 0=Sun
}

function getDateParts(date: Date, timezone?: string): DateParts {
  if (!timezone) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      ms: date.getMilliseconds(),
      dow: date.getDay()
    };
  }

  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    const parts = fmt.formatToParts(date);
    const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
    const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    return {
      year: parseInt(get('year'), 10),
      month: parseInt(get('month'), 10) - 1,
      day: parseInt(get('day'), 10),
      hour: parseInt(get('hour'), 10) % 24,
      minute: parseInt(get('minute'), 10),
      second: parseInt(get('second'), 10),
      ms: date.getMilliseconds(),
      dow: dowMap[get('weekday')] ?? 0
    };
  } catch {
    // Fallback to local
    return getDateParts(date);
  }
}

function getTimezoneOffset(date: Date, timezone?: string): string {
  if (!timezone) {
    const offset = -date.getTimezoneOffset();
    return formatOffset(offset);
  }

  try {
    const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzStr = date.toLocaleString('en-US', { timeZone: timezone });
    const diffMs = new Date(tzStr).getTime() - new Date(utcStr).getTime();
    const offset = Math.round(diffMs / 60000);
    return formatOffset(offset);
  } catch {
    return '+00:00';
  }
}

function formatOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  return `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

function getTimezoneAbbr(date: Date, timezone?: string): string {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone || undefined,
      timeZoneName: 'short'
    });
    return fmt.formatToParts(date).find(p => p.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}

/**
 * Expand locale preset tokens (L, LL, LT, etc.) to individual format tokens.
 * Processes longest tokens first to avoid partial matches.
 */
function expandLocaleTokens(format: string): string {
  const order = ['LLLL', 'llll', 'LLL', 'lll', 'LTS', 'LL', 'll', 'LT', 'L', 'l'];
  let result = format;
  for (const token of order) {
    if (LOCALE_TOKENS[token]) {
      result = result.split(token).join(LOCALE_TOKENS[token]);
    }
  }
  return result;
}

/** Token regex – alternations ordered longest-first so the engine picks the right token. */
const TOKEN_RE = /(MMMM|YYYY|dddd|MMM|ddd|SSS|MM|DD|HH|hh|mm|ss|YY|ZZ|zz|M|D|H|h|A|a|Z|z)/g;

function formatToken(token: string, p: DateParts, date: Date, timezone?: string): string {
  switch (token) {
    case 'YYYY':
      return String(p.year);
    case 'YY':
      return String(p.year).slice(-2);
    case 'MMMM':
      return MONTHS_LONG[p.month];
    case 'MMM':
      return MONTHS_SHORT[p.month];
    case 'MM':
      return pad(p.month + 1);
    case 'M':
      return String(p.month + 1);
    case 'DD':
      return pad(p.day);
    case 'D':
      return String(p.day);
    case 'dddd':
      return DAYS_LONG[p.dow];
    case 'ddd':
      return DAYS_SHORT[p.dow];
    case 'HH':
      return pad(p.hour);
    case 'H':
      return String(p.hour);
    case 'hh':
      return pad(p.hour % 12 || 12);
    case 'h':
      return String(p.hour % 12 || 12);
    case 'mm':
      return pad(p.minute);
    case 'ss':
      return pad(p.second);
    case 'SSS':
      return pad(p.ms, 3);
    case 'A':
      return p.hour >= 12 ? 'PM' : 'AM';
    case 'a':
      return p.hour >= 12 ? 'pm' : 'am';
    case 'Z':
      return getTimezoneOffset(date, timezone);
    case 'ZZ':
      return getTimezoneOffset(date, timezone).replace(':', '');
    case 'zz':
    case 'z':
      return getTimezoneAbbr(date, timezone);
    default:
      return token;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Resolve a named format preset (e.g. "shortDate") to its format string,
 * or return the input string as-is if it is not a known preset.
 */
export function resolveFormat(format: string): string {
  return DISPLAY_FORMATS[format] || format;
}

/**
 * Format a `Date` using a moment-compatible format string.
 *
 * Supports:
 * - Locale presets: L, l, LL, ll, LLL, lll, LLLL, llll, LT, LTS
 * - Individual tokens: YYYY, YY, MMMM, MMM, MM, M, DD, D, dddd, ddd,
 *   HH, hh, H, h, mm, ss, SSS, A, a, Z, ZZ, z, zz
 * - Escaped literals inside `[...]`
 */
export function formatDate(date: Date, format: string, timezone?: string): string {
  const tz = normalizeTimezone(timezone);

  // Expand locale presets
  let expanded = expandLocaleTokens(format);

  // Extract escaped sequences [...] without regex to avoid ReDoS on uncontrolled format strings
  const escaped: string[] = [];
  let pos = 0;
  let expandedWithoutEscaped = '';
  while (pos < expanded.length) {
    const open = expanded.indexOf('[', pos);
    if (open === -1) {
      expandedWithoutEscaped += expanded.slice(pos);
      break;
    }
    expandedWithoutEscaped += expanded.slice(pos, open);
    const close = expanded.indexOf(']', open + 1);
    if (close === -1) {
      expandedWithoutEscaped += expanded.slice(open);
      break;
    }
    escaped.push(expanded.slice(open + 1, close));
    expandedWithoutEscaped += `\x00${escaped.length - 1}\x00`;
    pos = close + 1;
  }
  expanded = expandedWithoutEscaped;

  const parts = getDateParts(date, tz);
  const result = expanded.replace(TOKEN_RE, token => formatToken(token, parts, date, tz));

  // Restore escaped sequences without regex to avoid ReDoS
  let out = '';
  let i = 0;
  while (i < result.length) {
    const placeholderStart = result.indexOf('\x00', i);
    if (placeholderStart === -1) {
      out += result.slice(i);
      break;
    }
    out += result.slice(i, placeholderStart);
    let j = placeholderStart + 1;
    while (j < result.length && result[j] >= '0' && result[j] <= '9') j++;
    if (result[j] === '\x00' && j > placeholderStart + 1) {
      const idx = parseInt(result.slice(placeholderStart + 1, j), 10);
      out += escaped[idx] ?? '';
      i = j + 1;
    } else {
      out += result.slice(placeholderStart, j || placeholderStart + 1);
      i = j || placeholderStart + 1;
    }
  }
  return out;
}

/**
 * Parse a date string into a `Date`. Returns `null` for unparseable input.
 *
 * Supported inputs:
 * - ISO 8601 (e.g. "2011-03-11T05:46:24Z")
 * - US date "MM/DD/YYYY" / "M/D/YYYY" with optional time
 * - Named-month dates (e.g. "Jan 1, 2000", "January 1, 2000 8:30 PM")
 * - Month-year "M/YYYY" or "MMM YYYY"
 * - Year-only "YYYY"
 */
export function parseDate(input: string | Date | null | undefined): Date | null {
  if (input instanceof Date) return isValidDate(input) ? input : null;
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Native Date constructor handles ISO, US formats, named months
  const native = new Date(trimmed);
  if (isValidDate(native)) return native;

  // M/YYYY (e.g. "10/2016")
  const myMatch = trimmed.match(/^(\d{1,2})\/(\d{4})$/);
  if (myMatch) {
    const d = new Date(parseInt(myMatch[2], 10), parseInt(myMatch[1], 10) - 1, 1);
    if (isValidDate(d)) return d;
  }

  // YYYY only
  const yMatch = trimmed.match(/^(\d{4})$/);
  if (yMatch) {
    const d = new Date(parseInt(yMatch[1], 10), 0, 1);
    if (isValidDate(d)) return d;
  }

  // MMM YYYY (e.g. "Jan 2016")
  const smyMatch = trimmed.match(/^(\w{3,})\s+(\d{4})$/);
  if (smyMatch) {
    const d = new Date(`${smyMatch[1]} 1, ${smyMatch[2]}`);
    if (isValidDate(d)) return d;
  }

  return null;
}

/** Whether a value is a `Date` with a valid time. */
export function isValidDate(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
}

/**
 * Round (truncate) a `Date` to the start of the given precision unit.
 */
export function roundToPrecision(date: Date, precision?: string): Date {
  if (!precision || !isValidDate(date)) return date;
  const d = new Date(date);
  const modes: Array<[string, () => void]> = [
    ['millisecond', () => {}],
    ['second', () => d.setMilliseconds(0)],
    [
      'minute',
      () => {
        d.setMilliseconds(0);
        d.setSeconds(0);
      }
    ],
    [
      'hour',
      () => {
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
      }
    ],
    [
      'date',
      () => {
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(0);
      }
    ],
    [
      'month',
      () => {
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(0);
        d.setDate(1);
      }
    ],
    [
      'year',
      () => {
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(0);
        d.setDate(1);
        d.setMonth(0);
      }
    ]
  ];

  const idx = modes.findIndex(([m]) => m === precision);
  if (idx >= 0) {
    modes[idx][1]();
  }
  return d;
}

/**
 * Determine the default display format for a given display-mode / input-type / precision
 * combination. Mirrors ngx-ui `defaultInputFormat`.
 */
export function getEffectiveInputFormat(
  displayMode: DateDisplayType,
  inputType: DateTimeType,
  precision?: string
): string {
  switch (displayMode) {
    case DateDisplayType.HUMAN:
    case DateDisplayType.TIMEZONE:
      switch (inputType) {
        case DateTimeType.date:
          if (precision === 'month') return DISPLAY_FORMATS['timezoneDateMonth'];
          if (precision === 'year') return DISPLAY_FORMATS['timezoneDateYear'];
          return DISPLAY_FORMATS['timezoneDate'];
        case DateTimeType.time:
          return DISPLAY_FORMATS['timezoneTime'];
        default:
          return DISPLAY_FORMATS['timezoneDateTime'];
      }
    case DateDisplayType.LOCAL:
      switch (inputType) {
        case DateTimeType.date:
          if (precision === 'month') return DISPLAY_FORMATS['dateMonth'];
          if (precision === 'year') return DISPLAY_FORMATS['dateYear'];
          return DISPLAY_FORMATS['localeDate'];
        case DateTimeType.time:
          return DISPLAY_FORMATS['localeTime'];
        default:
          return DISPLAY_FORMATS['localeDateTime'];
      }
    case DateDisplayType.CUSTOM:
      switch (inputType) {
        case DateTimeType.date:
          if (precision === 'month') return DISPLAY_FORMATS['dateMonth'];
          if (precision === 'year') return DISPLAY_FORMATS['dateYear'];
          return DISPLAY_FORMATS['date'];
        case DateTimeType.time:
          return DISPLAY_FORMATS['time'];
        default:
          return DISPLAY_FORMATS['dateTime'];
      }
    default:
      return DISPLAY_FORMATS['localeDate'];
  }
}

/**
 * Determine the default tooltip / display format for a given combination.
 * Mirrors ngx-ui `defaultDisplayFormat`.
 */
export function getEffectiveDisplayFormat(
  displayMode: DateDisplayType,
  inputType: DateTimeType,
  precision?: string
): string {
  switch (displayMode) {
    case DateDisplayType.HUMAN:
    case DateDisplayType.TIMEZONE:
      switch (inputType) {
        case DateTimeType.date:
          if (precision === 'month') return DISPLAY_FORMATS['fullDateMonth'];
          if (precision === 'year') return DISPLAY_FORMATS['fullDateYear'];
          return DISPLAY_FORMATS['fullDate'];
        case DateTimeType.time:
          return DISPLAY_FORMATS['fullTime'];
        default:
          return DISPLAY_FORMATS['fullDateTime'];
      }
    case DateDisplayType.LOCAL:
      switch (inputType) {
        case DateTimeType.date:
          if (precision === 'month') return DISPLAY_FORMATS['dateMonth'];
          if (precision === 'year') return DISPLAY_FORMATS['dateYear'];
          return DISPLAY_FORMATS['localeDate'];
        case DateTimeType.time:
          return DISPLAY_FORMATS['localeTime'];
        default:
          return DISPLAY_FORMATS['localeDateTime'];
      }
    case DateDisplayType.CUSTOM:
      switch (inputType) {
        case DateTimeType.date:
          if (precision === 'month') return DISPLAY_FORMATS['dateMonth'];
          if (precision === 'year') return DISPLAY_FORMATS['dateYear'];
          return DISPLAY_FORMATS['date'];
        case DateTimeType.time:
          return DISPLAY_FORMATS['time'];
        default:
          return DISPLAY_FORMATS['dateTime'];
      }
    default:
      return DISPLAY_FORMATS['localeDate'];
  }
}

/**
 * Normalize timezone strings: e.g. "utc" → "UTC".
 */
export function normalizeTimezone(tz?: string): string | undefined {
  if (!tz) return undefined;
  if (tz.toLowerCase() === 'utc') return 'UTC';
  return tz;
}

/**
 * Convert a Date to the ISO string format required by native `<input>` elements.
 */
export function toNativeInputValue(date: Date | null | undefined, type: string): string {
  if (!date || !isValidDate(date)) return '';
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());

  switch (type) {
    case 'time':
      return `${h}:${min}:${s}`;
    case 'datetime':
    case 'datetime-local':
      return `${y}-${m}-${d}T${h}:${min}:${s}`;
    case 'month':
      return `${y}-${m}`;
    default:
      return `${y}-${m}-${d}`;
  }
}

/**
 * Check whether a date is outside the min/max range.
 */
export function isOutOfRange(date: Date, minDate?: Date | string | null, maxDate?: Date | string | null): boolean {
  if (!isValidDate(date)) return false;
  const min = minDate ? parseDate(minDate) : null;
  const max = maxDate ? parseDate(maxDate) : null;
  if (min && isValidDate(min) && date < min) return true;
  if (max && isValidDate(max) && date > max) return true;
  return false;
}
