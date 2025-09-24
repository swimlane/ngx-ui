export interface SelectionList {
  /**
   * The unique identifier of the selection list.
   */
  id: string;

  /**
   * The display text of the selection list.
   */
  title: string;

  /**
   * An optional property that determines whether the selection list is currently active. This property controls the visibility of its children.
   */
  active?: boolean;

  /**
   * An optional property containing child selection lists.
   */
  children?: SelectionList[];

  /**
   * An optional property that sets the display text for the deselect all option.
   */
  deselectAllText?: string;

  /**
   * An optional property that determines whether the selection list is disabled for selection.
   */
  disabled?: boolean;

  /**
   * An optional property that sets the label text displayed at the top of the selection list.
   */
  label?: string;

  /**
   * An optional object containing metadata associated with the selection list. This object is emitted when the option is selected.
   */
  model?: Record<string, unknown>;

  /**
   * An optional property that sets the display text for the select all option.
   */
  selectAllText?: string;
}
