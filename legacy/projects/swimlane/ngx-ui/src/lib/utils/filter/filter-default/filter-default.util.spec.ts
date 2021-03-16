import { filterDefault } from './filter-default.util';

describe('filterDefault', () => {
  it('should filter', () => {
    expect(filterDefault('filter')('filter')).toBeTruthy();
  });
});
