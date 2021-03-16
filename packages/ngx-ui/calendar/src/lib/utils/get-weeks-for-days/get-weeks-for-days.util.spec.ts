import { getWeeksForDays } from './get-weeks-for-days.util';

describe('getWeeksForDays', () => {
  it('should get weeks of days', () => {
    const weeks = getWeeksForDays([], 0);
    expect(weeks.length).toBe(0);
  });
});
