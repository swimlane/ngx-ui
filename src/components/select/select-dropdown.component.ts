import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'ngx-select-dropdown',
  template: `
    <div>
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
              (click)="onClick(option)">
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
          </ul>
        </li>
      </ul>
    </div>
  `,
  host: {
    class: 'ngx-select-dropdown'
  }
})
export class SelectDropdownComponent {

  @Input() selected: any[] = [];
  @Input() trackBy: any;

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

  @Output() select: EventEmitter<any> = new EventEmitter();

  groups: any = [];
  _options: any[] = [];
  _groupBy: string;

  onClick(option): void {
    this.select.emit(option);
  }

  isActive(option): boolean {
    const idx = this.selected.findIndex(o => {
      if(this.trackBy) return o.value[this.trackBy] === option.value[this.trackBy];
      return o.value === option.value;
    });

    return idx > -1;
  }

  calculateGroups(groupBy: string, options: any[]): any[] {
    if(!groupBy) {
      return [{ options }];
    }

    let map = new Map();

    for(let option of options) {
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

}
