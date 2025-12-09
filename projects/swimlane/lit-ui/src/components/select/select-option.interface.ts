/**
 * Select option interface matching @swimlane/ngx-ui
 */
export interface SelectOption {
  /**
   * Display name
   */
  name: string;

  /**
   * Value
   */
  value: any;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;

  /**
   * Group name for grouped options
   */
  group?: string;

  /**
   * Custom data
   */
  [key: string]: any;
}





