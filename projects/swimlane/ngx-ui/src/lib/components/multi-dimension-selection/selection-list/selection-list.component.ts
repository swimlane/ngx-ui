import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { SelectionList } from '../types/selection-list';
import { SelectionListNavigationEvent } from '../types/selection-list-navigation-event';

@Component({
  selector: 'ngx-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrl: './selection-list.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-selection-list'
  }
})
export class SelectionListComponent {
  // Inputs
  multiple = input<boolean>();
  parentMap = input<Map<string, string>>();
  selected = input<Set<string>>();
  selectionList = input<SelectionList>();
  selectionLists = input<SelectionList[]>();
  selectionMap = input<Map<string, SelectionList>>();

  // Outputs
  onListNavigation = output<SelectionListNavigationEvent>();
  onSelectedChange = output<void>();

  get selectDeselectText() {
    const allSelected = this.selectionList().children.every(option => this.selected().has(option.id));
    return allSelected
      ? this.selectionList().deselectAllText || 'Deselect All'
      : this.selectionList().selectAllText || 'Select All';
  }

  /**
   * @function handleListNavigation
   *
   * @description
   * Handler for when a list option is activated or deactivated.
   *
   * @param {SelectionList} selectionList - the activated or deactivated list option
   * @param {boolean} active - whether the list option is active
   */
  handleListNavigation(selectionList: SelectionList, active: boolean): void {
    if (!selectionList.children || selectionList.children.length === 0 || selectionList.disabled) {
      return;
    }

    this.onListNavigation.emit({ active, listId: this.selectionList().id, selectionList });
  }

  /**
   * @function handleSelectionChange
   *
   * @description
   * Handler for when a list option is selected or deselected.
   *
   * @param {Event} event - the change event from the checkbox input
   * @param {SelectionList} selectionList - the selected list option
   */
  handleSelectionChange(event: Event, selectionList: SelectionList): void {
    if (selectionList.disabled) {
      return;
    }

    const { id } = selectionList;
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selected().add(id);
      this.selectAllAncestors(id);
    } else {
      this.selected().delete(id);
      this.deselectAncestorsWithoutSelectedChildren(id);
    }

    const matchingOption = this.selectionList().children?.find(option => option.id === id);
    if (matchingOption && matchingOption?.children?.length > 0) {
      this.selectDeselectAllChildren(checked, matchingOption.children);
    }

    this.onSelectedChange.emit();
  }

  /**
   * @function handleSelectDeselectAll
   *
   * @description
   * Handler for when a user clicks the select/deselect all button.
   */
  handleSelectDeselectAll(): void {
    const allSelected = this.selectionList().children.every(option => this.selected().has(option.id));
    this.selectDeselectAllChildren(!allSelected, this.selectionList().children);
    this.onSelectedChange.emit();
  }

  /**
   * @function handleSelectOption
   *
   * @description
   * Handler for when a user clicks or presses the enter key on a list option.
   *
   * @param {SelectionList} selectionList - the selected list option
   */
  handleSelectOption(selectionList: SelectionList): void {
    if (this.multiple() || (selectionList.children && selectionList.children.length > 0)) {
      this.handleListNavigation(selectionList, true);
      return;
    }

    if (selectionList.disabled) {
      return;
    }

    // Single selection mode
    if (this.selected().has(selectionList.id)) {
      // If the user clicks on the option that is already selected, do nothing
      return;
    }

    this.selected().clear();
    this.selected().add(selectionList.id);
    this.onSelectedChange.emit();
  }

  /**
   * @function deselectAncestorsWithoutSelectedChildren
   *
   * @description
   * Deselects all ancestors if they have no selected children.
   *
   * @param {string} id - the ID of the list option that was selected/deselected
   */
  private deselectAncestorsWithoutSelectedChildren(id: string): void {
    let parentId = this.parentMap().get(id);
    while (parentId) {
      // Deselect all parent items of the selected option if no siblings are selected
      const selectedParentListItems = this.selectionLists()
        .find(list => list.id === parentId)
        ?.children?.map(option => option.id)
        ?.filter(childId => this.selected().has(childId));
      if (selectedParentListItems?.length === 0) {
        this.selected().delete(parentId);
        parentId = this.parentMap().get(parentId);
      } else {
        parentId = null;
      }
    }
  }

  /**
   * @function selectAllAncestors
   *
   * @description
   * Selects all ancestors of the selected list option.
   *
   * @param {string} id - the ID of the selected list option
   */
  private selectAllAncestors(id: string): void {
    let parentId = this.parentMap().get(id);
    while (parentId) {
      this.selected().add(parentId);
      parentId = this.parentMap().get(parentId);
    }
  }

  /**
   * @function selectDeselectAllChildren
   *
   * @description
   * Recursively selects or deselects all items in the provided `children` array.
   *
   * @param {boolean} selected - whether to select all items
   * @param {SelectionList[]} children - the array of child items to select or deselect
   */
  private selectDeselectAllChildren(selected: boolean, children: SelectionList[]): void {
    children.forEach(child => {
      if (child.disabled) return;
      if (selected) {
        this.selected().add(child.id);
        this.selectAllAncestors(child.id);
      } else {
        this.selected().delete(child.id);
        this.deselectAncestorsWithoutSelectedChildren(child.id);
      }

      if (child.children && child.children.length > 0) {
        this.selectDeselectAllChildren(selected, child.children);
      }
    });
  }
}
