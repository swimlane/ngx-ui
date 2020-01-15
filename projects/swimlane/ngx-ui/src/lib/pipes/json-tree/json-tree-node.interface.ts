export interface JsonTreeNode {
  label: string;
  model: {
    type: string;
    value: any;
    expandable: boolean;
  };
  expandable?: boolean;
  expanded?: boolean;
  children?: JsonTreeNode[];
}
