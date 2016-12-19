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
        [options]="options"
        [allowClear]="allowClear"
        [placeholder]="placeholder"
        [multiple]="multiple"
        [trackBy]="trackBy"
        [tagging]="tagging"
        [selected]="value"
        (focus)="onFocus()"
        (clear)="onClear()">
      </ngx-select-input>
      <ngx-select-dropdown
        [selected]="value"
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
export class SelectComponent implements ControlValueAccessor, OnDestroy  {

  @HostBinding('id')
  @Input() id: string = `select-${++nextId}`;

  @HostBinding('attr.name')
  @Input() name: string;

  @Input() autofocus: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() closeOnSelect: boolean;
  @Input() closeOnBodyClick: boolean = true;
  @Input() placeholder: string = '';
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

  @Output() change: EventEmitter<any> = new EventEmitter();

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

  get value() { return this._value; }

  set value(val: any) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.change.emit(this._value);
    }
  }

  toggleListener: any;
  _optionTemplates: QueryList<SelectOptionDirective>;
  _value: any[] = [];

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnDestroy(): void {
    this.toggleDropdown(false);
  }

  onSelect(selection): void {
    if(selection.disabled) return;
    if(this.value.length === this.maxSelections) return;

    const idx = this.value.findIndex(o => {
      if(this.trackBy) return o[this.trackBy] === selection.value[this.trackBy];
      return o === selection.value;
    });

    if(idx === -1) {
      if(this.multiple) {
        this.value = [ ...this.value, selection.value ];
      } else {
        this.value = [selection.value];
      }
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
    this.onTouchedCallback();
  }

  onClear(): void {
    this.value = [];
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

  writeValue(val: any[]): void {
    if (val !== this._value) {
      this._value = val;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  }

}
