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
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import type { AfterViewInit, ComponentRef, QueryList } from '@angular/core';

import { Appearance } from '../../mixins/appearance/appearance.enum';
import { InViewportMetadata } from 'ng-in-viewport';
import { take } from 'rxjs/operators';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { SelectDropdownOption } from '../select/select-dropdown-option.interface';
import { SelectDropdownComponent } from '../select/select-dropdown.component';

import { SelectOptionDirective } from '../select/select-option.directive';
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { FilterItemPositionTypes } from './filter.items-position-types.enum';
import { FilterType } from './filter.type.enum';
import { FilterIconPositionTypes } from './filter.icon-position-types.enum';
import { FilterCustomDropdown } from './filter.custom-component.interface';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { PlacementTypes } from '../../utils/position/placement-type.enum';
import { SelectionList } from '../multi-dimension-selection/types/selection-list';
import { SelectionListOption } from '../multi-dimension-selection/types/selection-list-option';
import { MultiDimensionSelectionComponent } from '../multi-dimension-selection/multi-dimension-selection.component';

let nextId = 0;

const FILTER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterComponent),
  multi: true
};

function arrayEquals(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}

@Component({
  exportAs: 'ngxFilter',
  selector: 'ngx-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  host: {
    class: 'ngx-filter',
    '[id]': 'id',
    '[attr.name]': 'name',
    '[class.multi-selection]': 'multiple',
    '[class.single-selection]': 'isSingleSelect',
    '[class.disabled]': 'disabled',
    '[class.active]': 'dropdownActive || multiDimensionDropdownActive',
    '[class.active-selections]': 'hasSelections',
    '[class.has-placeholder]': 'hasPlaceholder',
    '[class.autosize]': 'autosize',
    '[style.min-width]': 'autosize ? autosizeMinWidth : undefined',
    '[attr.aria-expanded]': 'dropdownActive || multiDimensionDropdownActive',
    '[class.no-label]': '!label'
  },
  providers: [FILTER_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class FilterComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() id = `filter-${++nextId}`;
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder = 'All';
  @Input() emptyPlaceholder = 'No options available';
  @Input() filterEmptyPlaceholder = 'No matches...';
  @Input() filterPlaceholder = 'Search';
  @Input() groupBy: string;
  @Input() options: SelectDropdownOption[] = [];
  @Input() identifier: string;
  @Input() appearance = Appearance.Legacy;
  @Input() itemsPosition = FilterItemPositionTypes.Left;
  @Input() ngxIconPosition = FilterIconPositionTypes.Left;
  @Input() ngxIconClass: string;
  @Input() type = FilterType.Select;
  @Input() set filterCount(value: number) {
    this._filterCount = value;
  }
  @Input() customDropdownConfig: FilterCustomDropdown = null;
  @Input() showTooltip = false;
  @Input() tooltipTemplate: TemplateRef<unknown> | null = null;
  @Input() tooltipPosition: PlacementTypes = PlacementTypes.top;
  @Input() selectionList: SelectionList;

  @Input()
  @CoerceBooleanProperty()
  forceDownwardOpening = false;

  @Input()
  @CoerceBooleanProperty()
  autoSelectAll = false;

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
  filterCaseSensitive = false;

  @Input()
  @CoerceBooleanProperty()
  showSelectAll = true;

  @Input()
  @CoerceBooleanProperty()
  multiple = false;

  @Input()
  @CoerceBooleanProperty()
  disabled = false;

  @Input()
  @CoerceBooleanProperty()
  showCount = true;

  @Input()
  @CoerceBooleanProperty()
  multiDimension = false;

  @Output() change = new EventEmitter<any[]>();
  @Output() keyup = new EventEmitter<{ event: KeyboardEvent; value?: string }>();
  @Output() toggle = new EventEmitter<boolean>();
  @Output() clearQueryFilter = new EventEmitter<void>();
  @Output() clicked = new EventEmitter<{ event: KeyboardEvent; isIconClicked: boolean }>();
  dynamicComponentRef: ComponentRef<any>;

  @ViewChild(SelectDropdownComponent, { static: false })
  readonly selectDropdown: SelectDropdownComponent;

  @ViewChild(DropdownComponent, { static: false })
  readonly dropdownComponent: DropdownComponent;

  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer: ViewContainerRef;

  @ViewChild(MultiDimensionSelectionComponent, { static: false })
  readonly multiDimensionDropdown: MultiDimensionSelectionComponent;

  readonly FilterItemPositionTypes = FilterItemPositionTypes;
  readonly FilterType = FilterType;
  readonly FilterIconPositionTypes = FilterIconPositionTypes;

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
        this.options = arr;
      } else {
        this.options = [];
      }
    }

    this._cdr.markForCheck();
  }

  get isSingleSelect() {
    return this.type === FilterType.Select && !this.multiple;
  }

  get hasSelections() {
    if (this.type === FilterType.Select) {
      return this.value && this.value.length > 0 && typeof this.value[0] !== 'undefined';
    } else {
      return this.filterCount !== null && this.filterCount > 0;
    }
  }

  get hasPlaceholder() {
    return this.placeholder && this.placeholder.length > 0;
  }

  get selection(): string {
    return this._selection.map(o => o.name || o.value).join(', ');
  }

  get multiDimensionDropdownValue(): Array<string> {
    if (this.value && Array.isArray(this.value)) {
      return this.value.map(v => v.value);
    }
    return [];
  }

  get value() {
    return this._value;
  }
  set value(val: any[]) {
    if (val !== this._value) {
      this._value = val;
      if (this.multiDimension) {
        this._selection = this._value;
      } else {
        this._selection = this.options?.filter(o => this._value.includes(o.value));
      }
      this.onChangeCallback(this._value);
      this.change.emit(this._value);
      this._cdr.markForCheck();
    }
  }

  get dropdownVisible() {
    if (this.disableDropdown) return false;
    if (!this.options || !this.options.length) return false;
    return this.dropdownActive;
  }

  get multiDimensionDropdownVisible() {
    if (this.disableDropdown) return false;
    return this.multiDimensionDropdownActive;
  }

  get filterCount(): number {
    return this.type === FilterType.Select ? this.value?.length : this._filterCount;
  }

  get dropdownActive(): boolean {
    return this.type === FilterType.CustomDropdown ? this.dropdownComponent?.open : this._dropdownActive;
  }

  get multiDimensionDropdownActive(): boolean {
    return this._multiDimensionDropdownActive;
  }

  toggleListener?: () => void;
  filterQuery: string;
  focusIndex = -1;
  _dropdownActive = false;
  _multiDimensionDropdownActive = false;
  touched = false;

  private _optionTemplates: QueryList<SelectOptionDirective>;
  private _value: any[] = [];
  private _selection: any[] = [];
  private _autosizeMinWidth = '60px';
  private _filterCount: number | null = null;

  constructor(
    private readonly _element: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.createDynamicComponent();
  }

  ngOnDestroy(): void {
    this.toggleDropdown(false);
    this.toggleMultiDimensionDropdown(false);
    this.dynamicContainer?.clear();
    this.dynamicComponentRef?.destroy();
  }

  onDropdownSelection(selection: SelectDropdownOption, shouldClose = this.closeOnSelect || !this.multiple): void {
    if (selection.disabled) return;

    const idx = this.findIndex(selection);

    if (idx === -1) {
      this.value = this.multiple ? [...this.value, selection.value] : [selection.value];
    }
    this.afterSelect(shouldClose);

    if (this.autoSelectAll && this.multiple && this.showSelectAll && this.value?.length === this.options?.length) {
      this.onSelectAll();
    }
  }

  onDropdownDeselection(selection: SelectDropdownOption, shouldClose = this.closeOnSelect || !this.multiple): void {
    if (selection.disabled) return;

    const idx = this.findIndex(selection);

    if (idx > -1) {
      this.value = this.value.filter((_, i) => i !== idx);
    }
    this.afterSelect(shouldClose);
  }

  onMultiDimensionDropdownChange(selection: Array<SelectionListOption>): void {
    this.value = selection;
    this.afterSelect(!this.multiple);
  }

  private afterSelect(shouldClose: boolean = this.closeOnSelect || !this.multiple) {
    if (shouldClose) this.onClose();
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
    if (this.dropdownActive || this.multiDimensionDropdownActive) {
      const contains = this._element.nativeElement.contains(event.target);

      /* istanbul ignore else */
      if (!contains) {
        if (this.multiDimension) {
          this.toggleMultiDimensionDropdown(false);
        } else {
          this.toggleDropdown(false);
        }
      }
    }
  }

  onClose(): void {
    this.toggleDropdown(false);
  }

  onToggle(event: any): void {
    if (this.disabled) return;

    if (this.multiDimension) {
      this.toggleMultiDimensionDropdown(!this.multiDimensionDropdownActive);
    } else {
      this.toggleDropdown(!this.dropdownActive);
    }

    this.onTouchedCallback();
    this.clicked.emit({ event, isIconClicked: false });
  }

  toggleDropdown(state: boolean): void {
    if (this.dropdownActive === state) return;

    this._dropdownActive = state;

    // explicitly close inner dropdownComponent if custom
    if (this.type === FilterType.CustomDropdown && this.dropdownComponent) {
      this.dropdownComponent.open = state;
    }

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

  toggleMultiDimensionDropdown(state: boolean): void {
    if (this.multiDimensionDropdownActive === state) return;

    this._multiDimensionDropdownActive = state;

    if (this.toggleListener) this.toggleListener();
    this.toggle.emit(this.multiDimensionDropdownActive);

    if (this.multiDimensionDropdownActive) {
      if (this.closeOnBodyClick) {
        this.toggleListener = this._renderer.listen(document.body, 'click', this.onBodyClick.bind(this));
      }

      this._cdr.detectChanges();

      if (this.multiDimensionDropdown?.inViewport()) {
        this.multiDimensionDropdown
          .inViewport()
          .inViewportAction.pipe(take(1))
          .subscribe({ next: this.adjustMenuDirection.bind(this) });
      }
    }

    this._cdr.markForCheck();
  }

  get caretVisible(): boolean {
    if (this.hasSelections) return false;
    if (this.disableDropdown) return false;
    return !(!this.options || !this.options.length);
  }

  get clearVisible() {
    return this.value?.length > 0;
  }

  get hasControls(): boolean {
    return this.caretVisible || this.clearVisible;
  }

  get hasFilters(): boolean {
    if (this.type === FilterType.Select) {
      return this.value?.length > 0;
    } else {
      return this.filterCount !== null && this.filterCount > 0;
    }
  }

  onKeyUp({ event, value }: { event: KeyboardEvent; value?: string }): void {
    if (event && event.key === (KeyboardKeys.ARROW_DOWN as any) && this.focusIndex < this.options.length) {
      ++this.focusIndex;
    } else {
      this.filterQuery = value;
    }

    this.keyup.emit({ event, value });
  }

  onSelectAll() {
    this.onClear();
    this.onClose();
  }

  onFilterButtonClick(event: any): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  onCustomDropdownToggle(): void {
    this.toggle.emit(!this.dropdownComponent.open);
  }

  writeValue(val: any[]): void {
    /* istanbul ignore else */
    if (val !== this._value) {
      this._value = val;
      if (this.multiDimension) {
        this._selection = this._value;
      } else {
        this._selection = this.options?.filter(o => this._value.includes(o.value));
      }
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

  createDynamicComponent(): void {
    if (!this.dynamicContainer || !this.customDropdownConfig?.component || this.type !== FilterType.CustomDropdown)
      return;
    this.dynamicComponentRef = this.dynamicContainer?.createComponent(
      this.customDropdownConfig.component.type,
      this.customDropdownConfig.component.options ?? {}
    );
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
      if (this.multiDimension) {
        this._renderer.addClass(this.multiDimensionDropdown.element, 'ngx-multi-dimension-selection--upwards');
      } else {
        this._renderer.addClass(this.selectDropdown.element, 'ngx-select-dropdown--upwards');
      }
    } else {
      if (this.multiDimension) {
        this._renderer.addClass(this.multiDimensionDropdown.element, 'ngx-multi-dimension-selection--downwards');
      } else {
        this._renderer.addClass(this.selectDropdown.element, 'ngx-select-dropdown--downwards');
      }
    }
  }

  private isIntersectingBottom(entry: IntersectionObserverEntry): boolean {
    return entry.boundingClientRect.bottom >= entry.rootBounds.bottom;
  }

  private isIntersectingTop(entry: IntersectionObserverEntry): boolean {
    return entry.boundingClientRect.top - entry.boundingClientRect.height <= entry.rootBounds.top;
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
