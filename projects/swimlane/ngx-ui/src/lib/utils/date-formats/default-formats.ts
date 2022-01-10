import moment from 'moment-timezone';

import { DateTimeType } from '../../components/date-time/date-time-type.enum';
import { DATE_DISPLAY_FORMATS, DATE_DISPLAY_TYPES } from '../../enums/date-formats.enum';

/*
 * Default input format
 */
export function defaultInputFormat(
  displayMode: DATE_DISPLAY_TYPES,
  inputType: DateTimeType,
  precision: moment.unitOfTime.StartOf
) {
  switch (displayMode) {
    case DATE_DISPLAY_TYPES.HUMAN:
    case DATE_DISPLAY_TYPES.TIMEZONE:
      switch (inputType) {
        case DateTimeType.date:
          switch (precision) {
            case 'month':
              return DATE_DISPLAY_FORMATS.timezoneDateMonth;
            case 'year':
              return DATE_DISPLAY_FORMATS.timezoneDateYear;
          }
          return DATE_DISPLAY_FORMATS.timezoneDate;
        case DateTimeType.time:
          return DATE_DISPLAY_FORMATS.timezoneTime;
      }
      return DATE_DISPLAY_FORMATS.timezoneDateTime;
    case DATE_DISPLAY_TYPES.LOCAL:
      switch (inputType) {
        case DateTimeType.date:
          switch (precision) {
            case 'month':
              return DATE_DISPLAY_FORMATS.dateMonth;
            case 'year':
              return DATE_DISPLAY_FORMATS.dateYear;
          }
          return DATE_DISPLAY_FORMATS.localeDate;
        case DateTimeType.time:
          return DATE_DISPLAY_FORMATS.localeTime;
      }
      return DATE_DISPLAY_FORMATS.localeDateTime;
    case DATE_DISPLAY_TYPES.CUSTOM:
      switch (inputType) {
        case DateTimeType.date:
          switch (precision) {
            case 'month':
              return DATE_DISPLAY_FORMATS.dateMonth;
            case 'year':
              return DATE_DISPLAY_FORMATS.dateYear;
          }
          return DATE_DISPLAY_FORMATS.date;
        case DateTimeType.time:
          return DATE_DISPLAY_FORMATS.time;
      }
      return DATE_DISPLAY_FORMATS.dateTime;
  }
}

/*
 * Default display format
 */
export function defaultDisplayFormat(
  displayMode: DATE_DISPLAY_TYPES,
  inputType: DateTimeType,
  precision: moment.unitOfTime.StartOf
) {
  switch (displayMode) {
    case DATE_DISPLAY_TYPES.HUMAN:
    case DATE_DISPLAY_TYPES.TIMEZONE:
      switch (inputType) {
        case DateTimeType.date:
          switch (precision) {
            case 'month':
              return DATE_DISPLAY_FORMATS.fullDateMonth;
            case 'year':
              return DATE_DISPLAY_FORMATS.fullDateYear;
          }
          return DATE_DISPLAY_FORMATS.fullDate;
        case DateTimeType.time:
          return DATE_DISPLAY_FORMATS.fullTime;
      }
      return DATE_DISPLAY_FORMATS.fullDateTime;
    case DATE_DISPLAY_TYPES.LOCAL:
      switch (inputType) {
        case DateTimeType.date:
          switch (precision) {
            case 'month':
              return DATE_DISPLAY_FORMATS.dateMonth;
            case 'year':
              return DATE_DISPLAY_FORMATS.dateYear;
          }
          return DATE_DISPLAY_FORMATS.localeDate;
        case DateTimeType.time:
          return DATE_DISPLAY_FORMATS.localeTime;
      }
      return DATE_DISPLAY_FORMATS.localeDateTime;
    case DATE_DISPLAY_TYPES.CUSTOM:
      switch (inputType) {
        case DateTimeType.date:
          switch (precision) {
            case 'month':
              return DATE_DISPLAY_FORMATS.dateMonth;
            case 'year':
              return DATE_DISPLAY_FORMATS.dateYear;
          }
          return DATE_DISPLAY_FORMATS.date;
        case DateTimeType.time:
          return DATE_DISPLAY_FORMATS.time;
      }
      return DATE_DISPLAY_FORMATS.dateTime;
  }
}
