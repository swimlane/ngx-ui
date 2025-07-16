import {
  subDays,
  subMinutes,
  addDays,
  addMinutes,
  startOfDay,
  isValid,
  startOfMonth,
  startOfYear,
  startOfWeek,
  startOfQuarter,
  subMonths,
  subYears,
  subWeeks,
  subQuarters,
  addMonths,
  addYears,
  addWeeks,
  addQuarters,
  subHours,
  addHours,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfQuarter,
  endOfYear
} from 'date-fns';

export class DateUtils {
  static parseExpression(expr: string): Date {
    const now = new Date();
    if (!expr) return now;
    const cleanExpr = expr.trim();

    if (cleanExpr === 'now') return now;
    if (cleanExpr === 'now/d') return startOfDay(now);
    if (cleanExpr === 'now/M') return startOfMonth(now);
    if (cleanExpr === 'now/Y') return startOfYear(now);
    if (cleanExpr === 'now/w') return startOfWeek(now, { weekStartsOn: 0 });
    if (cleanExpr === 'now/Q') return startOfQuarter(now);

    const match = cleanExpr.match(/^now([+-])(\d+)([mhdMywQ])(?:\/(\w))?$/);
    if (match) {
      const [, op, val, unit, snap] = match;
      const amount = parseInt(val, 10);
      const isSub = op === '-';

      let result = now;
      switch (unit) {
        case 'm':
          result = isSub ? subMinutes(now, amount) : addMinutes(now, amount);
          break;
        case 'h':
          result = isSub ? subHours(now, amount) : addHours(now, amount);
          break;
        case 'd':
          result = isSub ? subDays(now, amount) : addDays(now, amount);
          break;
        case 'M':
          result = isSub ? subMonths(now, amount) : addMonths(now, amount);
          break;
        case 'y':
        case 'Y':
          result = isSub ? subYears(now, amount) : addYears(now, amount);
          break;
        case 'w':
          result = isSub ? subWeeks(now, amount) : addWeeks(now, amount);
          break;
        case 'Q':
          result = isSub ? subQuarters(now, amount) : addQuarters(now, amount);
          break;
      }

      if (snap) {
        switch (snap) {
          case 'd':
            return startOfDay(result);
          case 'M':
            return startOfMonth(result);
          case 'Y':
            return startOfYear(result);
          case 'w':
            return startOfWeek(result, { weekStartsOn: 0 });
          case 'Q':
            return startOfQuarter(result);
        }
      }

      return result;
    }

    const fallback = new Date(cleanExpr);
    if (!isValid(fallback)) {
      return null; 
    }
    return fallback;
  }

  static getDefaultPresets(_parseFn: (expr: string) => Date): {
    label: string;
    range: () => [Date | null, Date | null];
    expression?: string;
  }[] {
    return [
      {
        label: 'Last 15 min',
        expression: 'now-15m to now',
        range: () => [DateUtils.parseExpression('now-15m'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 30 min',
        expression: 'now-30m to now',
        range: () => [DateUtils.parseExpression('now-30m'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 1 hour',
        expression: 'now-1h to now',
        range: () => [DateUtils.parseExpression('now-1h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 5 hours',
        expression: 'now-5h to now',
        range: () => [DateUtils.parseExpression('now-5h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 10 hours',
        expression: 'now-10h to now',
        range: () => [DateUtils.parseExpression('now-10h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 24 hours',
        expression: 'now-24h to now',
        range: () => [DateUtils.parseExpression('now-24h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Today',
        expression: 'now/d to now/d',
        range: () => [startOfDay(new Date()), endOfDay(new Date())]
      },
      {
        label: 'Today so far',
        expression: 'now/d to now',
        range: () => [DateUtils.parseExpression('now/d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Yesterday',
        expression: 'now-1d/d to now-1d/d',
        range: () => [DateUtils.parseExpression('now-1d/d'), endOfDay(DateUtils.parseExpression('now-1d/d'))]
      },
      {
        label: 'Last 2 days',
        expression: 'now-2d to now',
        range: () => [DateUtils.parseExpression('now-2d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 3 days',
        expression: 'now-3d to now',
        range: () => [DateUtils.parseExpression('now-3d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 7 days',
        expression: 'now-7d to now',
        range: () => [DateUtils.parseExpression('now-7d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'This Week',
        expression: 'now/w to now/w',
        range: () => [startOfWeek(new Date(), { weekStartsOn: 0 }), endOfWeek(new Date(), { weekStartsOn: 0 })]
      },
      {
        label: 'This Week So Far',
        expression: 'now/w to now',
        range: () => [startOfWeek(new Date(), { weekStartsOn: 0 }), new Date()]
      },
      {
        label: 'Last Week',
        expression: 'now-1w/w to now-1w/w',
        range: () => {
          const lastWeek = subWeeks(new Date(), 1);
          return [startOfWeek(lastWeek, { weekStartsOn: 0 }), endOfWeek(lastWeek, { weekStartsOn: 0 })];
        }
      },
      {
        label: 'This month',
        expression: 'now/M to now',
        range: () => [DateUtils.parseExpression('now/M'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last month',
        expression: 'now-1M/M to now-1M/M',
        range: () => [DateUtils.parseExpression('now-1M/M'), endOfMonth(DateUtils.parseExpression('now-1M/M'))]
      },
      {
        label: 'This Quarter',
        expression: 'now/Q to now',
        range: () => [startOfQuarter(new Date()), endOfQuarter(new Date())]
      },
      {
        label: 'Last Quarter',
        expression: 'now-1Q/Q to end of last quarter',
        range: () => {
          const lastQuarterStart = startOfQuarter(subQuarters(new Date(), 1));
          const lastQuarterEnd = endOfQuarter(subQuarters(new Date(), 1));
          return [lastQuarterStart, lastQuarterEnd];
        }
      },
      {
        label: 'This year',
        expression: 'now/Y to now',
        range: () => [DateUtils.parseExpression('now/Y'), endOfYear(new Date())]
      },
      {
        label: 'This Year So Far',
        expression: 'now/Y to now',
        range: () => [startOfYear(new Date()), new Date()]
      },
      { label: 'Custom range', range: () => [null, null] }
    ];
  }
}
