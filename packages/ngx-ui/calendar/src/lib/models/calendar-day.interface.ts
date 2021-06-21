import type { Moment } from 'moment';

export interface CalendarDay {
  num: number;
  dayOfWeek: number;
  date: Moment;
  classes: string[] | Set<string> | Record<string, unknown>;
  today?: boolean;
  nextMonth?: boolean;
  prevMonth?: boolean;
}
