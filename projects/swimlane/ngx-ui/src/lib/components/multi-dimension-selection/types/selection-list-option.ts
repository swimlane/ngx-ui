export interface SelectionListOption {
  /**
   * The display name of the option.
   */
  name: string;

  /**
   * The unique identifier of the option. This should correspond to the `id` property of a `SelectionList`.
   */
  value: string;

  /**
   * An optional object containing metadata associated with the option.
   */
  model?: Record<string, unknown>;
}
