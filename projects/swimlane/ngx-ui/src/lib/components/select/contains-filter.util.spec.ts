import { containsFilter } from './contains-filter.util';

describe('containsFilter', () => {
  it('should be true when not case sensitive and filter exists', () => {
    const res = containsFilter('test', 'test', {});
    expect(res).toBeTruthy();
  });

  it('should be true when case sensitive and filter exists', () => {
    const res = containsFilter('test', 'test', { filterCaseSensitive: true });
    expect(res).toBeTruthy();
  });

  it('should be false of !value', () => {
    const res = containsFilter(undefined, undefined, {});
    expect(res).toBeFalsy();
  });

  it('should traverse object value', () => {
    const res = containsFilter(
      {
        test: 'test',
        nottest: '1'
      },
      '1',
      {}
    );

    expect(res).toBeTruthy();
  });

  it('should be undefined if value is not string or object', () => {
    const res = containsFilter(1, '1', {});
    expect(res).toBeUndefined();
  });
});
