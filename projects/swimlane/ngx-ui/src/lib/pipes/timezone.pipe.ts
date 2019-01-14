import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

const momentConstructor = moment;

@Pipe({ name: 'amTimeZone' })
export class TimeZonePipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number, timezone: string): moment.Moment {
    return momentConstructor(value).tz(timezone);
  }
}