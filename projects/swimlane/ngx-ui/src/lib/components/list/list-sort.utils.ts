import { ListHeaderComponent } from './list-header/list-header.component';
import { ListHeaderSortType } from './models/list-header-sort-type.type';
import { ListSortPropDir } from './models/list-sort-prop-dir';
import { ListSortDirection } from './models/list-sort-direction.type';

export type ListSortComparator = (
  a: unknown,
  b: unknown,
  rowA?: Record<string, unknown>,
  rowB?: Record<string, unknown>
) => number;

const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });

export function defaultListSortComparator(a: unknown, b: unknown): number {
  if (a == null && b == null) {
    return 0;
  }
  if (a == null) {
    return -1;
  }
  if (b == null) {
    return 1;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return collator.compare(a, b);
  }
  return collator.compare(String(a), String(b));
}

export function parseListSortDate(value: unknown): number | null {
  if (value == null) {
    return null;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === 'number') {
    return value;
  }

  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? null : parsed;
}

export function dateListSortComparator(a: unknown, b: unknown): number {
  const timeA = parseListSortDate(a);
  const timeB = parseListSortDate(b);

  if (timeA == null && timeB == null) {
    return 0;
  }
  if (timeA == null) {
    return -1;
  }
  if (timeB == null) {
    return 1;
  }

  return timeA - timeB;
}

export function getListHeaderSortType(header: Pick<ListHeaderComponent, 'prop' | 'type'>): ListHeaderSortType {
  if (header.type) {
    return header.type;
  }

  return header.prop === 'date' ? 'date' : 'text';
}

export function getListSortComparator(
  header: Pick<ListHeaderComponent, 'prop' | 'type' | 'comparator'>
): ListSortComparator {
  if (header.comparator) {
    return header.comparator;
  }

  return getListHeaderSortType(header) === 'date' ? dateListSortComparator : defaultListSortComparator;
}

export function getNextListSort(
  currentSort: ListSortPropDir | null,
  header: ListHeaderComponent
): ListSortPropDir | null {
  const prop = header.prop;
  if (!prop) {
    return currentSort;
  }

  if (!currentSort || currentSort.prop !== prop) {
    return { prop, dir: 'asc' };
  }

  return { prop, dir: currentSort.dir === 'asc' ? 'desc' : 'asc' };
}

export function sortListRows(
  rows: Array<Record<string, unknown>>,
  sort: ListSortPropDir | null,
  headers: Iterable<ListHeaderComponent>
): Array<Record<string, unknown>> {
  if (!sort?.prop) {
    return [...rows];
  }

  const header = Array.from(headers).find(item => item?.prop === sort.prop);
  const comparator = header ? getListSortComparator(header) : defaultListSortComparator;
  const isDateSort = !header?.comparator && getListHeaderSortType(header ?? { prop: sort.prop }) === 'date';

  const parsedDates = isDateSort
    ? new Map(rows.map(row => [row, parseListSortDate(row[sort.prop])]))
    : null;

  return [...rows].sort((rowA, rowB) => {
    const valueA = parsedDates ? parsedDates.get(rowA) : rowA[sort.prop];
    const valueB = parsedDates ? parsedDates.get(rowB) : rowB[sort.prop];
    const result = comparator(valueA, valueB, rowA, rowB);
    return sort.dir === 'desc' ? -result : result;
  });
}

export function getListSortDirection(sort: ListSortPropDir | null, prop?: string): ListSortDirection | undefined {
  if (!prop || !sort || sort.prop !== prop) {
    return undefined;
  }

  return sort.dir;
}
