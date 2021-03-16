import { Pipe, PipeTransform } from '@angular/core';
import type { Moment, MomentInput } from 'moment';
import * as momentImported from 'moment-timezone';

const moment = momentImported;

@Pipe({
  name: 'timeZone',
})
export class TimeZonePipe implements PipeTransform {
  transform(value: MomentInput, timezone?: string): Moment | string {
    if (!value) return '';

    const result = timezone ? moment(value).tz(timezone) : moment(value);
    return result.isValid() ? result : '' + value;
  }
}
