import { ListHeaderComponent } from './list-header/list-header.component';
import { getNextListSort, sortListRows } from './list-sort.utils';

describe('list-sort.utils', () => {
  const createHeader = (prop: string): ListHeaderComponent => {
    const header = new ListHeaderComponent();
    header.prop = prop;
    header.sortable = true;
    return header;
  };

  it('should cycle sort state none -> asc -> desc -> asc', () => {
    const header = createHeader('name');
    let sort = getNextListSort(null, header);
    expect(sort).toEqual({ prop: 'name', dir: 'asc' });

    sort = getNextListSort(sort, header);
    expect(sort).toEqual({ prop: 'name', dir: 'desc' });

    sort = getNextListSort(sort, header);
    expect(sort).toEqual({ prop: 'name', dir: 'asc' });
  });

  it('should replace active sort when a different column is selected', () => {
    const nameHeader = createHeader('name');
    const valueHeader = createHeader('value');

    const sort = getNextListSort({ prop: 'name', dir: 'asc' }, valueHeader);
    expect(sort).toEqual({ prop: 'value', dir: 'asc' });
    expect(nameHeader.prop).toBe('name');
  });

  it('should sort date strings chronologically when type is date', () => {
    const header = createHeader('date');
    header.type = 'date';
    const rows = [{ date: '1/10/2025' }, { date: '1/2/2025' }, { date: '1/6/2025' }];

    const sorted = sortListRows(rows, { prop: 'date', dir: 'asc' }, [header]);
    expect(sorted.map(row => row.date)).toEqual(['1/2/2025', '1/6/2025', '1/10/2025']);
  });

  it('should sort date strings chronologically when prop is date', () => {
    const header = createHeader('date');
    const rows = [{ date: '1/10/2025' }, { date: '1/2/2025' }, { date: '1/6/2025' }];

    const sorted = sortListRows(rows, { prop: 'date', dir: 'asc' }, [header]);
    expect(sorted.map(row => row.date)).toEqual(['1/2/2025', '1/6/2025', '1/10/2025']);
  });

  it('should sort rows using a column comparator when provided', () => {
    const header = createHeader('value');
    header.comparator = (a, b) => Number(a) - Number(b);
    const rows = [{ value: 3 }, { value: 1 }, { value: 2 }];

    const sorted = sortListRows(rows, { prop: 'value', dir: 'asc' }, [header]);
    expect(sorted.map(row => row.value)).toEqual([1, 2, 3]);
  });
});
