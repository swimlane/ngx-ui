import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AppearanceControllerDirective,
  NGX_APPEARANCE_CONTROLLER_PROVIDER,
  NGX_APPEARANCE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/appearance';
import {
  AutosizeControllerDirective,
  NGX_AUTOSIZE_CONTROLLER_PROVIDER,
  NGX_AUTOSIZE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/autosize';
import {
  BooleanInput,
  CssPixelInput,
  NgxBooleanInput,
  NgxCssPixelInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { NGX_SIZE_CONTROLLER_PROVIDER } from '@swimlane/ngx-ui/size';
import { KeyboardKeys } from '@swimlane/ngx-ui/typings';
import { SelectOptionDirective } from './directives';
import type { SelectDropdownOption } from './models';
import { SelectInputComponent } from './select-input/select-input.component';

let nextId = 0;

const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'ngx-select',
  exportAs: 'ngxSelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SELECT_VALUE_ACCESSOR,
    NGX_AUTOSIZE_CONTROLLER_PROVIDER,
    NGX_APPEARANCE_CONTROLLER_PROVIDER,
    NGX_SIZE_CONTROLLER_PROVIDER,
  ],
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  static ngAcceptInputType_minSelections: NumericInput;
  static ngAcceptInputType_maxSelections: NumericInput;
  static ngAcceptInputType_autosizeMinWidth: CssPixelInput;
  static ngAcceptInputType_allowClear: BooleanInput;
  static ngAcceptInputType_allowAdditions: BooleanInput;
  static ngAcceptInputType_disableDropdown: BooleanInput;
  static ngAcceptInputType_closeOnSelect: BooleanInput;
  static ngAcceptInputType_closeOnBodyClick: BooleanInput;
  static ngAcceptInputType_filterable: BooleanInput;
  static ngAcceptInputType_filterCaseSensitive: BooleanInput;
  static ngAcceptInputType_tagging: BooleanInput;
  static ngAcceptInputType_multiple: BooleanInput;

  @HostBinding('id')
  @Input()
  id = `select-${++nextId}`;

  @HostBinding('attr.name')
  @Input()
  name?: string;

  @Input() emptyPlaceholder = 'No options available';
  @Input() filterEmptyPlaceholder = 'No matches...';
  @Input() filterPlaceholder = 'Filter options...';
  @Input() allowAdditionsText = 'Add Value';
  @Input() groupBy?: string;
  @Input() selectCaret?: string | TemplateRef<unknown>;

  @Input() options: SelectDropdownOption[] = [];
  @Input() identifier?: string;

  @NgxNumericInput(undefined)
  @Input()
  minSelections?: number;

  @NgxCssPixelInput()
  @Input()
  autosizeMinWidth = '60px';

  @NgxNumericInput(undefined)
  @Input()
  maxSelections?: number;

  @NgxBooleanInput()
  @Input()
  allowClear = true;

  @NgxBooleanInput()
  @Input()
  allowAdditions = false;

  @NgxBooleanInput()
  @Input()
  disableDropdown = false;

  @NgxBooleanInput()
  @Input()
  closeOnSelect?: boolean;

  @NgxBooleanInput()
  @Input()
  closeOnBodyClick = true;

  @NgxBooleanInput()
  @Input()
  filterable = true;

  @NgxBooleanInput()
  @Input()
  filterCaseSensitive = false;

  @HostBinding('class.tagging-selection')
  @NgxBooleanInput()
  @Input()
  tagging = false;

  @HostBinding('class.multi-selection')
  @NgxBooleanInput()
  @Input()
  multiple = false;

  @Output() selectChange = new EventEmitter<any[]>();
  @Output() selectKeyup = new EventEmitter<{
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
    if (
      this.inputComponent.inputAttributeController.required &&
      this.checkInvalidValue(this.value)
    )
      return true;
    if (
      this.maxSelections !== undefined &&
      this.value &&
      this.value.length > this.maxSelections
    ) {
      return true;
    }

    return (
      this.minSelections !== undefined &&
      (!this.value || this.value.length < this.minSelections)
    );
  }

  get requiredIndicatorView(): string {
    const required =
      this.inputComponent.inputAttributeController.required ||
      (this.minSelections !== undefined && this.minSelections > 0);

    if (
      !this.inputComponent.inputAttributeController.requiredIndicator ||
      !required
    ) {
      return '';
    }

    return this.inputComponent.inputAttributeController
      .requiredIndicator as string;
  }

  @HostBinding('class.single-selection')
  get isSingleSelect(): boolean {
    return !this.multiple && !this.tagging;
  }

  @HostBinding('class.active-selections')
  get hasSelections(): boolean {
    return (
      this.value &&
      this.value.length > 0 &&
      typeof this.value[0] !== 'undefined'
    );
  }

  get value() {
    return this._value;
  }

  set value(val: unknown[]) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this._value);
      this.selectChange.emit(this._value);
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

  @HostBinding('style.min-width') get minWidthStyle() {
    return this.autosizeController.ngxAutosize
      ? this.autosizeMinWidth
      : undefined;
  }

  @HostBinding('class.invalid') get invalidClass() {
    return this.invalid && this.touched;
  }

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
    @Inject(NGX_APPEARANCE_WATCHED_CONTROLLER)
    public readonly appearanceController: AppearanceControllerDirective,
    @Inject(NGX_AUTOSIZE_WATCHED_CONTROLLER)
    public readonly autosizeController: AutosizeControllerDirective
  ) {}

  ngOnDestroy(): void {
    this.toggleDropdown(false);
  }

  onDropdownSelection(selection: SelectDropdownOption): void {
    if (selection.disabled) return;
    if (this.value.length === this.maxSelections) return;

    const idx = this.value.findIndex((o) => {
      if (this.identifier) {
        return (
          (o as Record<string, unknown>)[this.identifier] ===
          (selection.value as Record<string, unknown>)[this.identifier]
        );
      }

      return o === selection.value;
    });

    if (idx === -1) {
      this.value =
        this.multiple || this.tagging
          ? [...this.value, selection.value]
          : [selection.value];
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
    if (this.inputComponent.inputAttributeController.disabled) return;

    this.toggleDropdown(!this.dropdownActive);
    this.onTouchedCallback();
    $event.stopPropagation();
  }

  onClear(): void {
    this.value = [];
  }

  onBodyClick(event: Event): void {
    if (
      this.dropdownActive &&
      !this.element.nativeElement.contains(event.target)
    ) {
      this.toggleDropdown(false);
    }
  }

  onClose(): void {
    this.toggleDropdown(false);
  }

  onToggle(): void {
    if (this.inputComponent.inputAttributeController.disabled) return;

    this.toggleDropdown(!this.dropdownActive);
    this.onTouchedCallback();
  }

  toggleDropdown(state: boolean): void {
    if (this.dropdownActive === state) return;

    this.dropdownActive = state;

    if (this.toggleListener) this.toggleListener();
    this.toggle.emit(this.dropdownActive);

    if (state && this.closeOnBodyClick) {
      this.toggleListener = this.renderer.listen(
        document.body,
        'click',
        this.onBodyClick.bind(this)
      );
    }

    this.cdr.markForCheck();
  }

  onKeyUp({ event, value }: { event: KeyboardEvent; value?: string }): void {
    if (
      event &&
      event.key === KeyboardKeys.ArrowDown &&
      this.focusIndex < this.options.length
    ) {
      ++this.focusIndex;
    } else {
      this.filterQuery = value;
    }

    this.selectKeyup.emit({ event, value });
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
    return Array.isArray(value)
      ? !this.value.length || this.checkInvalidValue(value[0])
      : value === undefined;
  }

  private onChangeCallback(_: any): void {
    // placeholder
  }

  private onTouchedCallback(): void {
    this.touched = true;
  }
}
