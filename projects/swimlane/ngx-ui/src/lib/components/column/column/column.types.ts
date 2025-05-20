export interface Column {
  id: string;
  active: boolean;
  title: string;
  templateRef?: string;
  children?: Array<Column>;
  content?: {
    width?: string;
    component: any;
    inputs?: any;
    outputs?: any;
    module?: any;
  };
}
