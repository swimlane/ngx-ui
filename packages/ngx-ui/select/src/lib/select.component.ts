import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
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
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { CssPixelInput } from '@swimlane/ngx-ui/decorators/input-css-pixel';
import { InputCssPixel } from '@swimlane/ngx-ui/decorators/input-css-pixel';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import { Appearance, EnumKey, KeyboardKeys, Size } from '@swimlane/ngx-ui/types';
import { SelectOptionDirective } from './directives';
import type { SelectDropdownOption } from './models';
import { SelectInputComponent } from './select-input/select-input.component';

let nextId = 0;

const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'ngx-select',
  exportAs: 'ngxSelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SELECT_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  static ngAcceptInputType_minSelections: NumericInput;
  static ngAcceptInputType_maxSelections: NumericInput;
  static ngAcceptInputType_autosizeMinWidth: CssPixelInput;
  static ngAcceptInputType_autofocus: BooleanInput;
  static ngAcceptInputType_autosize: BooleanInput;
  static ngAcceptInputType_allowClear: BooleanInput;
  static ngAcceptInputType_allowAdditions: BooleanInput;
  static ngAcceptInputType_disableDropdown: BooleanInput;
  static ngAcceptInputType_closeOnSelect: BooleanInput;
  static ngAcceptInputType_closeOnBodyClick: BooleanInput;
  static ngAcceptInputType_filterable: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_filterCaseSensitive: BooleanInput;
  static ngAcceptInputType_tagging: BooleanInput;
  static ngAcceptInputType_multiple: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;

  @HostBinding('id')
  @Input()
  id = `select-${++nextId}`;

  @HostBinding('attr.name')
  @Input()
  name?: string;

  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder = '';
  @Input() emptyPlaceholder = 'No options available';
  @Input() filterEmptyPlaceholder = 'No matches...';
  @Input() filterPlaceholder = 'Filter options...';
  @Input() allowAdditionsText = 'Add Value';
  @Input() groupBy?: string;
  @Input() selectCaret?: string | TemplateRef<unknown>;
  @Input() requiredIndicator: string | boolean = '*';

  @Input() options: SelectDropdownOption[] = [];
  @Input() identifier?: string;

  @InputNumeric(undefined)
  @Input()
  minSelections?: number;

  @InputCssPixel()
  @Input()
  autosizeMinWidth = '60px';

  @InputNumeric(undefined)
  @Input()
  maxSelections?: number;

  @InputBoolean()
  @Input()
  autofocus = false;

  @HostBinding('class.autosize')
  @InputBoolean()
  @Input()
  autosize = false;

  @InputBoolean()
  @Input()
  allowClear = true;

  @InputBoolean()
  @Input()
  allowAdditions = false;

  @InputBoolean()
  @Input()
  disableDropdown = false;

  @InputBoolean()
  @Input()
  closeOnSelect?: boolean;

  @InputBoolean()
  @Input()
  closeOnBodyClick = true;

  @InputBoolean()
  @Input()
  filterable = true;

  @InputBoolean()
  @Input()
  required?: boolean;

  @InputBoolean()
  @Input()
  filterCaseSensitive = false;

  @HostBinding('class.tagging-selection')
  @InputBoolean()
  @Input()
  tagging = false;

  @HostBinding('class.multi-selection')
  @InputBoolean()
  @Input()
  multiple = false;

  @HostBinding('class.disabled')
  @InputBoolean()
  @Input()
  disabled = false;

  @InputEnum(Appearance)
  @Input('appearance')
  _appearance: EnumKey<typeof Appearance> = 'legacy';
  appearance!: Appearance;

  @InputEnum(Size)
  @Input('size')
  _size: EnumKey<typeof Size> = 'small';
  size!: Size;

  @Output() change = new EventEmitter<any[]>();
  @Output() keyup = new EventEmitter<{
    event: KeyboardEvent;
    value?: string;
  }>();
  @Output() toggle = new EventEmitter<boolean>();

  @ViewChild(SelectInputComponent, { static: true })
  readonly inputComponent!: SelectInputComponent;

  /**
   * Custom Template for groupBy
   * Only works with groupBy on
   *
   * TemplateContext:
   * - groupName: the name of the group (`option.value[this.groupBy]` is the value)
   * - index, first, last, odd, even (ngFor properties)
   */
  @Input() groupByTemplate?: TemplateRef<unknown>;

  @ContentChildren(SelectOptionDirective, { descendants: true })
  set optionTemplates(val: QueryList<SelectOptionDirective>) {
    if (val) {
      const arr = val.toArray();

      if (arr.length) {
        this.options = arr;
      }
    }

    this.cdr.markForCheck();
  }

  get invalid(): boolean {
    if (this.required && this.checkInvalidValue(this.value)) return true;
    if (this.maxSelections !== undefined && this.value && this.value.length > this.maxSelections) {
      return true;
    }

    return this.minSelections !== undefined && (!this.value || this.value.length < this.minSelections);
  }

  get requiredIndicatorView(): string {
    const required = this.required || (this.minSelections !== undefined && this.minSelections > 0);

    if (!this.requiredIndicator || !required) {
      return '';
    }

    return this.requiredIndicator as string;
  }

  @HostBinding('class.single-selection')
  get isSingleSelect(): boolean {
    return !this.multiple && !this.tagging;
  }

  @HostBinding('class.active-selections')
  get hasSelections(): boolean {
    return this.value && this.value.length > 0 && typeof this.value[0] !== 'undefined';
  }

  @HostBinding('class.has-placeholder')
  get hasPlaceholder(): boolean {
    return !!this.placeholder && this.placeholder.length > 0;
  }

  get value() {
    return this._value;
  }

  set value(val: unknown[]) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.change.emit(this._value);
      this.cdr.markForCheck();
    }
  }

  get dropdownVisible(): boolean {
    if (this.disableDropdown) return false;
    if (this.tagging && (!this.options || !this.options.length)) return false;
    return this.dropdownActive;
  }

  toggleListener?: () => void;
  filterQuery?: string;
  focusIndex = -1;

  @HostBinding('class.active')
  dropdownActive = false;

  touched = false;
  private _value: unknown[] = [];

  @HostBinding('class.ngx-select') hostClass = true;

  @HostBinding('class.legacy') get legacyClass() {
    return this.appearance === Appearance.legacy;
  }

  @HostBinding('class.fill') get fillClass() {
    return this.appearance === Appearance.fill;
  }

  @HostBinding('class.sm') get smClass() {
    return this.size === Size.small;
  }

  @HostBinding('class.md') get mdClass() {
    return this.size === Size.medium;
  }

  @HostBinding('class.lg') get lgClass() {
    return this.size === Size.large;
  }

  @HostBinding('style.min-width') get minWidthStyle() {
    return this.autosize ? this.autosizeMinWidth : undefined;
  }

  @HostBinding('class.invalid') get invalidClass() {
    return this.invalid && this.touched;
  }

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.toggleDropdown(false);
  }

  onDropdownSelection(selection: SelectDropdownOption): void {
    if (selection.disabled) return;
    if (this.value.length === this.maxSelections) return;

    const idx = this.value.findIndex(o => {
      if (this.identifier) {
        return (
          (o as Record<string, unknown>)[this.identifier] ===
          (selection.value as Record<string, unknown>)[this.identifier]
        );
      }

      return o === selection.value;
    });

    if (idx === -1) {
      this.value = this.multiple || this.tagging ? [...this.value, selection.value] : [selection.value];
    }

    // if tagging, we need to clear current text
    if (this.tagging && this.inputComponent.inputElement) {
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

  onFocus($event: Event): void {
    if (this.disabled) return;

    this.toggleDropdown(!this.dropdownActive);
    this.onTouchedCallback();
    $event.stopPropagation();
  }

  onClear(): void {
    this.value = [];
  }

  onBodyClick(event: Event): void {
    if (this.dropdownActive && !this.element.nativeElement.contains(event.target)) {
      this.toggleDropdown(false);
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
      this.toggleListener = this.renderer.listen(document.body, 'click', this.onBodyClick.bind(this));
    }

    this.cdr.markForCheck();
  }

  onKeyUp({ event, value }: { event: KeyboardEvent; value?: string }): void {
    if (event && event.key === KeyboardKeys.ARROW_DOWN && this.focusIndex < this.options.length) {
      ++this.focusIndex;
    } else {
      this.filterQuery = value;
    }

    this.keyup.emit({ event, value });
  }

  writeValue(val: unknown[]): void {
    /* istanbul ignore else */
    if (val !== this._value) {
      this._value = val;
      this.cdr.markForCheck();
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

  private checkInvalidValue(value: unknown): boolean {
    return Array.isArray(value) ? !this.value.length || this.checkInvalidValue(value[0]) : value === undefined;
  }

  private onChangeCallback(_: any): void {
    // placeholder
  }

  private onTouchedCallback(): void {
    this.touched = true;
  }
}
