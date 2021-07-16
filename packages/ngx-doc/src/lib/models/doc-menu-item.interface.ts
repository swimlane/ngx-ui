// Support 1 level of children
export interface DocMenuItem {
  name: string;
  expanded?: boolean;
  icon?: string;
  route?: string;
  children?: Omit<DocMenuItem, 'children'>[];
}
