import * as moment from 'moment';

export interface CalenderDay {
  num: number;
  dayOfWeek: number;
  date: moment.Moment;
  today?: boolean;
  nextMonth?: boolean;
  prevMonth?: boolean;
  classes?: string[] | Set<string> | { [klass: string]: any };
}
