import { describe, it, expect } from 'vitest';
import {
  getMonth,
  getDecadeStartYear,
  isSameDay,
  isSameMonth,
  isSameYear,
  isBeforeDate,
  isAfterDate,
  MONTHS_SHORT,
  DAYS_OF_WEEK
} from '../../../../swim-ui/src/components/calendar/calendar-utils.js';

describe('calendar-utils', () => {
  describe('MONTHS_SHORT and DAYS_OF_WEEK', () => {
    it('MONTHS_SHORT has 12 entries', () => {
      expect(MONTHS_SHORT).toHaveLength(12);
      expect(MONTHS_SHORT[0]).toBe('Jan');
      expect(MONTHS_SHORT[11]).toBe('Dec');
    });

    it('DAYS_OF_WEEK has 7 entries', () => {
      expect(DAYS_OF_WEEK).toHaveLength(7);
      expect(DAYS_OF_WEEK).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
    });
  });

  describe('getMonth', () => {
    it('returns array of weeks, each week has 7 days', () => {
      const jan2024 = new Date(2024, 0, 15);
      const weeks = getMonth(jan2024);
      expect(weeks.length).toBeGreaterThanOrEqual(4);
      expect(weeks.length).toBeLessThanOrEqual(6);
      for (const week of weeks) {
        expect(week).toHaveLength(7);
      }
    });

    it('each day has num, dayOfWeek, date, today, prevMonth, nextMonth', () => {
      const d = new Date(2024, 0, 15);
      const weeks = getMonth(d);
      const firstDay = weeks[0][0];
      expect(firstDay).toHaveProperty('num');
      expect(firstDay).toHaveProperty('dayOfWeek');
      expect(firstDay).toHaveProperty('date');
      expect(firstDay).toHaveProperty('today');
      expect(firstDay).toHaveProperty('prevMonth');
      expect(firstDay).toHaveProperty('nextMonth');
      expect(firstDay.date).toBeInstanceOf(Date);
    });

    it('marks today correctly', () => {
      const today = new Date();
      const weeks = getMonth(today);
      let found = false;
      for (const week of weeks) {
        for (const day of week) {
          if (day.today) {
            expect(isSameDay(day.date, today)).toBe(true);
            found = true;
          }
        }
      }
      expect(found).toBe(true);
    });

    it('marks prevMonth and nextMonth for days outside active month', () => {
      const midMonth = new Date(2024, 0, 15); // January 2024
      const weeks = getMonth(midMonth);
      let hasPrev = false;
      let hasNext = false;
      for (const week of weeks) {
        for (const day of week) {
          if (day.prevMonth) hasPrev = true;
          if (day.nextMonth) hasNext = true;
        }
      }
      expect(hasPrev).toBe(true);
      expect(hasNext).toBe(true);
    });
  });

  describe('getDecadeStartYear', () => {
    it('returns start of 20-year block', () => {
      expect(getDecadeStartYear(2024)).toBe(2020);
      expect(getDecadeStartYear(1999)).toBe(1980);
      expect(getDecadeStartYear(2000)).toBe(2000);
    });
  });

  describe('isSameDay, isSameMonth, isSameYear', () => {
    const d1 = new Date(2024, 0, 15);
    const d2 = new Date(2024, 0, 15);
    const d3 = new Date(2024, 0, 16);
    const d4 = new Date(2024, 1, 15);

    it('isSameDay', () => {
      expect(isSameDay(d1, d2)).toBe(true);
      expect(isSameDay(d1, d3)).toBe(false);
    });

    it('isSameMonth', () => {
      expect(isSameMonth(d1, d3)).toBe(true);
      expect(isSameMonth(d1, d4)).toBe(false);
    });

    it('isSameYear', () => {
      expect(isSameYear(d1, d4)).toBe(true);
    });
  });

  describe('isBeforeDate', () => {
    it('returns false when min is null/undefined', () => {
      expect(isBeforeDate(new Date(), null)).toBe(false);
      expect(isBeforeDate(new Date(), undefined)).toBe(false);
    });

    it('compares by day granularity', () => {
      const min = new Date(2024, 0, 10);
      expect(isBeforeDate(new Date(2024, 0, 9), min, 'day')).toBe(true);
      expect(isBeforeDate(new Date(2024, 0, 10), min, 'day')).toBe(false);
    });
  });

  describe('isAfterDate', () => {
    it('returns false when max is null/undefined', () => {
      expect(isAfterDate(new Date(), null)).toBe(false);
    });

    it('compares by day granularity', () => {
      const max = new Date(2024, 0, 10);
      expect(isAfterDate(new Date(2024, 0, 11), max, 'day')).toBe(true);
      expect(isAfterDate(new Date(2024, 0, 10), max, 'day')).toBe(false);
    });
  });
});
