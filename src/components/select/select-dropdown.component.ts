import { 
  Component, Input, Output, EventEmitter, HostBinding, ViewChild, AfterViewInit, ElementRef
} from '@angular/core';
import { KeyboardKeys } from '../../utils/keys';
import { containsFilter } from './select-helper';

@Component({
  selector: 'ngx-select-dropdown',
  template: `
    <div>
      <div class="ngx-select-filter" *ngIf="filterable && !tagging">
        <input
          #filterInput
          type="search"
          tabindex=""
          autocomplete="off" 
          autocorrect="off"
          spellcheck="off"
          class="ngx-select-filter-input"
          [placeholder]="filterPlaceholder"
          (keyup)="onInputKeyUp($event)"
        />
      </div>
      <ul class="vertical-list ngx-select-dropdown-options">
        <li *ngFor="let group of groups" class="ngx-select-option-group">
          <span 
            class="ngx-select-option-group-name" 
            *ngIf="group.name" 
            [innerHTML]="group.name">
          </span>
          <ul class="vertical-list ngx-select-dropdown-options">
            <li 
              *ngFor="let kv of group.options" 
              class="ngx-select-dropdown-option"
              [class.disabled]="kv.option.disabled"
              [class.active]="kv.index === focusIndex"
              [class.selected]="isSelected(kv.option)"
              tabindex="-1" 
              (click)="selection.emit(kv.option)"
              (keydown)="onOptionKeyDown($event)">
              <ng-template
                *ngIf="kv.option.optionTemplate"
                [ngTemplateOutlet]="kv.option.optionTemplate"
                [ngTemplateOutletContext]="{ option: kv.option }">
              </ng-template>
              <span
                *ngIf="!kv.option.optionTemplate"
                [innerHTML]="kv.option.name">
              </span>
            </li>
            <li 
              *ngIf="filterQuery && filterEmptyPlaceholder && !group.options?.length"
              class="ngx-select-empty-placeholder">
              <span 
                class="ngx-select-empty-placeholder-text"
                [innerHTML]="filterEmptyPlaceholder">
              </span>
              <a 
                *ngIf="allowAdditions"
                href="#"
                class="ngx-select-empty-placeholder-add"
                (click)="onAddClicked($event, filterQuery)">
                Add Value
              </a>
            </li>
            <li 
              *ngIf="!filterQuery && emptyPlaceholder && !group.options?.length"
              class="ngx-select-empty-placeholder"
              [innerHTML]="emptyPlaceholder">
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  host: {
    class: 'ngx-select-dropdown'
  }
})
export class SelectDropdownComponent implements AfterViewInit {

  @Input() selected: any[];
  @Input() identifier: any;
  @Input() filterable: boolean;
  @Input() filterPlaceholder: string;
  @Input() filterEmptyPlaceholder: string;
  @Input() emptyPlaceholder: string;
  @Input() tagging: boolean;
  @Input() allowAdditions: boolean;

  @Input() 
  set focusIndex(val: number) {
    this._focusIndex = val;
    this.focusElement(val);
  }

  get focusIndex(): number {
    return this._focusIndex;
  }

  @Input() 
  set filterQuery(val: string) {
    this._filterQuery = val;
    this.groups = this.calculateGroups(this.groupBy, this.options, val);
  }

  get filterQuery(): string {
    return this._filterQuery;
  }

  @HostBinding('class.groupings')
  @Input() 
  set groupBy(val: string) {
    this._groupBy = val;
    this.groups = this.calculateGroups(val, this.options);
  }

  get groupBy(): string {
    return this._groupBy;
  }

  @Input() 
  set options(val: any[]) {
    this.groups = this.calculateGroups(this.groupBy, val);
    this._options = val;
  }

  get options(): any[] {
    return this._options;
  }

  @Output() keyup: EventEmitter<any> = new EventEmitter();
  @Output() selection: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('filterInput') filterInput: any;

  groups: any[];
  element: any;
  _options: any[];
  _groupBy: string;
  _filterQuery: string;
  _focusIndex: number;

  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if(this.filterable && !this.tagging) {
      setTimeout(() => {
        this.filterInput.nativeElement.focus();
      }, 5);
    }
  }

  isSelected(option): boolean {
    if(!this.selected || !this.selected.length) return false;

    const idx = this.selected.findIndex(o => {
      if(this.identifier) return o[this.identifier] === option.value[this.identifier];
      return o === option.value;
    });

    return idx > -1;
  }

  calculateGroups(groupBy: string, options: any[], filter?: string): any[] {
    if(!options) return [];

    // no group by defined, skip and just return
    // emptry group object...
    if(!groupBy) {
      if(filter) {
        // filter options
        options = options.filter(o => {
          return containsFilter(o, filter);
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

    for(const option of options) {
      // only show items in filter criteria
      if(filter && !containsFilter(option, filter)) {
        continue;
      }

      const group = option.value[groupBy];
      const opt: any = map.get(group);

      // need to map the true indexes
      const kv = { option, index: i++ };

      if(!opt) {
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

  onInputKeyUp(event): void {
    event.preventDefault();
    event.stopPropagation();

    const key = event.key;
    const value = event.target.value;

    if(key === KeyboardKeys.ESCAPE) {
      this.close.emit(true);
    } else if(event.key === KeyboardKeys.ARROW_DOWN) {
      ++this.focusIndex;
    }
    
    if(this.filterQuery !== value) {
      this.filterQuery = value;
    }

    this.keyup.emit({ event, value });
  }

  onOptionKeyDown(event): void {
    event.preventDefault();
    event.stopPropagation();

    const key = event.key;
    if(key === KeyboardKeys.ARROW_DOWN) {
      if(this.focusIndex < (this.options.length - 1)) ++this.focusIndex;
    } else if(key === KeyboardKeys.ARROW_UP) {
      if(this.focusIndex > 0) --this.focusIndex;
    } else if(key === KeyboardKeys.ENTER) {
      this.selection.emit(this.options[this.focusIndex]);
    }
  }

  focusElement(index: number): void {
    const elements = this.element.getElementsByClassName('ngx-select-dropdown-option');
    const element = elements[index];
    
    if(element) {
      setTimeout(() => element.focus(), 5);
    }
  }

  onAddClicked(event, value): void {
    event.preventDefault();
    event.stopPropagation();

    this.selection.emit({ value, name: value });
    event.target.value = '';

    this.close.emit();
  }

}
