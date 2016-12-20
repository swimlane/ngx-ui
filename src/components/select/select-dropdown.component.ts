import { 
  Component, Input, Output, EventEmitter, HostBinding, ViewChild, AfterViewInit 
} from '@angular/core';
import { KeyboardKeys } from '../../utils/keys';

@Component({
  selector: 'ngx-select-dropdown',
  template: `
    <div>
      <div class="ngx-select-filter" *ngIf="filterable">
        <input
          #filterInput
          type="text"
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
              (click)="change.emit(option)">
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

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('filterInput') filterInput: any;

  filterValue: string;
  groups: any[];
  _options: any[];
  _groupBy: string;

  ngAfterViewInit() {
    if(this.filterable) {
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
          return this.containsFilter(o, filter);
        });
      }

      return [{ options }];
    }

    let map = new Map();
    for(let option of options) {
      // only show items in filter criteria
      if(filter && !this.containsFilter(option, filter)) 
        continue;

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

  containsFilter(value, keyword): boolean {
    const type = typeof value;

    if (type === 'string') {
      if(!isNaN(value)) return value === keyword;
      return value.indexOf(keyword) > -1;
    } else if(type === 'object') {
      const keys = Object.keys(value);

      for(let k of keys) {
        if(this.containsFilter(value[k], keyword)) {
          return true;
        }
      }
    }
  }

  onKeyUp(event): void {
    const key = event.key;
    const value = event.target.value;

    if(key === KeyboardKeys.ESCAPE) {
      this.close.emit(true);
      return;
    }

    if(this.filterValue !== value) {
      this.groups = this.calculateGroups(this.groupBy, this.options, value);
      this.filterValue = value;
    }
  }

}
