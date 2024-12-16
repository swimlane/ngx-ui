import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { InViewportDirective } from 'ng-in-viewport';

import { debounceable } from '../../decorators/debounceable/debounceable.decorator';
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { containsFilter } from './contains-filter.util';
import { SelectDropdownOption } from './select-dropdown-option.interface';

@Component({
  exportAs: 'ngxSelectDropdown',
  selector: 'ngx-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  host: {
    class: 'ngx-select-dropdown',
    '[class.groupings]': 'groupBy'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDropdownComponent implements AfterViewInit {
  @Input() selected: any[];
  @Input() identifier: any;
  @Input() filterPlaceholder: string;
  @Input() filterEmptyPlaceholder: string;
  @Input() emptyPlaceholder: string;
  @Input() allowAdditionsText: string | TemplateRef<any> = 'Add Value';

  @Input()
  @CoerceBooleanProperty()
  tagging: boolean;

  @Input()
  @CoerceBooleanProperty()
  allowAdditions: boolean;

  @Input()
  @CoerceBooleanProperty()
  filterable: boolean;

  @Input()
  @CoerceBooleanProperty()
  filterCaseSensitive = false;

  @Input()
  @CoerceBooleanProperty()
  showSelectAll = false;

  @Input()
  get focusIndex() {
    return this._focusIndex;
  }
  set focusIndex(val: number) {
    this._focusIndex = coerceNumberProperty(val);
    this.focusElement(this._focusIndex);
  }

  @Input()
  get filterQuery() {
    return this._filterQuery;
  }
  set filterQuery(val: string) {
    this._filterQuery = val;
    this.groups = this.calculateGroups(this.groupBy, this.options, val);
  }

  @Input()
  get groupBy() {
    return this._groupBy;
  }
  set groupBy(val: string) {
    this._groupBy = val;
    this.groups = this.calculateGroups(val, this.options);
  }

  @Input() groupByTemplate: TemplateRef<unknown>;

  @Input()
  get options() {
    return this._options;
  }

  set options(val) {
    this.groups = this.calculateGroups(this.groupBy, val);
    this._options = val;
  }

  @Output() keyup = new EventEmitter<{ event: KeyboardEvent; value?: string }>();
  @Output() selection = new EventEmitter<SelectDropdownOption>();
  @Output() selectAll = new EventEmitter<void>();
  @Output() deselection = new EventEmitter<SelectDropdownOption>();
  @Output() keyboardSelection = new EventEmitter<SelectDropdownOption>();
  @Output() keyboardDeselection = new EventEmitter<SelectDropdownOption>();
  @Output() close = new EventEmitter<boolean | undefined>();
  @Output() clearQueryFilter = new EventEmitter<void>();

  @ViewChild('filterInput')
  readonly filterInput?: ElementRef<HTMLInputElement>;

  @ViewChild(InViewportDirective)
  readonly inViewport: InViewportDirective;

  get element() {
    return this.elementRef.nativeElement;
  }

  get isNotTemplate() {
    return !(typeof this.allowAdditionsText === 'object' && this.allowAdditionsText instanceof TemplateRef);
  }

  get hasAvailableOptions(): boolean {
    return this.groups.some(group => group.options.length > 0);
  }

  groups: any[];
  filterQueryIsInOptions = false;

  private _options: SelectDropdownOption[];
  private _groupBy: string;
  private _filterQuery: string;
  private _focusIndex: number;

  constructor(private readonly elementRef: ElementRef, private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.filterable && !this.tagging) {
      setTimeout(() => {
        this.filterInput.nativeElement.focus();
      }, 50);
    } else {
      // focusIndex has to be set to 0, because arrows won't work if it's set to -1.
      this.focusIndex = 0;
    }
  }

  isSelected(option: SelectDropdownOption): boolean {
    if (!this.selected || !this.selected.length) return false;

    const idx = this.selected.findIndex(o => {
      if (this.identifier) return o[this.identifier] === option.value[this.identifier];
      return o === option.value;
    });

    return idx > -1;
  }

  @debounceable(500)
  updateFilterQueryIsInOptions() {
    this.filterQueryIsInOptions = this.options.some(o => o.name.toLowerCase() === this.filterQuery.toLowerCase());
    this.cdr.markForCheck();
  }

  clearFilter(filterInput: HTMLInputElement) {
    filterInput.value = '';

    this.filterQuery = '';
    this.updateFilterQueryIsInOptions();
    this.cdr.markForCheck();
    this.clearQueryFilter.emit();
  }

  onInputKeyUp(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const key = event.key;
    const value = (event.target as any).value;

    if (key === (KeyboardKeys.ESCAPE as any)) {
      this.close.emit(true);
    } else if (event.key === (KeyboardKeys.ARROW_DOWN as any)) {
      ++this.focusIndex;
    }

    if (this.filterQuery !== value) {
      this.filterQuery = value;
    }

    this.updateFilterQueryIsInOptions();
    this.keyup.emit({ event, value });
  }

  onOptionClick(option: SelectDropdownOption) {
    if (this.isSelected(option)) {
      this.deselection.emit(option);
    } else {
      this.selection.emit(option);
    }
  }

  onOptionKeyDown(event: KeyboardEvent, option?: SelectDropdownOption): void {
    event.preventDefault();
    event.stopPropagation();

    switch (event.code) {
      case KeyboardKeys.ESCAPE:
        return this.close.emit(true);
      case KeyboardKeys.ARROW_DOWN:
        return this.focusNext();
      case KeyboardKeys.ARROW_UP:
        return this.focusPrev();
      case KeyboardKeys.ENTER:
        // Enter may trigger dropdown close
        return this.isSelected(option) ? this.deselection.emit(option) : this.selection.emit(option);
      case KeyboardKeys.SPACE:
        // Space does not trigger dropdown close
        return this.isSelected(option) ? this.keyboardDeselection.emit(option) : this.keyboardSelection.emit(option);
    }
  }

  focusNext() {
    const options = this.options;
    const len = options.length;
    if (this.focusIndex < len - 1) {
      for (let i = this.focusIndex + 1; i < len; i++) {
        if (!options[i].disabled && !options[i].hidden) {
          this.focusIndex = i;
          break;
        }
      }
    }
  }

  focusPrev() {
    const options = this.options;
    if (this.focusIndex > 0) {
      for (let i = this.focusIndex - 1; i >= 0; i--) {
        if (!options[i].disabled && !options[i].hidden) {
          this.focusIndex = i;
          break;
        }
      }
    }
  }

  onAddClicked(event: Event, value: any): void {
    event.preventDefault();
    event.stopPropagation();

    this.selection.emit({ value, name: value });
    (event.target as any).value = '';

    this.close.emit();
  }

  onShiftEnterKeyDown(event) {
    if (this.allowAdditions) {
      this.onAddClicked(event, this.filterQuery);
    }
  }

  //  When the filterable select input has focus, tab event opens the next popover if the next control is ngx-select.
  onTabKeyDown(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  focusOn(index: number): void {
    if (index < 0) index = this.options.length + index;
    this.focusIndex = index;
    this.cdr.markForCheck();
  }

  private focusElement(index: number): void {
    const elements = this.element.getElementsByClassName('ngx-select-dropdown-option');
    const element = elements[index];

    if (element) {
      setTimeout(() => element.focus(), 5);
    }
  }

  private calculateGroups(groupBy: string, options: any[], filter?: string): any[] {
    if (!options) return [];

    const filterOptions = { filterCaseSensitive: this.filterCaseSensitive };

    // no group by defined, skip and just return
    // empty group object...
    if (!groupBy) {
      if (filter) {
        // filter options
        options = options.filter(o => {
          return containsFilter({ name: o.name, value: o.value }, filter, filterOptions);
        });
      }

      // need to map indexes
      options = options.map((option, index) => {
        return { option, index };
      });

      return [{ options }];
    }

    const map = new Map();
    let i = 0;

    for (const option of options) {
      // only show items in filter criteria
      if (filter && !containsFilter({ name: option.name, value: option.value }, filter, filterOptions)) {
        continue;
      }

      const group = option.value[groupBy];
      const opt: any = map.get(group);

      // need to map the true indexes
      const kv = { option, index: i++ };

      if (!opt) {
        map.set(group, [kv]);
      } else {
        opt.push(kv);
      }
    }

    const result = [];
    map.forEach((value, key) => {
      result.push({ name: key, options: value });
    });

    return result;
  }
}
