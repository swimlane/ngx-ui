export interface ToolbarMenuItem {
  label: string;
  disabled: boolean;
  dropdown: boolean;
  click: (event: any) => any;
}
