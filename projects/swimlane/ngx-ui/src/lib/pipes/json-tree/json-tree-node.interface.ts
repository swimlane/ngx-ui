export interface JsonTreeNode {
  label: string;
  model: {
    [key: string]: any
  };
  expandable?: boolean;
  expanded?: boolean;
  children?: JsonTreeNode[];
}
