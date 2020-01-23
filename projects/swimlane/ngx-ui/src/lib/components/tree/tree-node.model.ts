export interface TreeNode {
  label: string;
  children?: TreeNode[];
  model: {
    [key: string]: any;
  };
  expandable?: boolean;
  expanded?: boolean;
}
