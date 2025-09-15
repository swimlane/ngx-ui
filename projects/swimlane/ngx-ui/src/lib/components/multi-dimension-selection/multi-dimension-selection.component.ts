import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { InViewportDirective } from 'ng-in-viewport';
import { debounceable } from '../../decorators/debounceable/debounceable.decorator';
import { SelectionList } from './types/selection-list';
import { SelectionListOption } from './types/selection-list-option';
import { SelectionListNavigationEvent } from './types/selection-list-navigation-event';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'ngx-multi-dimension-selection',
  templateUrl: './multi-dimension-selection.component.html',
  styleUrl: './multi-dimension-selection.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-multi-dimension-selection',
    '[class.ngx-multi-dimension-selection__standalone]': 'standalone()'
  }
})
export class MultiDimensionSelectionComponent implements OnChanges, AfterViewInit {
  // Inputs
  emptyPlaceholder = input<string>('No options available');
  filterable = input<boolean>(true);
  filterEmptyPlaceholder = input<string>('No matches...');
  multiple = input<boolean>(true);
  selected = input<Array<string>>([]);
  selectionList = input<SelectionList>();
  standalone = input<boolean>(false);

  // Outputs
  onClose = output<void>();
  onSelectedChange = output<Array<SelectionListOption>>();

  // Properties
  parentMap = new Map<string, string>();
  searchTerm = '';
  selectedSet: Set<string>;
  selectionLists: SelectionList[] = [];
  selectionMap = new Map<string, SelectionList>();
  selectionListModel: SelectionList;

  // View children
  filterInput = viewChild(InputComponent);
  inViewport = viewChild(InViewportDirective);

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownEscape() {
    this.onClose.emit();
  }

