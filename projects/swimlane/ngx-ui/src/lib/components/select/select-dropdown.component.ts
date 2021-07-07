import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
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
import { debounceable } from '../../decorators/debounceable/debounceable.decorator';

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
  get tagging() {
    return this._tagging;
  }

  set tagging(tagging) {
    this._tagging = coerceBooleanProperty(tagging);
  }

  @Input()
  get allowAdditions() {
    return this._allowAdditions;
  }

  set allowAdditions(allowAdditions) {
    this._allowAdditions = coerceBooleanProperty(allowAdditions);
  }

  @Input()
  get filterable() {
    return this._filterable;
  }

  set filterable(filterable) {
    this._filterable = coerceBooleanProperty(filterable);
  }

  @Input()
  get filterCaseSensitive() {
    return this._filterCaseSensitive;
  }

  set filterCaseSensitive(filterCaseSensitive) {
    this._filterCaseSensitive = coerceBooleanProperty(filterCaseSensitive);
  }

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
  @Output() close = new EventEmitter<boolean | undefined>();

  @ViewChild('filterInput')
  readonly filterInput?: ElementRef<HTMLInputElement>;

  get element() {
    return this.elementRef.nativeElement;
  }

  get isNotTemplate() {
    return !(typeof this.allowAdditionsText === 'object' && this.allowAdditionsText instanceof TemplateRef);
  }

  groups: any[];
  filterQueryIsInOptions = false;

  private _options: SelectDropdownOption[];
  private _groupBy: string;
  private _filterQuery: string;
  private _focusIndex: number;
  private _tagging: boolean;
  private _allowAdditions: boolean;
  private _filterable: boolean;
  private _filterCaseSensitive = false;

  constructor(private readonly elementRef: ElementRef, private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.filterable && !this.tagging) {
      setTimeout(() => {
        this.filterInput.nativeElement.focus();
      }, 5);
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
  updatefilterQueryIsInOptions() {
    this.filterQueryIsInOptions = this.options.some(o => o.name.toLowerCase() === this.filterQuery.toLowerCase());
    this.cdr.markForCheck();
  }

  clearFilter(filterInput: HTMLInputElement) {
    filterInput.value = '';

    this.filterQuery = '';
    this.updatefilterQueryIsInOptions();
    this.cdr.markForCheck();
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

    this.updatefilterQueryIsInOptions();
    this.keyup.emit({ event, value });
  }

  onOptionKeyDown(event: KeyboardEvent, option?: SelectDropdownOption): void {
    event.preventDefault();
    event.stopPropagation();

    const key = event.key;

    if (key === (KeyboardKeys.ARROW_DOWN as any)) {
      if (this.focusIndex < this.options.length - 1) ++this.focusIndex;
    } else if (key === (KeyboardKeys.ARROW_UP as any)) {
      if (this.focusIndex > 0) --this.focusIndex;
    } else if (key === (KeyboardKeys.ENTER as any)) {
      this.selection.emit(option);
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
