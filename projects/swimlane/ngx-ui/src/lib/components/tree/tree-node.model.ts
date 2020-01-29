export interface TreeNode {
  label: string;
  children?: TreeNode[];
  model: {
    [key: string]: any;
  };
  disabled?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  selectable?: boolean;
}
