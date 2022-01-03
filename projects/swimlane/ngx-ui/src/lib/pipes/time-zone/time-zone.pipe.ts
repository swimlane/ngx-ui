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

    const m = timezone ? momentTimezone(value).tz(timezone) : momentTimezone(value);
    return m.isValid() ? m : '' + value;
  }
}
