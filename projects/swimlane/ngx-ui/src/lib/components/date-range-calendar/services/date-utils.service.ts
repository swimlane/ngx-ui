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
  static parseExpression(expr: string, context: 'start' | 'end' = 'start'): Date {
    const now = new Date();
    if (!expr) return now;
    const cleanExpr = expr.trim();

    if (cleanExpr === 'now') return now;
    if (cleanExpr === 'now/d') return startOfDay(now);
    if (cleanExpr === 'now/M') return context === 'end' ? endOfMonth(now) : startOfMonth(now);
    if (cleanExpr === 'now/Y') return context === 'end' ? endOfYear(now) : startOfYear(now);
    if (cleanExpr === 'now/w')
      return context === 'end' ? endOfWeek(now, { weekStartsOn: 0 }) : startOfWeek(now, { weekStartsOn: 0 });
    if (cleanExpr === 'now/Q') return context === 'end' ? endOfQuarter(now) : startOfQuarter(now);

    // Last week
    if (cleanExpr === 'now-1w/w') {
      const lastWeek = subWeeks(now, 1);
      return context === 'end' ? endOfWeek(lastWeek, { weekStartsOn: 0 }) : startOfWeek(lastWeek, { weekStartsOn: 0 });
    }

    // Last quarter
    if (cleanExpr === 'now-1Q/Q') {
      const lastQuarter = subQuarters(now, 1);
      return context === 'end' ? endOfQuarter(lastQuarter) : startOfQuarter(lastQuarter);
    }

    // Last month
    if (cleanExpr === 'now-1M/M') {
      const lastMonth = subMonths(now, 1);
      return context === 'end' ? endOfMonth(lastMonth) : startOfMonth(lastMonth);
    }

    if (cleanExpr === 'now+1w/w') {
      const nextWeek = addWeeks(now, 1);
      return context === 'end' ? endOfWeek(nextWeek, { weekStartsOn: 0 }) : startOfWeek(nextWeek, { weekStartsOn: 0 });
    }

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
    expression?: { start: string; end: string };
  }[] {
    return [
      {
        label: 'Last 15 min',
        expression: { start: 'now-15m', end: 'now' },
        range: () => [DateUtils.parseExpression('now-15m'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 30 min',
        expression: { start: 'now-30m', end: 'now' },
        range: () => [DateUtils.parseExpression('now-30m'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 1 hour',
        expression: { start: 'now-1h', end: 'now' },
        range: () => [DateUtils.parseExpression('now-1h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 5 hours',
        expression: { start: 'now-5h', end: 'now' },
        range: () => [DateUtils.parseExpression('now-5h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 10 hours',
        expression: { start: 'now-10h', end: 'now' },
        range: () => [DateUtils.parseExpression('now-10h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 24 hours',
        expression: { start: 'now-24h', end: 'now' },
        range: () => [DateUtils.parseExpression('now-24h'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Today',
        expression: { start: 'now/d', end: 'now/d' },
        range: () => [startOfDay(new Date()), endOfDay(new Date())]
      },
      {
        label: 'Today so far',
        expression: { start: 'now/d', end: 'now' },
        range: () => [DateUtils.parseExpression('now/d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Yesterday',
        expression: { start: 'now-1d/d', end: 'now-1d/d' },
        range: () => [DateUtils.parseExpression('now-1d/d'), endOfDay(DateUtils.parseExpression('now-1d/d'))]
      },
      {
        label: 'Last 2 days',
        expression: { start: 'now-2d', end: 'now' },
        range: () => [DateUtils.parseExpression('now-2d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 3 days',
        expression: { start: 'now-3d', end: 'now' },
        range: () => [DateUtils.parseExpression('now-3d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'Last 7 days',
        expression: { start: 'now-7d', end: 'now' },
        range: () => [DateUtils.parseExpression('now-7d'), DateUtils.parseExpression('now')]
      },
      {
        label: 'This week',
        expression: { start: 'now/w', end: 'now/w' },
        range: () => [startOfWeek(new Date(), { weekStartsOn: 0 }), endOfWeek(new Date(), { weekStartsOn: 0 })]
      },
      {
        label: 'This week so far',
        expression: { start: 'now/w', end: 'now' },
        range: () => [startOfWeek(new Date(), { weekStartsOn: 0 }), new Date()]
      },
      {
        label: 'Last week',
        expression: { start: 'now-1w/w', end: 'now-1w/w' },
        range: () => {
          const lastWeek = subWeeks(new Date(), 1);
          return [startOfWeek(lastWeek, { weekStartsOn: 0 }), endOfWeek(lastWeek, { weekStartsOn: 0 })];
        }
      },
      {
        label: 'This month',
        expression: { start: 'now/M', end: 'now/M' },
        range: () => [DateUtils.parseExpression('now/M'), endOfMonth(new Date())]
      },
      {
        label: 'This month so far',
        expression: { start: 'now/M', end: 'now' },
        range: () => [DateUtils.parseExpression('now/M'), new Date()]
      },
      {
        label: 'Last month',
        expression: { start: 'now-1M/M', end: 'now-1M/M' },
        range: () => [DateUtils.parseExpression('now-1M/M'), endOfMonth(DateUtils.parseExpression('now-1M/M'))]
      },
      {
        label: 'This quarter',
        expression: { start: 'now/Q', end: 'now/Q' },
        range: () => [startOfQuarter(new Date()), endOfQuarter(new Date())]
      },
      {
        label: 'This quarter so far',
        expression: { start: 'now/Q', end: 'now' },
        range: () => [startOfQuarter(new Date()), new Date()]
      },
      {
        label: 'Last quarter',
        expression: { start: 'now-1Q/Q', end: 'now-1Q/Q' },
        range: () => {
          const lastQuarterStart = startOfQuarter(subQuarters(new Date(), 1));
          const lastQuarterEnd = endOfQuarter(subQuarters(new Date(), 1));
          return [lastQuarterStart, lastQuarterEnd];
        }
      },
      {
        label: 'This year',
        expression: { start: 'now/Y', end: 'now/Y' },
        range: () => [DateUtils.parseExpression('now/Y'), endOfYear(new Date())]
      },
      {
        label: 'This year so far',
        expression: { start: 'now/Y', end: 'now' },
        range: () => [startOfYear(new Date()), new Date()]
      },
      {
        label: 'Next 15 min',
        expression: { start: 'now', end: 'now+15m' },
        range: () => [DateUtils.parseExpression('now'), DateUtils.parseExpression('now+15m')]
      },
      {
        label: 'Next 30 min',
        expression: { start: 'now', end: 'now+30m' },
        range: () => [DateUtils.parseExpression('now'), DateUtils.parseExpression('now+30m')]
      },
      {
        label: 'Next 1 hour',
        expression: { start: 'now', end: 'now+1h' },
        range: () => [DateUtils.parseExpression('now'), DateUtils.parseExpression('now+1h')]
      },
      {
        label: 'Tomorrow',
        expression: { start: 'now+1d/d', end: 'now+1d/d' },
        range: () => [DateUtils.parseExpression('now+1d/d'), DateUtils.parseExpression('now+1d/d')]
      },
      {
        label: 'Next week',
        expression: { start: 'now+1w/w', end: 'now+1w/w-end' },
        range: () => [
          startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 0 }),
          endOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 0 })
        ]
      },
      { label: 'Custom range', range: () => [null, null] }
    ];
  }
}
