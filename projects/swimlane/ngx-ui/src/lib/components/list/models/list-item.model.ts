export interface ListItemModel extends Record<string, unknown> {
  id?: string | number;
  parentId?: string | number | null;
  children?: ListItemModel[];
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export const LIST_DEPTH_KEY = '_listDepth';
export const LIST_ID_KEY = '_listId';
export const LIST_PARENT_ID_KEY = '_listParentId';

export type ListRowId = string | number;
