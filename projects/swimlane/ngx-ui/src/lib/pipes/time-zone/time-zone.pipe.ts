import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';

@Pipe({
  name: 'amTimeZone',
  standalone: false
})
export class TimeZonePipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number, timezone?: string): moment.Moment | string {
    if (!value) {
      return '';
    }

    const m = timezone ? moment(value).tz(timezone) : moment(value);
    return m.isValid() ? m : '' + value;
  }
}

@Pipe({
  name: 'amTimeZoneFormat',
  standalone: false
})
export class TimeZoneFormatPipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number, timezone?: string, format?: string): moment.Moment | string {
    if (!value) {
      return '';
    }
    let m: moment.Moment;
    if (timezone) {
      m = moment(value).tz(timezone);
    } else {
      m = moment(value);
    }
    if (format) {
      return m.format(format);
    } else {
      return m.isValid() ? m : '' + value;
    }
  }
}
