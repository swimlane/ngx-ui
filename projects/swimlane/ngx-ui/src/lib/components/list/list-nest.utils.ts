import { LIST_DEPTH_KEY, LIST_ID_KEY, LIST_PARENT_ID_KEY, ListItemModel, ListRowId } from './models/list-item.model';

export interface FlattenListOptions {
  idKey?: string;
  parentIdKey?: string;
  childrenKey?: string;
}

const DEFAULT_OPTIONS: Required<FlattenListOptions> = {
  idKey: 'id',
  parentIdKey: 'parentId',
  childrenKey: 'children'
};

function isListRowObject(value: unknown): value is ListItemModel {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nestedRowChildren(value: unknown): ListItemModel[] {
  if (!Array.isArray(value) || !value.length) {
    return [];
  }
  return value.filter(isListRowObject);
}

function rowHasNestedChildren(row: unknown, childrenKey: string): boolean {
  return isListRowObject(row) && nestedRowChildren(row[childrenKey]).length > 0;
}

function rowHasParentLink(row: unknown, parentIdKey: string): boolean {
  if (!isListRowObject(row)) {
    return false;
  }

  const parentId = row[parentIdKey];
  return parentId !== undefined && parentId !== null && parentId !== '';
}

export function listDataSourceNeedsFlatten(
  rows: Array<Record<string, unknown> | null | undefined> | null | undefined,
  options: FlattenListOptions = {}
): boolean {
  if (!rows?.length) {
    return false;
  }

  const { parentIdKey, childrenKey } = { ...DEFAULT_OPTIONS, ...options };

  return rows.some(row => rowHasNestedChildren(row, childrenKey) || rowHasParentLink(row, parentIdKey));
}

export function flattenListDataSource(
  rows: Array<Record<string, unknown> | null | undefined> | null | undefined,
  options: FlattenListOptions = {}
): Array<Record<string, unknown> | undefined> {
  if (!rows?.length) {
    return [];
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (rows.some(row => rowHasNestedChildren(row, opts.childrenKey))) {
    return flattenTreeRows(rows, opts, 0, null);
  }

  if (rows.some(row => rowHasParentLink(row, opts.parentIdKey))) {
    return flattenParentLinkedRows(rows, opts);
  }

  return rows.map(row =>
    isListRowObject(row) ? annotateRow(row, resolveRowId(row, opts.idKey, anonymousIdForRow), null, 0) : undefined
  );
}

/** Stable across re-flattens of the same source object so track-by-id survives sort/refresh. */
const anonymousIdsBySourceRow = new WeakMap<Record<string, unknown>, string>();
let anonymousIdSequence = 0;

function anonymousIdForRow(row: Record<string, unknown>): string {
  const existing = anonymousIdsBySourceRow.get(row);
  if (existing !== undefined) {
    return existing;
  }
  const id = `__list-${anonymousIdSequence++}`;
  anonymousIdsBySourceRow.set(row, id);
  return id;
}

function flattenTreeRows(
  rows: Array<Record<string, unknown> | null | undefined>,
  opts: Required<FlattenListOptions>,
  depth: number,
  parentId: ListRowId | null
): Array<Record<string, unknown>> {
  const result: Array<Record<string, unknown>> = [];

  rows.forEach(row => {
    if (!isListRowObject(row)) {
      return;
    }

    const id = resolveRowId(row, opts.idKey, anonymousIdForRow);
    const childRows = nestedRowChildren(row[opts.childrenKey]);

    if (childRows.length) {
      const rest = { ...row };
      delete rest[opts.childrenKey];
      result.push(annotateRow(rest, id, parentId, depth));
      result.push(...flattenTreeRows(childRows, opts, depth + 1, id));
      return;
    }

    result.push(annotateRow(row, id, parentId, depth));
  });

  return result;
}

function flattenParentLinkedRows(
  rows: Array<Record<string, unknown> | null | undefined>,
  opts: Required<FlattenListOptions>
): Array<Record<string, unknown>> {
  const rowIds = new Map<ListItemModel, ListRowId>();
  rows.forEach(row => {
    if (!isListRowObject(row)) {
      return;
    }
    rowIds.set(row, resolveRowId(row, opts.idKey, anonymousIdForRow));
  });

  const byParent = new Map<string, ListItemModel[]>();
  const ids = new Set(Array.from(rowIds.values(), id => String(id)));

  rows.forEach(row => {
    if (!isListRowObject(row)) {
      return;
    }
    const parentId = row[opts.parentIdKey];
    const parentKey =
      parentId === undefined || parentId === null || parentId === '' || !ids.has(String(parentId))
        ? ''
        : String(parentId);

    const bucket = byParent.get(parentKey) ?? [];
    bucket.push(row);
    byParent.set(parentKey, bucket);
  });

  const result: Array<Record<string, unknown>> = [];
  const visited = new Set<string>();

  const visit = (parentKey: string, depth: number, parentId: ListRowId | null): void => {
    const children = byParent.get(parentKey) ?? [];
    children.forEach(row => {
      const id = rowIds.get(row) as ListRowId;
      const idKey = String(id);
      if (visited.has(idKey)) {
        return;
      }
      visited.add(idKey);
      result.push(annotateRow(row, id, parentId, depth));
      visit(idKey, depth + 1, id);
    });
  };

  visit('', 0, null);

  // Cycles with no true root never enter visit(''). Promote remaining rows as roots.
  rows.forEach(row => {
    if (!isListRowObject(row)) {
      return;
    }
    const id = rowIds.get(row) as ListRowId;
    const idKey = String(id);
    if (visited.has(idKey)) {
      return;
    }
    visited.add(idKey);
    result.push(annotateRow(row, id, null, 0));
    visit(idKey, 1, id);
  });

  return result;
}

function annotateRow(
  row: Record<string, unknown>,
  id: ListRowId,
  parentId: ListRowId | null,
  depth: number
): Record<string, unknown> {
  return {
    ...row,
    [LIST_ID_KEY]: id,
    [LIST_PARENT_ID_KEY]: parentId,
    [LIST_DEPTH_KEY]: depth
  };
}

export function resolveRowId(
  row: Record<string, unknown> | null | undefined,
  idKey: string,
  fallback: number | ((row: Record<string, unknown>) => ListRowId)
): ListRowId {
  const value = row?.[idKey];
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  return typeof fallback === 'function' ? fallback(row ?? {}) : fallback;
}

export function getListRowDepth(row: Record<string, unknown> | null | undefined): number {
  const depth = row?.[LIST_DEPTH_KEY];
  return typeof depth === 'number' && depth > 0 ? depth : 0;
}

export function getListRowId(row: Record<string, unknown> | null | undefined, fallbackIndex = 0): ListRowId {
  const id = row?.[LIST_ID_KEY];
  if (typeof id === 'string' || typeof id === 'number') {
    return id;
  }
  return resolveRowId(row ?? {}, 'id', fallbackIndex);
}
