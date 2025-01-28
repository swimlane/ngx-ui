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
