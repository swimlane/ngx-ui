/**
 * Select option interface matching @swimlane/ngx-ui
 */
export interface SelectOption {
  /**
   * Stable identifier (often matches server `name`); shown when no title/label
   */
  name: string;

  /**
   * Selected form / programmatic value (defaults to `name` when omitted)
   */
  value?: any;

  /**
   * Primary display string when different from `name` (e.g. AI-SOC: id in `name`, label in `title`)
   */
  title?: string;

  /**
   * Alias for `title` for display
   */
  label?: string;

  /**
   * Secondary line for search / list (not always shown in UI)
   */
  description?: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;

  /**
   * Group / section header when `grouped` is enabled on the select
   */
  group?: string;

  /**
   * Custom data
   */
  [key: string]: any;
}
