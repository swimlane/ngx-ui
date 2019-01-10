import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

 @Pipe({ name: 'amTimeZone' })
export class TimeZonePipe implements PipeTransform {
  transform(value: string, timezone: string): moment.Moment {
    return moment(value).tz(timezone);
  }
}