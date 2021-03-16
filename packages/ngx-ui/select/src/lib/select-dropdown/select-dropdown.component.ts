import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Debounceable } from '@swimlane/ngx-ui/decorators/debounceable';
import { KeyboardKeys } from '@swimlane/ngx-ui/types';
import { timer } from 'rxjs';
import type { SelectDropdownOption } from '../models';
import { containsFilter } from '../utils';

@Component({
  selector: 'ngx-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDropdownComponent implements AfterViewInit {
  @Input()
  get focusIndex() {
    return this._focusIndex;
  }

  set focusIndex(val: number) {
    this._focusIndex = coerceNumberProperty(val);
    this.focusElement(this._focusIndex);
  }

  private _focusIndex!: number;

  @Input()
  get filterQuery(): string | undefined {
    return this._filterQuery;
  }

  set filterQuery(val: string | undefined) {
    this._filterQuery = val;
    this.groups = this.calculateGroups(this.groupBy, this.options, val);
  }

  private _filterQuery?: string;

  @Input() identifier?: string;
  @Input() emptyPlaceholder!: string;
  @Input() filterEmptyPlaceholder!: string;
  @Input() filterPlaceholder!: string;
  @Input() allowAdditionsText!: string | TemplateRef<unknown>;

  @Input() filterCaseSensitive!: boolean;
  @Input() allowAdditions!: boolean;
  @Input() tagging!: boolean;
  @Input() filterable!: boolean;

  @Input()
  get options() {
    return this._options;
  }

  set options(val) {
    this.groups = this.calculateGroups(this.groupBy, val);
    this._options = val;
  }

  private _options!: SelectDropdownOption[];

  @Input() selected?: unknown[];

  @HostBinding('class.groupings')
  @Input()
  get groupBy(): string | undefined {
    return this._groupBy;
  }

  set groupBy(val: string | undefined) {
    this._groupBy = val;
    this.groups = this.calculateGroups(val, this.options);
  }

  private _groupBy?: string;
  groups: unknown[] = [];

  /**
   * Custom Template for groupBy
   * Only works with groupBy on
   *
   * TemplateContext:
   * - groupName: the name of the group (`option.value[this.groupBy]` is the value)
   * - index, first, last, odd, even (ngFor properties)
   */
  @Input() groupByTemplate?: TemplateRef<unknown>;

  @Output() keyup = new EventEmitter<{
    event: KeyboardEvent;
    value?: string;
  }>();
  @Output() selection = new EventEmitter<SelectDropdownOption>();
  @Output() close = new EventEmitter<boolean | undefined>();

  @ViewChild('filterInput')
  readonly filterInput?: ElementRef<HTMLInputElement>;

  get element() {
    return this.elementRef.nativeElement;
  }

  get isNotTemplate(): boolean {
    return !(
      typeof this.allowAdditionsText === 'object' &&
      this.allowAdditionsText instanceof TemplateRef
    );
  }

  filterQueryIsInOptions = false;

  @HostBinding('class.ngx-select-dropdown') hostClass = true;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.filterable && !this.tagging) {
      timer(5).subscribe(() => {
        this.filterInput?.nativeElement.focus();
      });
    }
  }

  isSelected(option: SelectDropdownOption): boolean {
    if (!this.selected || !this.selected.length) return false;

    const idx = this.selected.findIndex((o) => {
      if (this.identifier)
        return (
          (o as Record<string, unknown>)[this.identifier] ===
          (option.value as Record<string, unknown>)[this.identifier]
        );
      return o === option.value;
    });

    return idx > -1;
  }

  @Debounceable(500)
  updateFilterQueryIsInOptions() {
    this.filterQueryIsInOptions = this.options.some(
      (o) => o.name.toLowerCase() === this.filterQuery!.toLowerCase()
    );
    this.cdr.markForCheck();
  }

  clearFilter(filterInput: HTMLInputElement) {
    filterInput.value = '';

    this.filterQuery = '';
    this.updateFilterQueryIsInOptions();
    this.cdr.markForCheck();
  }

  onInputKeyUp(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const key = event.key;
    const value = (event.target as any).value;

    if (key === KeyboardKeys.ESCAPE) {
      this.close.emit(true);
    } else if (event.key === KeyboardKeys.ARROW_DOWN) {
      ++this.focusIndex;
    }

    if (this.filterQuery !== value) {
      this.filterQuery = value;
    }

    this.updateFilterQueryIsInOptions();
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

  onAddClicked(event: MouseEvent, value: string): void {
    event.preventDefault();
    event.stopPropagation();

    this.selection.emit({ value, name: value });
    if (this.filterInput) {
      this.filterInput.nativeElement.value = '';
    }

    this.close.emit();
  }

  private focusElement(index: number): void {
    const elements = this.element.getElementsByClassName(
      'ngx-select-dropdown-option'
    );
    const element = elements[index];

    if (element) {
      timer(5).subscribe(() => {
        element.focus();
      });
    }
  }

  private calculateGroups(
    groupBy: string | undefined,
    options: unknown[],
    filter?: string
  ): any[] {
    if (!options || !groupBy) return [];

    const filterOptions = { filterCaseSensitive: this.filterCaseSensitive };

    // no group by defined, skip and just return
    // empty group object...
    if (!groupBy) {
      if (filter) {
        // filter options
        options = options.filter((o) => {
          return containsFilter(
            {
              name: (o as { name: string; value: unknown }).name,
              value: (o as { name: string; value: unknown }).value,
            },
            filter,
            filterOptions
          );
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
      if (
        filter &&
        !containsFilter(
          {
            name: (option as { name: string; value: unknown }).name,
            value: (option as { name: string; value: unknown }).value,
          },
          filter,
          filterOptions
        )
      ) {
        continue;
      }

      const group = ((option as { name: string; value: unknown })
        .value as Record<string, unknown>)[groupBy];
      const opt = map.get(group);

      // need to map the true indexes
      const kv = { option, index: i++ };

      if (!opt) {
        map.set(group, [kv]);
      } else {
        opt.push(kv);
      }
    }

    const result: { name: string; options: unknown[] }[] = [];
    map.forEach((value, key) => {
      result.push({ name: key, options: value });
    });

    return result;
  }
}

/**
 * [focusIndex]="focusIndex"
 [filterQuery]="filterQuery"
 [filterPlaceholder]="filterPlaceholder"
 [filterCaseSensitive]="filterCaseSensitive"
 [allowAdditions]="allowAdditions"
 [allowAdditionsText]="allowAdditionsText"
 [selected]="value"
 [groupBy]="groupBy"
 [groupByTemplate]="groupByTemplate"
 [emptyPlaceholder]="emptyPlaceholder"
 [tagging]="tagging"
 [filterEmptyPlaceholder]="filterEmptyPlaceholder"
 [filterable]="filterable"
 [identifier]="identifier"
 [options]="options"
 (keyup)="keyup.emit($event)"
 (close)="onClose()"
 (selection)="onDropdownSelection($event)"
 */
