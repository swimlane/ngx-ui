import {
  Component, Input, Output, EventEmitter, QueryList, ContentChildren, forwardRef,
  ElementRef, Renderer, OnDestroy, HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { SelectOptionDirective } from './select-option.directive';
import './select.scss';

let nextId = 0;

const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'ngx-select',
  providers: [SELECT_VALUE_ACCESSOR],
  template: `
    <div>
      <ngx-select-input
        [autofocus]="autofocus"
        [allowClear]="allowClear"
        [placeholder]="placeholder"
        [multiple]="multiple"
        [tagging]="tagging"
        [selected]="selected"
        (focus)="onFocus()">
      </ngx-select-input>
      <ngx-select-dropdown
        [selected]="selected"
        [groupBy]="groupBy"
        [trackBy]="trackBy"
        [options]="options"
        (select)="onSelect($event)">
      </ngx-select-dropdown>
    </div>
  `,
  host: {
    class: 'ngx-select'
  }
})
export class SelectComponent implements OnDestroy {

  @Input() id: string = `select-${++nextId}`;
  @Input() name: string;
  @Input() autofocus: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() closeOnSelect: boolean;
  @Input() closeOnBodyClick: boolean = true;
  @Input() placeholder: string = '';
  @Input() selected: any[] = [];
  @Input() options: any[] = [];
  @Input() trackBy: any;
  @Input() maxSelections: number;
  @Input() groupBy: string;

  @HostBinding('class.tagging')
  @Input() tagging: boolean = false;

  @HostBinding('class.multiple')
  @Input() multiple: boolean = false;

  @HostBinding('class.disabled')
  @Input() disabled: boolean = false;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  @ContentChildren(SelectOptionDirective)
  set optionTemplates(val: QueryList<SelectOptionDirective>) {
    this._optionTemplates = val;
    if(val) {
      const arr = val.toArray();
      if(arr.length) this.options = arr;
    }
  }

  get optionTemplates(): QueryList<SelectOptionDirective> {
    return this._optionTemplates;
  }

  @HostBinding('class.active')
  dropdownActive: boolean = false;

  toggleListener: any;
  _optionTemplates: QueryList<SelectOptionDirective>;

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnDestroy(): void {
    this.toggleDropdown(false);
  }

  onSelect(selection): void {
    if(selection.disabled) return;
    if(this.selected.length === this.maxSelections) return;

    const idx = this.selected.findIndex(o => {
      if(this.trackBy) return o.value[this.trackBy] === selection.value[this.trackBy];
      return o.value === selection.value;
    });

    if(idx === -1) {
      if(!this.multiple) {
        this.selected.splice(0, this.selected.length);
      }

      this.selected.push(selection);
    }

    const shouldClose = this.closeOnSelect || 
      (this.closeOnSelect === undefined && !this.multiple);
    if(shouldClose) {
      this.toggleDropdown(false);
    }
  }

  onFocus(): void {
    if(this.disabled) return;
    
    this.toggleDropdown(true);
  }

  onBodyClick(event): void {
    if(this.dropdownActive) {
      const contains = this.element.nativeElement.contains(event.target);
      if(!contains) this.toggleDropdown(false);
    }
  }

  toggleDropdown(state: boolean): void {
    this.dropdownActive = state;

    if(this.toggleListener) this.toggleListener();

    if(state && this.closeOnBodyClick) {
      this.toggleListener = this.renderer.listen(
        document.body, 'click', this.onBodyClick.bind(this));
    }
  }

}
