import { Pipe, PipeTransform } from '@angular/core';
import momentTimezone from 'moment-timezone';

@Pipe({
  name: 'amTimeZone'
})
export class TimeZonePipe implements PipeTransform {
  transform(value: Date | momentTimezone.Moment | string | number, timezone?: string): momentTimezone.Moment | string {
    if (!value) {
      return '';
    }

    timezone ||= momentTimezone.tz.guess();

    const m = momentTimezone(value).tz(timezone);
    return m.isValid() ? m : '' + value;
  }
}
