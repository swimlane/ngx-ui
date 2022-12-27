export interface TreeNode {
  id?: number;
  label: string;
  children?: TreeNode[];
  model: {
    [key: string]: any;
  };
  disabled?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  selectable?: boolean;
  depth?: number;
  display?: boolean;
  childNodesCount?: number;
  parentId?: number;
  index?: number;
}
