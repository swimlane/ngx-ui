import { 
  Component, Input, Output, EventEmitter, HostBinding, ViewChild, AfterViewInit 
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
          (keyup)="onKeyUp($event)"
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
              *ngFor="let option of group.options" 
              class="ngx-select-dropdown-option"
              [class.disabled]="option.disabled"
              [class.active]="isActive(option)"
              tabindex="-1" 
              (click)="selection.emit(option)">
              <template
                *ngIf="option.optionTemplate"
                [ngTemplateOutlet]="option.optionTemplate"
                [ngOutletContext]="{ option: option }">
              </template>
              <span
                *ngIf="!option.optionTemplate"
                [innerHTML]="option.name">
              </span>
            </li>
            <li 
              *ngIf="filterValue && filterEmptyPlaceholder && !group.options?.length"
              class="ngx-select-empty-placeholder"
              [innerHTML]="filterEmptyPlaceholder">
            </li>
            <li 
              *ngIf="!filterValue && emptyPlaceholder && !group.options?.length"
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
  _options: any[];
  _groupBy: string;
  _filterQuery: string;

  ngAfterViewInit(): void {
    if(this.filterable && !this.tagging) {
      setTimeout(() => {
        this.filterInput.nativeElement.focus();
      }, 5);
    }
  }

  isActive(option): boolean {
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

      return [{ options }];
    }

    let map = new Map();
    for(let option of options) {
      // only show items in filter criteria
      if(filter && !containsFilter(option, filter)) {
        continue;
      }

      let group = option.value[groupBy];
      let opt: any = map.get(group);

      if(!opt) {
        map.set(group, [ option ]);
      } else {
        opt.push(option);
      }
    }

    let result = [];
    map.forEach(function(value, key) {
      result.push({ name: key, options: value });
    });

    return result;
  }

  onKeyUp(event): void {
    event.preventDefault();
    event.stopPropagation();

    const key = event.key;
    const value = event.target.value;

    if(key === KeyboardKeys.ESCAPE) {
      this.close.emit(true);
      return;
    }

    if(this.filterQuery !== value) {
      this.filterQuery = value;
    }

    this.keyup.emit(value);
  }

}
