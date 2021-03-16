import type { Moment } from 'moment';

export interface CalendarDay {
  num: number;
  dayOfWeek: number;
  date: Moment;
  today?: boolean;
  nextMonth?: boolean;
  prevMonth?: boolean;
  classes?: string[] | Set<string> | { [klass: string]: any };
}

export type CalendarMonth = CalendarDay[][];
