import { containsFilter } from './contains-filter.util';

describe('containsFilter', () => {
  it('should be true when not case sensitive and filter exists', () => {
    const res = containsFilter('test', 'test', {});
    expect(res).toBeTruthy();
  });

  it('should be true when not case sensitive and filter contains special regex characters', () => {
    const res = containsFilter('Special regex characters .*+?^${}()|[]\\ are escaped', '.*+?^${}()|[]\\', {});
    expect(res).toBeTruthy();
  });

  it('should be true when case sensitive and filter exists', () => {
    const res = containsFilter('test', 'test', { filterCaseSensitive: true });
    expect(res).toBeTruthy();
  });

  it('should be true when case sensitive and filter contains special regex characters', () => {
    const res = containsFilter('Special regex characters .*+?^${}()|[]\\ are escaped', '.*+?^${}()|[]\\', {
      filterCaseSensitive: true
    });
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

  it('should convert number to string and return true when filter matches', () => {
    const res = containsFilter(123, '123', {});
    expect(res).toBeTruthy();
  });

  it('should convert number to string and return true when filter matches partially', () => {
    const res = containsFilter(123, '12', {});
    expect(res).toBeTruthy();
  });

  it('should convert number to string and return false when filter does not match', () => {
    const res = containsFilter(123, '456', {});
    expect(res).toBeFalsy();
  });

  it('should handle number filtering with case sensitive option', () => {
    const res = containsFilter(123, '123', { filterCaseSensitive: true });
    expect(res).toBeTruthy();
  });

  it('should handle alphanumeric string filtering with numbers', () => {
    const res = containsFilter('ABC123', '123', {});
    expect(res).toBeTruthy();
  });

  it('should handle alphanumeric string filtering with partial numbers', () => {
    const res = containsFilter('ABC123', '12', {});
    expect(res).toBeTruthy();
  });

  it('should handle alphanumeric string filtering with letters and numbers', () => {
    const res = containsFilter('ABC123', 'BC1', {});
    expect(res).toBeTruthy();
  });

  it('should return false for alphanumeric string when filter does not match', () => {
    const res = containsFilter('ABC123', 'XYZ', {});
    expect(res).toBeFalsy();
  });
});
