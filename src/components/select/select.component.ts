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
        [selected]="selected"
        (focus)="onFocus()">
      </ngx-select-input>
      <ngx-select-dropdown
        [selected]="selected"
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
  @Input() multiple: boolean = false;
  @Input() tagging: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() closeOnSelect: boolean = false;
  @Input() closeOnBodyClick: boolean = true;
  @Input() placeholder: string = '';
  @Input() selected: any[] = [];
  @Input() options: any[] = [];
  @Input() trackBy: any;

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

  constructor(private element: ElementRef, private renderer: Renderer) {
  }

  ngOnDestroy(): void {
    this.toggleDropdown(false);
  }

  onSelect(selection): void {
    const idx = this.selected.findIndex(o => {
      if(this.trackBy) return o[this.trackBy] === selection[this.trackBy];
      return o.value === selection.value;
    });

    if(idx === -1) {
      this.selected.push(selection);
    }

    if(this.closeOnSelect) {
      this.toggleDropdown(false);
    }
  }

  onFocus(): void {
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
