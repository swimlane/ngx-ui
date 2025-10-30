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
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import type { QueryList } from '@angular/core';

import { Appearance } from '../../mixins/appearance/appearance.enum';
import { InViewportMetadata } from 'ng-in-viewport';
import { take } from 'rxjs/operators';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { sizeMixin } from '../../mixins/size/size.mixin';
import { SelectDropdownOption } from './select-dropdown-option.interface';
import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectInputComponent } from './select-input.component';

import { SelectOptionDirective } from './select-option.directive';
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { CoerceNumberProperty } from '../../utils/coerce/coerce-number';

let nextId = 0;

const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

class InputBase {}

const _InputMixinBase = sizeMixin(InputBase);

function arrayEquals(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}

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
    '[attr.aria-expanded]': 'dropdownActive',
    '[class.no-label]': '!label',
    '[class.horizontal-scroll]': 'horizontalScroll'
  },
  providers: [SELECT_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
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

  @Input() set options(options: SelectDropdownOption[]) {
    this._boundByOptionsInput = true;
    this._options = options;
  }
  get options(): SelectDropdownOption[] {
    return this._options;
  }
  @Input() identifier: string;
  @Input() appearance = Appearance.Legacy;

  @Input()
  @CoerceNumberProperty()
  minSelections?: number;

  @Input()
  @CoerceNumberProperty()
  maxSelections?: number;

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
  @CoerceBooleanProperty()
  autofocus = false;

  @Input()
  @CoerceBooleanProperty()
  autosize = false;

  @Input()
  @CoerceBooleanProperty()
  allowClear = true;

  @Input()
  @CoerceBooleanProperty()
  allowAdditions = false;

  @Input()
  @CoerceBooleanProperty()
  disableDropdown = false;

  @Input()
  @CoerceBooleanProperty()
  closeOnSelect = false;

  @Input()
  @CoerceBooleanProperty()
  closeOnBodyClick = true;

  @Input()
  @CoerceBooleanProperty()
  filterable = true;

  @Input()
  @CoerceBooleanProperty()
  required = false;

  @Input()
  @CoerceBooleanProperty()
  filterCaseSensitive = false;

  @Input()
  @CoerceBooleanProperty()
  tagging = false;

  @Input()
  @CoerceBooleanProperty()
  multiple = false;

  @Input()
  @CoerceBooleanProperty()
  disabled = false;

  @Input()
  @CoerceBooleanProperty()
  horizontalScroll = false;

  @Output() change = new EventEmitter<any[]>();
  @Output() keyup = new EventEmitter<{ event: KeyboardEvent; value?: string }>();
  @Output() toggle = new EventEmitter<boolean>();
  @Output() clearQueryFilter = new EventEmitter<void>();

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

      // In some circumstances, ngx-select-option-template and *ngFor under options cause infinite change detection
      if (arr && arr.length > 0 && this.options && this.options?.length > 0 && arrayEquals(arr, this.options)) {
        return;
      }

      if (arr.length) {
        this._options = arr;
      } else if (!this._boundByOptionsInput) {
        this._options = [];
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
  private _autosizeMinWidth = '60px';
  private _options: SelectDropdownOption[] = [];
  private _boundByOptionsInput = false;

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

  onDropdownSelection(selection: SelectDropdownOption, shouldClose = this.closeOnSelect || !this.multiple): void {
    if (selection.disabled) return;
    if (this.value.length === this.maxSelections) return;

    const idx = this.findIndex(selection);

    if (idx === -1) {
      this.value = this.multiple || this.tagging ? [...this.value, selection.value] : [selection.value];
    }
    this.afterSelect(shouldClose);
  }

  onDropdownDeselection(selection: SelectDropdownOption, shouldClose = this.closeOnSelect || !this.multiple): void {
    if (selection.disabled) return;
    if (!this.allowClear) return;

    const idx = this.findIndex(selection);

    if (idx > -1) {
      this.value = this.value.filter((_, i) => i !== idx);
    }
    this.afterSelect(shouldClose);
  }

  private afterSelect(shouldClose: boolean = this.closeOnSelect || !this.multiple) {
    // if tagging, we need to clear current text
    if (this.tagging) {
      this.inputComponent.clearInput();
    }

    if (shouldClose) this.onClose(true);
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

  onClose(keepFocus = false): void {
    this.toggleDropdown(false);

    if (keepFocus) {
      setTimeout(() => {
        this.inputComponent.focus();
      }, 30);
    }
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
    this.disabled = isDisabled;
  }

  private findIndex(selection: SelectDropdownOption) {
    return this.value.findIndex(o => {
      if (this.identifier) {
        return o[this.identifier] === selection.value[this.identifier];
      }
      return o === selection.value;
    });
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
