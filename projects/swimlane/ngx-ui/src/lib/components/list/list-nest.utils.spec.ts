import { flattenListDataSource, getListRowDepth, getListRowId, listDataSourceNeedsFlatten } from './list-nest.utils';
import { LIST_DEPTH_KEY, LIST_ID_KEY, LIST_PARENT_ID_KEY } from './models/list-item.model';

describe('list-nest.utils', () => {
  describe('listDataSourceNeedsFlatten', () => {
    it('returns false for empty or flat rows', () => {
      expect(listDataSourceNeedsFlatten([])).toBe(false);
      expect(listDataSourceNeedsFlatten([{ id: 1, name: 'a' }])).toBe(false);
    });

    it('returns true for nested children or parentId links', () => {
      expect(listDataSourceNeedsFlatten([{ id: 1, children: [{ id: 2 }] }])).toBe(true);
      expect(listDataSourceNeedsFlatten([{ id: 1 }, { id: 2, parentId: 1 }])).toBe(true);
    });

    it('returns false when children are primitives rather than nested rows', () => {
      expect(listDataSourceNeedsFlatten([{ id: 1, children: ['a', 'b'] }])).toBe(false);
      expect(listDataSourceNeedsFlatten([{ id: 1, children: [1, 2] }])).toBe(false);
    });

    it('ignores undefined placeholder rows used by virtual scrolling', () => {
      expect(listDataSourceNeedsFlatten([undefined, { id: 1, name: 'a' }, undefined])).toBe(false);
      expect(listDataSourceNeedsFlatten([undefined, { id: 1, children: [{ id: 2 }] }])).toBe(true);
    });
  });

  describe('flattenListDataSource', () => {
    it('keeps undefined placeholder rows in place for virtual scrolling', () => {
      const rows = flattenListDataSource([undefined, { id: 'a', name: 'A' }, undefined, { id: 'b', name: 'B' }]);

      expect(rows).toHaveLength(4);
      expect(rows[0]).toBeUndefined();
      expect(rows[2]).toBeUndefined();
      expect(rows[1]).toEqual({
        id: 'a',
        name: 'A',
        [LIST_ID_KEY]: 'a',
        [LIST_PARENT_ID_KEY]: null,
        [LIST_DEPTH_KEY]: 0
      });
      expect(rows[3]).toEqual({
        id: 'b',
        name: 'B',
        [LIST_ID_KEY]: 'b',
        [LIST_PARENT_ID_KEY]: null,
        [LIST_DEPTH_KEY]: 0
      });
    });

    it('annotates plain flat rows with depth 0', () => {
      const rows = flattenListDataSource([
        { id: 'a', name: 'A' },
        { id: 'b', name: 'B' }
      ]);

      expect(rows).toEqual([
        { id: 'a', name: 'A', [LIST_ID_KEY]: 'a', [LIST_PARENT_ID_KEY]: null, [LIST_DEPTH_KEY]: 0 },
        { id: 'b', name: 'B', [LIST_ID_KEY]: 'b', [LIST_PARENT_ID_KEY]: null, [LIST_DEPTH_KEY]: 0 }
      ]);
    });

    it('leaves primitive children arrays on flat rows instead of treating them as nested rows', () => {
      const rows = flattenListDataSource([
        { id: 'a', name: 'A', children: ['related-1', 'related-2'] },
        { id: 'b', name: 'B', children: [10, 20] }
      ]);

      expect(rows).toEqual([
        {
          id: 'a',
          name: 'A',
          children: ['related-1', 'related-2'],
          [LIST_ID_KEY]: 'a',
          [LIST_PARENT_ID_KEY]: null,
          [LIST_DEPTH_KEY]: 0
        },
        {
          id: 'b',
          name: 'B',
          children: [10, 20],
          [LIST_ID_KEY]: 'b',
          [LIST_PARENT_ID_KEY]: null,
          [LIST_DEPTH_KEY]: 0
        }
      ]);
    });

    it('keeps primitive sibling entries when mixed with nested row children', () => {
      const rows = flattenListDataSource([
        {
          id: 'root',
          name: 'Root',
          children: [{ id: 'child', name: 'Child' }, 'label-only']
        }
      ]);

      expect(rows.map(row => row.id)).toEqual(['root', 'child']);
      expect(rows[0].children).toBeUndefined();
    });

    it('flattens nested children depth-first and strips children from display rows', () => {
      const rows = flattenListDataSource([
        {
          id: 'root',
          name: 'Root',
          children: [
            { id: 'child', name: 'Child', children: [{ id: 'grandchild', name: 'Grandchild' }] },
            { id: 'sibling', name: 'Sibling' }
          ]
        }
      ]);

      expect(rows.map(row => ({ id: row.id, depth: row[LIST_DEPTH_KEY], parentId: row[LIST_PARENT_ID_KEY] }))).toEqual([
        { id: 'root', depth: 0, parentId: null },
        { id: 'child', depth: 1, parentId: 'root' },
        { id: 'grandchild', depth: 2, parentId: 'child' },
        { id: 'sibling', depth: 1, parentId: 'root' }
      ]);
      expect(rows.every(row => row.children === undefined)).toBe(true);
    });

    it('flattens parentId-linked rows in parent-before-child order', () => {
      const rows = flattenListDataSource([
        { id: 'c', name: 'Child', parentId: 'a' },
        { id: 'a', name: 'Root' },
        { id: 'b', name: 'Other Root' },
        { id: 'd', name: 'Grandchild', parentId: 'c' }
      ]);

      expect(rows.map(row => row.id)).toEqual(['a', 'c', 'd', 'b']);
      expect(rows.map(row => row[LIST_DEPTH_KEY])).toEqual([0, 1, 2, 0]);
    });

    it('skips undefined placeholder rows when flattening parentId-linked data', () => {
      const rows = flattenListDataSource([
        undefined,
        { id: 'c', name: 'Child', parentId: 'a' },
        undefined,
        { id: 'a', name: 'Root' }
      ]);

      expect(rows.map(row => row?.id)).toEqual(['a', 'c']);
    });

    it('assigns unique fallback ids when nested rows omit id', () => {
      const rows = flattenListDataSource([
        {
          name: 'Root A',
          children: [{ name: 'Child A1' }, { name: 'Child A2' }]
        },
        {
          name: 'Root B',
          children: [{ name: 'Child B1' }]
        }
      ]);

      const ids = rows.map(row => row[LIST_ID_KEY]);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.every(id => typeof id === 'string' && String(id).startsWith('__list-'))).toBe(true);
      expect(rows.map(row => row[LIST_PARENT_ID_KEY])).toEqual([null, ids[0], ids[0], null, ids[3]]);
    });

    it('keeps the same fallback id when the same source row is flattened again', () => {
      const root = { name: 'Root', children: [{ name: 'Child' }] };
      const first = flattenListDataSource([root]);
      const second = flattenListDataSource([root]);

      expect(second.map(row => row[LIST_ID_KEY])).toEqual(first.map(row => row[LIST_ID_KEY]));
    });

    it('assigns unique fallback ids for parentId rows that omit id', () => {
      const rows = flattenListDataSource([{ name: 'Root' }, { name: 'Child', parentId: 'missing' }, { name: 'Other' }]);

      const ids = rows.map(row => row[LIST_ID_KEY]);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.every(id => typeof id === 'string' && String(id).startsWith('__list-'))).toBe(true);
    });

    it('breaks parentId cycles without dropping rows or overflowing', () => {
      const cyclic = flattenListDataSource([
        { id: 'a', name: 'A', parentId: 'b' },
        { id: 'b', name: 'B', parentId: 'a' }
      ]);

      expect(cyclic.map(row => row.id)).toEqual(['a', 'b']);
      expect(cyclic.map(row => row[LIST_DEPTH_KEY])).toEqual([0, 1]);

      const mixed = flattenListDataSource([
        { id: 'root', name: 'Root' },
        { id: 'child', name: 'Child', parentId: 'root' },
        { id: 'x', name: 'X', parentId: 'y' },
        { id: 'y', name: 'Y', parentId: 'x' }
      ]);

      expect(mixed.map(row => row.id)).toEqual(['root', 'child', 'x', 'y']);
      expect(mixed.map(row => row[LIST_DEPTH_KEY])).toEqual([0, 1, 0, 1]);
    });
  });

  describe('row helpers', () => {
    it('reads depth and id metadata', () => {
      const row = { id: 'x', [LIST_ID_KEY]: 'x', [LIST_DEPTH_KEY]: 2 };
      expect(getListRowDepth(row)).toBe(2);
      expect(getListRowId(row)).toBe('x');
      expect(getListRowDepth({})).toBe(0);
      expect(getListRowDepth(undefined)).toBe(0);
      expect(getListRowId(undefined, 3)).toBe(3);
    });
  });
});
