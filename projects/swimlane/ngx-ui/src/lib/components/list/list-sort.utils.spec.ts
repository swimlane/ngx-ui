import { ListHeaderComponent } from './list-header/list-header.component';
import { defaultListSortComparator, getNextListSort, parseListSortDate, sortListRows } from './list-sort.utils';

describe('list-sort.utils', () => {
  const header = (prop: string, overrides: Partial<ListHeaderComponent> = {}): ListHeaderComponent => {
    const h = new ListHeaderComponent();
    h.sortable = true;
    h.prop = prop;
    Object.assign(h, overrides);
    return h;
  };

  describe('getNextListSort', () => {
    it('should return asc on first click', () => {
      expect(getNextListSort(null, header('name'))).toEqual({ prop: 'name', dir: 'asc' });
    });

    it('should cycle asc -> desc -> asc', () => {
      const h = header('name');
      let sort = getNextListSort(null, h);
      expect(sort).toEqual({ prop: 'name', dir: 'asc' });

      sort = getNextListSort(sort, h);
      expect(sort).toEqual({ prop: 'name', dir: 'desc' });

      sort = getNextListSort(sort, h);
      expect(sort).toEqual({ prop: 'name', dir: 'asc' });
    });

    it('should reset to asc when switching to a different column', () => {
      const sort = getNextListSort({ prop: 'name', dir: 'asc' }, header('value'));
      expect(sort).toEqual({ prop: 'value', dir: 'asc' });
    });

    it('should return current sort unchanged when header has no prop', () => {
      const current = { prop: 'name', dir: 'asc' as const };
      expect(getNextListSort(current, header(''))).toBe(current);
    });
  });

  describe('sortListRows', () => {
    it('should return a copy of rows unchanged when sort is null', () => {
      const rows = [{ name: 'B' }, { name: 'A' }];
      const result = sortListRows(rows, null, []);
      expect(result).toEqual(rows);
      expect(result).not.toBe(rows);
    });

    it('should sort strings ascending', () => {
      const rows = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
      const sorted = sortListRows(rows, { prop: 'name', dir: 'asc' }, [header('name')]);
      expect(sorted.map(r => r.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should sort strings descending', () => {
      const rows = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
      const sorted = sortListRows(rows, { prop: 'name', dir: 'desc' }, [header('name')]);
      expect(sorted.map(r => r.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('should sort date strings chronologically when type is date', () => {
      const rows = [{ date: '1/10/2025' }, { date: '1/2/2025' }, { date: '1/6/2025' }];
      const sorted = sortListRows(rows, { prop: 'date', dir: 'asc' }, [header('date', { type: 'date' })]);
      expect(sorted.map(r => r.date)).toEqual(['1/2/2025', '1/6/2025', '1/10/2025']);
    });

    it('should sort date strings chronologically when prop is "date"', () => {
      const rows = [{ date: '1/10/2025' }, { date: '1/2/2025' }, { date: '1/6/2025' }];
      const sorted = sortListRows(rows, { prop: 'date', dir: 'asc' }, [header('date')]);
      expect(sorted.map(r => r.date)).toEqual(['1/2/2025', '1/6/2025', '1/10/2025']);
    });

    it('should sort date strings in descending order', () => {
      const rows = [{ date: '1/2/2025' }, { date: '1/10/2025' }, { date: '1/6/2025' }];
      const sorted = sortListRows(rows, { prop: 'date', dir: 'desc' }, [header('date', { type: 'date' })]);
      expect(sorted.map(r => r.date)).toEqual(['1/10/2025', '1/6/2025', '1/2/2025']);
    });

    it('should use a custom column comparator when provided', () => {
      const rows = [{ value: 3 }, { value: 1 }, { value: 2 }];
      const h = header('value', { comparator: (a, b) => Number(a) - Number(b) });
      const sorted = sortListRows(rows, { prop: 'value', dir: 'asc' }, [h]);
      expect(sorted.map(r => r.value)).toEqual([1, 2, 3]);
    });

    it('should not mutate the original rows array', () => {
      const rows = [{ name: 'B' }, { name: 'A' }];
      sortListRows(rows, { prop: 'name', dir: 'asc' }, [header('name')]);
      expect(rows.map(r => r.name)).toEqual(['B', 'A']);
    });
  });

  describe('parseListSortDate', () => {
    it('should return null for null or undefined', () => {
      expect(parseListSortDate(null)).toBeNull();
      expect(parseListSortDate(undefined)).toBeNull();
    });

    it('should return timestamp for a Date object', () => {
      const d = new Date('2025-01-06');
      expect(parseListSortDate(d)).toBe(d.getTime());
    });

    it('should return the value unchanged for a number', () => {
      expect(parseListSortDate(1234567890)).toBe(1234567890);
    });

    it('should parse a valid date string to a timestamp', () => {
      expect(parseListSortDate('1/6/2025')).toBe(Date.parse('1/6/2025'));
    });

    it('should return null for an unparseable string', () => {
      expect(parseListSortDate('not-a-date')).toBeNull();
    });
  });

  describe('defaultListSortComparator', () => {
    it('should sort null values last', () => {
      expect(defaultListSortComparator(null, 'a')).toBeLessThan(0);
      expect(defaultListSortComparator('a', null)).toBeGreaterThan(0);
      expect(defaultListSortComparator(null, null)).toBe(0);
    });

    it('should compare numbers numerically', () => {
      expect(defaultListSortComparator(1, 2)).toBeLessThan(0);
      expect(defaultListSortComparator(2, 1)).toBeGreaterThan(0);
      expect(defaultListSortComparator(1, 1)).toBe(0);
    });

    it('should compare strings case-insensitively', () => {
      expect(defaultListSortComparator('a', 'B')).toBeLessThan(0);
      expect(defaultListSortComparator('B', 'a')).toBeGreaterThan(0);
    });

    it('should sort numeric strings in natural order', () => {
      expect(defaultListSortComparator('item-2', 'item-10')).toBeLessThan(0);
    });
  });
});
