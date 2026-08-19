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
  });

  describe('flattenListDataSource', () => {
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
  });

  describe('row helpers', () => {
    it('reads depth and id metadata', () => {
      const row = { id: 'x', [LIST_ID_KEY]: 'x', [LIST_DEPTH_KEY]: 2 };
      expect(getListRowDepth(row)).toBe(2);
      expect(getListRowId(row)).toBe('x');
      expect(getListRowDepth({})).toBe(0);
    });
  });
});
