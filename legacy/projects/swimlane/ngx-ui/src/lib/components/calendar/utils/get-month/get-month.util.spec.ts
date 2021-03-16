import * as moment from 'moment';

import { getMonth } from './get-month.util';

describe('getMonth', () => {
  it('should get 2d array of days by weeks in month', () => {
    const weeks = getMonth(moment());
    expect(weeks.length).toBeGreaterThanOrEqual(4);
  });
});
