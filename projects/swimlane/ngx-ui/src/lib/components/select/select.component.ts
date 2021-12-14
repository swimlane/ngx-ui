import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Appearance } from '../../mixins/appearance/appearance.enum';
import { InViewportMetadata } from 'ng-in-viewport';
import { take } from 'rxjs/operators';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { sizeMixin } from '../../mixins/size/size.mixin';
import { SelectDropdownOption } from './select-dropdown-option.interface';
import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectInputComponent } from './select-input.component';

import { SelectOptionDirective } from './select-option.directive';

let nextId = 0;

const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

class InputBase {}

const _InputMixinBase = sizeMixin(InputBase);

@Component({
  exportAs: 'ngxSelect',
  selector: 'ngx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    class: 'ngx-select',
    '[id]': 'id',
    '[attr.name]': 'name',
    '[class.legacy]': 'appearance === "legacy"',
    '[class.fill]': 'appearance === "fill"',
    '[class.sm]': 'size === "sm"',
    '[class.md]': 'size === "md"',
    '[class.lg]': 'size === "lg"',
    '[class.invalid]': 'invalid && touched',
    '[class.tagging-selection]': 'tagging',
    '[class.multi-selection]': 'multiple',
    '[class.single-selection]': 'isSingleSelect',
    '[class.disabled]': 'disabled',
    '[class.active]': 'dropdownActive',
    '[class.active-selections]': 'hasSelections',
    '[class.has-placeholder]': 'hasPlaceholder',
    '[class.autosize]': 'autosize',
    '[style.min-width]': 'autosize ? autosizeMinWidth : undefined',
    '[attr.aria-expanded]': 'dropdownActive'
  },
  providers: [SELECT_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends _InputMixinBase implements ControlValueAccessor, OnDestroy {
  @Input() id = `select-${++nextId}`;
  @Input() name: string;
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder = '';
  @Input() emptyPlaceholder = 'No options available';
  @Input() filterEmptyPlaceholder = 'No matches...';
  @Input() filterPlaceholder = 'Filter options...';
  @Input() forceDownwardOpening = false;
  @Input() allowAdditionsText = 'Add Value';
  @Input() groupBy: string;
  @Input() selectCaret: string;
  @Input() requiredIndicator: string | boolean = '*';

  @Input() options: SelectDropdownOption[] = [];
  @Input() identifier: string;
  @Input() appearance = Appearance.Legacy;

  @Input()
  get minSelections() {
    return this._minSelections;
  }

  set minSelections(minSelections) {
    this._minSelections = coerceNumberProperty(minSelections, undefined);
  }

  @Input()
  get autosizeMinWidth(): number | string {
    return this._autosizeMinWidth;
  }
  set autosizeMinWidth(autosizeMinWidth) {
    if (!isNaN(+autosizeMinWidth)) {
      this._autosizeMinWidth = `${autosizeMinWidth}px`;
    } else if (typeof autosizeMinWidth === 'string') {
      this._autosizeMinWidth = autosizeMinWidth;
    }
  }

  @Input()
  get maxSelections() {
    return this._maxSelections;
  }

  set maxSelections(maxSelections) {
    this._maxSelections = coerceNumberProperty(maxSelections, undefined);
  }

  @Input()
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(autofocus) {
    this._autofocus = coerceBooleanProperty(autofocus);
  }

  @Input()
  get autosize() {
    return this._autosize;
  }
  set autosize(autosize) {
    this._autosize = coerceBooleanProperty(autosize);
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

  @ViewChild(SelectDropdownComponent, { static: false })
  readonly selectDropdown: SelectDropdownComponent;

  /**
   * Custom Template for groupBy
   * Only works with groupBy on
   *
   * TemplateContext:
   * - groupName: the name of the group (`option.value[this.groupBy]` is the value)
   * - index, first, last, odd, even (ngFor properties)
   */
  @Input() groupByTemplate: TemplateRef<unknown>;

  @ContentChildren(SelectOptionDirective, { descendants: true })
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
  focusIndex = -1;
  dropdownActive = false;
  touched = false;

  private _optionTemplates: QueryList<SelectOptionDirective>;
  private _value: any[] = [];

  private _minSelections?: number;
  private _maxSelections?: number;

  private _autofocus = false;
  private _autosize = false;
  private _allowClear = true;
  private _allowAdditions = false;
  private _disableDropdown = false;
  private _closeOnSelect: boolean;
  private _closeOnBodyClick = true;
  private _filterable = true;
  private _required: boolean;
  private _filterCaseSensitive = false;
  private _tagging = false;
  private _multiple = false;
  private _disabled = false;
  private _autosizeMinWidth = '60px';

  constructor(
    private readonly _element: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _cdr: ChangeDetectorRef
  ) {
    super();
  }

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
    this.focusOn(0);
  }

  onFocusLast(): void {
    if (this.disabled) return;

    this.toggleDropdown(true);
    this.onTouchedCallback();
    this.focusOn(-1);
  }

  focusOn(index: number): void {
    if (index < 0) index = this.options.length + index;
    this.focusIndex = index;
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
    // TODO: keep focus on component
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

    if (this.dropdownActive) {
      // if open
      if (this.closeOnBodyClick) {
        this.toggleListener = this._renderer.listen(document.body, 'click', this.onBodyClick.bind(this));
      }

      this._cdr.detectChanges();

      if (this.selectDropdown?.inViewport) {
        this.selectDropdown.inViewport.inViewportAction
          .pipe(take(1))
          .subscribe({ next: this.adjustMenuDirection.bind(this) });
      }
    } else {
      // Keep focus on the select
      this.inputComponent.focus();
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

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  private adjustMenuDirection(event: {
    [InViewportMetadata]: { entry: IntersectionObserverEntry };
    target: HTMLElement;
    visible: boolean;
  }): void {
    const { entry } = event[InViewportMetadata];
    if (!this.forceDownwardOpening && this.isIntersectingBottom(entry) && !this.isIntersectingTop(entry)) {
      this._renderer.addClass(this.selectDropdown.element, 'ngx-select-dropdown--upwards');
    } else {
      this._renderer.addClass(this.selectDropdown.element, 'ngx-select-dropdown--downwards');
    }
  }

  private isIntersectingBottom(entry: IntersectionObserverEntry): boolean {
    return entry.boundingClientRect.bottom >= entry.rootBounds.bottom;
  }

  private isIntersectingTop(entry: IntersectionObserverEntry): boolean {
    return entry.boundingClientRect.top - entry.boundingClientRect.height <= entry.rootBounds.top;
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
