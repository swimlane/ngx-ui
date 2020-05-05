import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  forwardRef,
  ElementRef,
  Renderer2,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { SelectOptionDirective } from './select-option.directive';
import { SelectInputComponent } from './select-input.component';
import { SelectDropdownOption } from './select-dropdown-option.interface';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';

let nextId = 0;

const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  exportAs: 'ngxSelect',
  selector: 'ngx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    class: 'ngx-select',
    '[id]': 'id',
    '[attr.name]': 'name',
    '[class.invalid]': 'invalid && touched',
    '[class.tagging-selection]': 'tagging',
    '[class.multi-selection]': 'multiple',
    '[class.single-selection]': 'isSingleSelect',
    '[class.disabled]': 'disabled',
    '[class.active]': 'dropdownActive',
    '[class.active-selections]': 'hasSelections',
    '[class.has-placeholder]': 'hasPlaceholder'
  },
  providers: [SELECT_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  @Input() id: string = `select-${++nextId}`;
  @Input() name: string;
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string = '';
  @Input() emptyPlaceholder: string = 'No options available';
  @Input() filterEmptyPlaceholder: string = 'No matches...';
  @Input() filterPlaceholder: string = 'Filter options...';
  @Input() allowAdditionsText: string = 'Add Value';
  @Input() groupBy: string;
  @Input() selectCaret: string;
  @Input() requiredIndicator: string | boolean = '*';

  @Input() options: SelectDropdownOption[] = [];
  @Input() identifier: string;

  @Input()
  get minSelections() {
    return this._minSelections;
  }
  set minSelections(minSelections) {
    this._minSelections = coerceNumberProperty(minSelections);
  }

  @Input()
  get maxSelections() {
    return this._maxSelections;
  }
  set maxSelections(maxSelections) {
    this._maxSelections = coerceNumberProperty(maxSelections);
  }

  @Input()
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(autofocus) {
    this._autofocus = coerceBooleanProperty(autofocus);
  }

  @Input()
  get allowClear() {
    return this._allowClear;
  }
  set allowClear(allowClear) {
    this._allowClear = coerceBooleanProperty(allowClear);
  }

  @Input()
  get allowAdditions() {
    return this._allowAdditions;
  }
  set allowAdditions(allowAdditions) {
    this._allowAdditions = coerceBooleanProperty(allowAdditions);
  }

  @Input()
  get disableDropdown() {
    return this._disableDropdown;
  }
  set disableDropdown(disableDropdown) {
    this._disableDropdown = coerceBooleanProperty(disableDropdown);
  }

  @Input()
  get closeOnSelect() {
    return this._closeOnSelect;
  }
  set closeOnSelect(closeOnSelect) {
    this._closeOnSelect = coerceBooleanProperty(closeOnSelect);
  }

  @Input()
  get closeOnBodyClick() {
    return this._closeOnBodyClick;
  }
  set closeOnBodyClick(closeOnBodyClick) {
    this._closeOnBodyClick = coerceBooleanProperty(closeOnBodyClick);
  }

  @Input()
  get filterable() {
    return this._filterable;
  }
  set filterable(filterable) {
    this._filterable = coerceBooleanProperty(filterable);
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(required) {
    this._required = coerceBooleanProperty(required);
  }

  @Input()
  get filterCaseSensitive() {
    return this._filterCaseSensitive;
  }
  set filterCaseSensitive(filterCaseSensitive) {
    this._filterCaseSensitive = coerceBooleanProperty(filterCaseSensitive);
  }

  @Input()
  get tagging() {
    return this._tagging;
  }
  set tagging(tagging) {
    this._tagging = coerceBooleanProperty(tagging);
  }

  @Input()
  get multiple() {
    return this._multiple;
  }
  set multiple(multiple) {
    this._multiple = coerceBooleanProperty(multiple);
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Output() change = new EventEmitter<any[]>();
  @Output() keyup = new EventEmitter<{ event: KeyboardEvent; value?: string }>();
  @Output() toggle = new EventEmitter<boolean>();

  @ViewChild(SelectInputComponent, { static: true })
  readonly inputComponent: SelectInputComponent;

  @ContentChildren(SelectOptionDirective)
  get optionTemplates() {
    return this._optionTemplates;
  }
  set optionTemplates(val: QueryList<SelectOptionDirective>) {
    this._optionTemplates = val;

    if (val) {
      const arr = val.toArray();

      if (arr.length) {
        this.options = arr;
      }
    }

    this._cdr.markForCheck();
  }

  get invalid() {
    if (this.required && this.checkInvalidValue(this.value)) return true;
    if (this.maxSelections !== undefined && this.value && this.value.length > this.maxSelections) return true;
    if (this.minSelections !== undefined && (!this.value || this.value.length < this.minSelections)) return true;
    return false;
  }

  get requiredIndicatorView() {
    const required = this.required || (this.minSelections !== undefined && this.minSelections > 0);

    if (!this.requiredIndicator || !required) {
      return '';
    }

    return this.requiredIndicator as string;
  }

  get isSingleSelect() {
    return !this.multiple && !this.tagging;
  }

  get hasSelections() {
    return this.value && this.value.length > 0 && typeof this.value[0] !== 'undefined';
  }

  get hasPlaceholder() {
    return this.placeholder && this.placeholder.length > 0;
  }

  get value() {
    return this._value;
  }
  set value(val: any[]) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.change.emit(this._value);
      this._cdr.markForCheck();
    }
  }

  get dropdownVisible() {
    if (this.disableDropdown) return false;
    if (this.tagging && (!this.options || !this.options.length)) return false;
    return this.dropdownActive;
  }

  toggleListener?: () => void;
  filterQuery: string;
  focusIndex: number = -1;
  dropdownActive: boolean = false;
  touched: boolean = false;

  private _optionTemplates: QueryList<SelectOptionDirective>;
  private _value: any[] = [];

  private _minSelections?: number;
  private _maxSelections?: number;

  private _autofocus: boolean = false;
  private _allowClear: boolean = true;
  private _allowAdditions: boolean = false;
  private _disableDropdown: boolean = false;
  private _closeOnSelect: boolean;
  private _closeOnBodyClick: boolean = true;
  private _filterable: boolean = true;
  private _required: boolean;
  private _filterCaseSensitive = false;
  private _tagging: boolean = false;
  private _multiple: boolean = false;
  private _disabled: boolean = false;

  constructor(
    private readonly _element: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.toggleDropdown(false);
  }

  onDropdownSelection(selection: SelectDropdownOption): void {
    if (selection.disabled) return;
    if (this.value.length === this.maxSelections) return;

    const idx = this.value.findIndex(o => {
      if (this.identifier) {
        return o[this.identifier] === selection.value[this.identifier];
      }

      return o === selection.value;
    });

    if (idx === -1) {
      this.value = this.multiple || this.tagging ? [...this.value, selection.value] : [selection.value];
    }

    // if tagging, we need to clear current text
    if (this.tagging) {
      this.inputComponent.inputElement.nativeElement.value = '';
    }

    const shouldClose = this.closeOnSelect || !this.multiple;

    if (shouldClose) {
      this.toggleDropdown(false);
    }
  }

  onInputSelection(selections: any[]): void {
    this.value = selections;
  }

  onFocus(): void {
    if (this.disabled) return;

    this.toggleDropdown(true);
    this.onTouchedCallback();
  }

  onClear(): void {
    this.value = [];
  }

  onBodyClick(event: Event): void {
    if (this.dropdownActive) {
      const contains = this._element.nativeElement.contains(event.target);

      /* istanbul ignore else */
      if (!contains) {
        this.toggleDropdown(false);
      }
    }
  }

  onClose(): void {
    this.toggleDropdown(false);
  }

  onToggle(): void {
    if (this.disabled) return;

    this.toggleDropdown(!this.dropdownActive);
    this.onTouchedCallback();
  }

  toggleDropdown(state: boolean): void {
    if (this.dropdownActive === state) return;

    this.dropdownActive = state;

    if (this.toggleListener) this.toggleListener();
    this.toggle.emit(this.dropdownActive);

    if (state && this.closeOnBodyClick) {
      this.toggleListener = this._renderer.listen(document.body, 'click', this.onBodyClick.bind(this));
    }

    this._cdr.markForCheck();
  }

  onKeyUp({ event, value }: { event: KeyboardEvent; value?: string }): void {
    if (event && event.key === (KeyboardKeys.ARROW_DOWN as any) && this.focusIndex < this.options.length) {
      ++this.focusIndex;
    } else {
      this.filterQuery = value;
    }

    this.keyup.emit({ event, value });
  }

  writeValue(val: any[]): void {
    /* istanbul ignore else */
    if (val !== this._value) {
      this._value = val;
      this._cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = () => {
      this.touched = true;
      fn();
    };
  }

  private checkInvalidValue(value: any): boolean {
    if (Array.isArray(value)) {
      return !this.value.length || this.checkInvalidValue(value[0]);
    }

    return value === undefined;
  }

  /* istanbul ignore next */
  private onChangeCallback(_: any): void {
    // placeholder
  }

  /* istanbul ignore next */
  private onTouchedCallback(): void {
    this.touched = true;
  }
}
