import { filterByObject } from './filter-by-object.util';

describe('filterByObject', () => {
  it('should filter by object and be false when extra key', () => {
    expect(
      filterByObject({
        test: 'test',
        test1: 1,
        test2: { test: 'test' },
        test3: true,
      })({
        test: 'test',
        test1: 1,
        test2: { test: 'test' },
      })
    ).toBeFalsy();
  });

  it('should filter by object and be false when not matching key', () => {
    expect(
      filterByObject({
        test: 'test',
        test1: 1,
        test2: { test: 'test' },
        test3: true,
      })({
        test: 'test',
        test1: 1,
        test2: { test: 1 },
      })
    ).toBeFalsy();
  });

  it('should filter by object and be true', () => {
    expect(
      filterByObject({
        test: true,
      })({
        test: true,
      })
    ).toBeTruthy();
  });
});