  // Dependencies
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef);

  // Used in conjunction with the InViewportDirective to add the appropriate CSS class
  get element() {
    return this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selected = changes.selected?.currentValue;
    if (selected && Array.isArray(selected)) {
      this.selectedSet = new Set(selected);
    } else {
      this.selectedSet = new Set<string>();
    }

    if (changes.selectionList) {
      this.initSelectionLists();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.filterInput()?.element?.nativeElement) {
        this.filterInput().element.nativeElement.focus();
      }
    }, 50);
  }

  /**
   * @function handleListNavigation
   *
   * @description
   * Handler for when a list option is activated or deactivated.
   *
   * @param {SelectionListNavigationEvent} event - The list navigation event
   */
  handleListNavigation(event: SelectionListNavigationEvent): void {
    if (event.active) {
      event.selectionList.active = event.active;
    }
    const parentList = this.selectionLists.find(list => list.id === event.listId);
    const activeSibling = parentList?.children?.find(child => child.active && child.id !== event.selectionList.id);

    if (activeSibling) {
      // If it's a `mouseenter` event, deactivate the active sibling element
      // If it's a `mouseleave` event, deactivate the provided option
      const listToDeactivate = event.active ? activeSibling : event.selectionList;
      this.deactivatePath(listToDeactivate);
    }

    this.selectionLists = this.generateSelectionLists();
  }

  /**
   * @function handleSelectedChange
   *
   * @description
   * Handler for when an option is selected or deselected. Emits the updated list of selected options.
   */
  handleSelectedChange(): void {
    const selectedItems: SelectionListOption[] = [];
    Array.from(this.selectedSet).forEach(id => {
      const selectedItem = this.selectionMap.get(id);
      if (selectedItem) {
        selectedItems.push({ name: selectedItem.title, value: id, model: selectedItem.model });
      }
    });
    this.onSelectedChange.emit(selectedItems);

    if (!this.multiple()) {
      this.onClose.emit();
    }
  }

  /**
   * @function handleSearchTermChange
   *
   * @description
   * Handler for when the search term changes. Filters the selection list based on the search term.
   *
   * @param {string} searchTerm - the user-entered search term
   *
   * @optional
   * @param {boolean} focusInput - whether to focus the search input
   */
  @debounceable(150)
  handleSearchTermChange(searchTerm: string, focusInput?: boolean): void {
    this.searchTerm = searchTerm;

    if (!this.searchTerm) {
      const activeChild = this.selectionListModel?.children?.find(child => child.active);
      if (activeChild) {
        this.deactivatePath(activeChild);
      }
      this.selectionListModel = this.selectionList();
      this.selectionLists = this.generateSelectionLists();

      if (focusInput && this.filterInput()?.element?.nativeElement) {
        this.filterInput().element.nativeElement.focus();
      }

      this.cdr.markForCheck();
      return;
    }

    const activeChild = this.selectionListModel?.children?.find(child => child.active);
    if (activeChild) {
      this.deactivatePath(activeChild);
    }

    this.selectionListModel = this.searchAllDimensions(this.selectionList(), searchTerm.toLocaleLowerCase());
    if (!this.selectionListModel) {
      this.selectionLists = [];
      this.cdr.markForCheck();
      return;
    }

    this.setActivePath(this.selectionListModel.children[0]);
    this.selectionLists = this.generateSelectionLists();
    this.cdr.markForCheck();
  }

  /**
   * @function buildParentMap
   *
   * @description
   * Builds the parent map containing the child to parent relationships for the selection list.
   *
   * @param {SelectionList} selectionList - the current selection list being processed
   * @param {Map<string, string>} parentMap - the map to populate
   * @param {SelectionList} parent - the parent selection list of the current selection list
   */
  private buildParentMap(selectionList: SelectionList, parentMap: Map<string, string>, parent: SelectionList): void {
    if (!selectionList) {
      return;
    }

    if (parent) {
      parentMap.set(selectionList.id, parent.id);
    }

    if (selectionList.children) {
      for (const child of selectionList.children) {
        this.buildParentMap(child, parentMap, selectionList);
      }
    }
  }

  /**
   * @function buildSelectionMap
   *
   * @description
   * Builds the selection map containing the ID to `SelectionList` relationships for the selection list.
   *
   * @param {SelectionList} selectionList - the current selection list being processed
   * @param {Map<string, SelectionList>} selectionMap - the map to populate
   */
  private buildSelectionMap(selectionList: SelectionList, selectionMap: Map<string, SelectionList>): void {
    if (!selectionList) {
      return;
    }

    selectionMap.set(selectionList.id, selectionList);

    if (selectionList.children && selectionList.children.length > 0) {
      for (const child of selectionList.children) {
        this.buildSelectionMap(child, selectionMap);
      }
    }
  }

  /**
   * @function generateSelectionLists
   *
   * @description
   * Generates the selection lists from the current selection model.
   *
   * @returns {Array<SelectionList>} The array of selection lists
   */
  private generateSelectionLists(): Array<SelectionList> {
    const selectionLists: Array<SelectionList> = [];
    return this.traverseActivePath(this.selectionListModel, selectionLists);
  }

  /**
   * @function initSelectionLists
   *
   * @description
   * Initializes all selection list data.
   */
  private initSelectionLists(): void {
    this.parentMap.clear();
    this.selectionMap.clear();
    this.selectionListModel = structuredClone(this.selectionList());

    if (!this.selectionListModel) {
      this.selectionLists = [];
      return;
    }

    if (this.selectionListModel.children && this.selectionListModel.children.length > 0) {
      for (const child of this.selectionListModel.children) {
        this.buildParentMap(child, this.parentMap, null);
        this.buildSelectionMap(child, this.selectionMap);
      }
    }

    if (!this.multiple()) {
      // If single select, set any ancestors of the selected item to active
      const selectedId = this.selected()[0];
      let parentId = this.parentMap.get(selectedId);
      while (parentId) {
        const parentList = this.selectionMap.get(parentId);
        if (parentList) {
          parentList.active = true;
        }
        parentId = this.parentMap.get(parentId);
      }
    }

    this.selectionLists = this.generateSelectionLists();
  }

  /**
   * @function searchAllDimensions
   *
   * @description
   * Recursively searches all dimensions of the selection list to find matches for the provided `searchTerm`.
   *
   * @param {SelectionList} selectionList - the current selection list being processed
   * @param {string} searchTerm - the lower case, user-entered search term
   *
   * @returns {SelectionList | null} The matching selection list or `null` if no match is found
   */
  private searchAllDimensions(selectionList: SelectionList, searchTerm: string): SelectionList | null {
    if (!selectionList) {
      return null;
    }

    const currentSelectionListMatches = selectionList.title.toLocaleLowerCase().includes(searchTerm); // Search term is provided in lower case
    const filteredChildren: SelectionList[] = [];
    let hasMatchingDescendants = false;

    if (selectionList.children && selectionList.children.length > 0) {
      for (const child of selectionList.children) {
        const matchingChild = this.searchAllDimensions(child, searchTerm);
        if (matchingChild) {
          filteredChildren.push(matchingChild);
          hasMatchingDescendants = true;
        }
      }
    }

    if (currentSelectionListMatches || hasMatchingDescendants) {
      const result = structuredClone(selectionList);

      if (hasMatchingDescendants) {
        // Only include children if we have matching descendants
        result.children = filteredChildren;
      } else {
        // Current selection list matches but no matching children, delete children
        delete result.children;
      }

      return result;
    }

    return null;
  }

  /**
   * @function deactivatePath
   *
   * @description
   * Recursively deactivates the active path for the provided `list` and any active children.
   *
   * @param {SelectionList | undefined} selectionList - the list to deactivate
   */
  private deactivatePath(selectionList: SelectionList | undefined): void {
    if (!selectionList) {
      return;
    }

    if (selectionList.active) {
      selectionList.active = false;
    }

    const activeChild = selectionList.children?.find(child => child.active);

    if (activeChild) {
      this.deactivatePath(activeChild);
    }
  }

  /**
   * @function setActivePath
   *
   * @description
   * Recursively sets the active path for the provided `selectionList` and its first child with children.
   *
   * @param {SelectionList} selectionList - the current selection list being processed
   */
  private setActivePath(selectionList: SelectionList): void {
    selectionList.active = true;

    if (selectionList.children && selectionList.children.length > 0) {
      const selectionListWithChildren = selectionList.children.find(child => child.children?.length > 0);
      if (selectionListWithChildren) {
        this.setActivePath(selectionListWithChildren);
      }
    }
  }

  /**
   * @function traverseActivePath
   *
   * @description
   * Recursively traverses the active path of the provided `list` and its children, building the array of selection lists.
   *
   * @param {SelectionList | undefined} selectionList - the current selection list being processed
   * @param {Array<SelectionList>} activeLists - the array to append selection lists to
   *
   * @returns {Array<SelectionList>} The array of selection lists
   */
  private traverseActivePath(
    selectionList: SelectionList | undefined,
    activeLists: Array<SelectionList>
  ): Array<SelectionList> {
    if (!selectionList) {
      return [];
    }

    if (selectionList.active) {
      activeLists.push(selectionList);
    }

    const activeChild = selectionList.children?.find(child => child.active && child.children);

    if (activeChild) {
      return this.traverseActivePath(activeChild, activeLists);
    }

    return activeLists;
  }
}
