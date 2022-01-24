import moment from 'moment-timezone';

import { getDaysForMonth } from './get-days-for-month.util';

describe('getDaysForMonth', () => {
  it('should get calendar days of month', () => {
    const days = getDaysForMonth(moment());
    expect(days.length).toBeGreaterThan(0);
  });
});
