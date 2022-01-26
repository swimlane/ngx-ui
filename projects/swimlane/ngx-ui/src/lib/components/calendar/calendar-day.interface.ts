import { Moment } from 'moment-timezone';

export interface CalendarDay {
  num: number;
  dayOfWeek: number;
  date: Moment;
  today?: boolean;
  nextMonth?: boolean;
  prevMonth?: boolean;
  classes?: string[] | Set<string> | { [klass: string]: any };
}
