import { filterByString } from './filter-by-string.util';

describe('filterByString', () => {
  it('should filter by string', () => {
    expect(filterByString('fil')('FILTER')).toBeTruthy();
  });
});
