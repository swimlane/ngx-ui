export interface TreeNode {
  label: string;
  model: Record<string, unknown>;
  disabled?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  selectable?: boolean;
  children?: TreeNode[];
}
