import { getDecadeStartYear } from './get-decade-start-year.util';

describe('getDecadeStartYear', () => {
  it('should get decade start year', () => {
    const startYear = getDecadeStartYear(2012);
    expect(startYear).toBe(2001);
  });
});
