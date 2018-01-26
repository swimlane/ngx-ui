import {
  Component, Input, Output, EventEmitter, QueryList, ContentChildren, forwardRef,
  ElementRef, Renderer, OnDestroy, HostBinding, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { SelectOptionDirective } from './select-option.directive';
import { SelectInputComponent } from './select-input.component';
import { KeyboardKeys } from '../../utils/keys';

let nextId = 0;

const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'ngx-select',
  providers: [SELECT_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./select.component.scss'],
  template: `
    <div class="ngx-select-wrap">
      <div class="ngx-select-flex-wrap">
        <div class="ngx-select-flex-wrap-inner">
          <ngx-select-input
            [autofocus]="autofocus"
            [options]="options"
            [allowClear]="allowClear"
            [label]="label"
            [placeholder]="placeholder"
            [multiple]="multiple"
            [identifier]="identifier"
            [tagging]="tagging"
            [allowAdditions]="allowAdditions"
            [selected]="value"
            [hint]="hint"
            [disableDropdown]="disableDropdown"
            (keyup)="onKeyUp($event)"
            (toggle)="onToggle()"
            (activate)="onFocus()"
            (selection)="onInputSelection($event)">
          </ngx-select-input>
        </div>
      </div>
      <ngx-select-dropdown
        *ngIf="dropdownVisible"
        [focusIndex]="focusIndex"
        [filterQuery]="filterQuery"
        [filterPlaceholder]="filterPlaceholder"
        [allowAdditions]="allowAdditions"
        [selected]="value"
        [groupBy]="groupBy"
        [emptyPlaceholder]="emptyPlaceholder"
        [tagging]="tagging"
        [filterEmptyPlaceholder]="filterEmptyPlaceholder"
        [filterable]="filterable"
        [identifier]="identifier"
        [options]="options"
        (keyup)="keyup.emit($event)"
        (close)="onClose()"
        (selection)="onDropdownSelection($event)">
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

  @Input() label: string;
  @Input() hint: string;
  @Input() autofocus: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() allowAdditions: boolean = false;
  @Input() disableDropdown: boolean = false;
  @Input() closeOnSelect: boolean;
  @Input() closeOnBodyClick: boolean = true;
  @Input() options: any[] = [];
  @Input() identifier: any;
  @Input() maxSelections: number;
  @Input() groupBy: string;
  @Input() filterable: boolean = true;

  @Input() placeholder: string = '';
  @Input() emptyPlaceholder: string = 'No options available';
  
  @Input() filterEmptyPlaceholder: string = 'No matches...';
  @Input() filterPlaceholder: string = 'Filter options...';

  @HostBinding('class.tagging-selection')
  @Input() tagging: boolean = false;

  @HostBinding('class.multi-selection')
  @Input() multiple: boolean = false;

  @HostBinding('class.single-selection')
  get isSingleSelect(): boolean { 
    return !this.multiple && !this.tagging; 
  }

  @HostBinding('class.disabled')
  @Input() disabled: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() keyup: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

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

  @HostBinding('class.active-selections')
  get hasSelections(): any {
    return this.value && this.value.length > 0 && typeof this.value[0] !== 'undefined';
  }

  @HostBinding('class.has-placeholder')
  get hasPlaceholder(): any {
    return this.placeholder && this.placeholder.length;
  }

  @ViewChild(SelectInputComponent) inputComponent: SelectInputComponent;

  get value(): any[] { return this._value; }

  set value(val: any[]) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.change.emit(this._value);
    }
  }

  get dropdownVisible(): boolean {
    if (this.disableDropdown) return false;
    if(this.tagging && (!this.options || !this.options.length)) return false;
    return this.dropdownActive;
  }

  toggleListener: any;
  filterQuery: string;
  focusIndex: number = -1;
  
  _optionTemplates: QueryList<SelectOptionDirective>;
  _value: any[] = [];

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnDestroy(): void {
    this.toggleDropdown(false);
  }

  onDropdownSelection(selection): void {
    if(selection.disabled) return;
    if(this.value.length === this.maxSelections) return;

    const idx = this.value.findIndex(o => {
      if(this.identifier) {
        return o[this.identifier] === selection.value[this.identifier];
      }
      
      return o === selection.value;
    });

    if(idx === -1) {
      this.value = (this.multiple || this.tagging) ?
        [ ...this.value, selection.value ] :
        [selection.value];
    }

    // if tagging, we need to clear current text
    if(this.tagging) {
      this.inputComponent.inputElement.nativeElement.value = '';
    }

    const shouldClose = this.closeOnSelect || 
      (this.closeOnSelect === undefined && !this.multiple);

    if(shouldClose) {
      this.toggleDropdown(false);
    }
  }

  onInputSelection(selections): void {
    this.value = selections;
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

  onClose(): void {
    this.toggleDropdown(false);
  }

  onToggle(): void {
    if(this.disabled) return;
    this.toggleDropdown(!this.dropdownActive);
    this.onTouchedCallback();
  }

  toggleDropdown(state: boolean): void {
    if (this.dropdownActive === state) return;
    this.dropdownActive = state;

    if(this.toggleListener) this.toggleListener();
    this.toggle.emit(this.dropdownActive);

    if(state && this.closeOnBodyClick) {
      this.toggleListener = this.renderer.listen(
        document.body, 'click', this.onBodyClick.bind(this));
    }
  }

  onKeyUp({ event, value }): void {
    if(event && event.key === KeyboardKeys.ARROW_DOWN) {
      ++this.focusIndex;
    } else {
      this.filterQuery = value;
    }

    this.keyup.emit({ event, value });
  }

  writeValue(val: any[]): void {
    if (val !== this._value) {
      this._value = val;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  }

}
