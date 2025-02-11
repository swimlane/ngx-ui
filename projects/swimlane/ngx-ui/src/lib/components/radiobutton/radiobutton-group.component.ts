import {
  Component,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ViewEncapsulation,
  ContentChildren,
  OnDestroy,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  HostListener,
  HostBinding
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RadioButtonComponent } from './radiobutton.component';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import type { QueryList } from '@angular/core';

const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonGroupComponent),
  multi: true
};

let nextId = 0;

function mod(v: number, n: number): number {
  return ((v % n) + n) % n;
}

@Component({
  exportAs: 'ngxRadiobuttonGroup',
  selector: 'ngx-radiobutton-group',
  providers: [RADIOGROUP_VALUE_ACCESSOR],
  template: ' <ng-content></ng-content> ',
  styleUrls: ['./radiobutton.component.scss'],
  host: {
    class: 'ngx-radiobutton-group',
    '[class.disabled]': 'disabled'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class RadioButtonGroupComponent implements ControlValueAccessor, OnDestroy, OnChanges, AfterContentInit {
  readonly UNIQUE_ID = `ngx-radio-group-${++nextId}`;

  @Input() id: string = this.UNIQUE_ID;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(val: boolean) {
    this._disabled = coerceBooleanProperty(val);
    this._updateRadioDisabledState();
  }

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this.update();
      this.onChangeCallback(this._value);
    }
  }

  @Input()
  get name() {
    return this._name;
  }
  set name(name: string) {
    if (this._name !== name) {
      this._name = name;
      this._updateRadioButtonNames();
    }
  }

  @Input()
  get focusIndex() {
    return this._focusIndex;
  }
  set focusIndex(val: number) {
    this._focusIndex = coerceNumberProperty(val);
    this.focusOn(this._focusIndex);
  }

  @HostBinding('attr.tabindex')
  @Input()
  get tabIndex() {
    return this.disabled ? -1 : this._tabIndex;
  }
  set tabIndex(val: number) {
    this._tabIndex = coerceNumberProperty(val);
  }

  @Output() change = new EventEmitter<boolean>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  readonly _radios: QueryList<RadioButtonComponent>;

  get selected(): RadioButtonComponent {
    return this._selected;
  }

  private _name: string = this.UNIQUE_ID;
  private _value = false;
  private _disabled = false;
  private _selected: RadioButtonComponent;
  private _focusIndex = -1;
  private _tabIndex = 0;
  private _destroy$ = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.subscribeToRadios();

    /* istanbul ignore else */
    if (this._radios) {
      this._radios.changes.subscribe(this.subscribeToRadios.bind(this));
    }

    this.update();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnChanges() {
    this.update();
  }

  @HostListener('focus')
  onFocus() {
    if (this.selected) {
      // Moves keyboard focus to the checked radio button in a radiogroup.
      this.focusIndex = this._radios.toArray().indexOf(this.selected);
    } else {
      // If no radio button is checked, focus moves to the first radio button in the group.
      this.focusFirst();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    switch (ev.code) {
      case KeyboardKeys.ARROW_LEFT:
      case KeyboardKeys.ARROW_UP:
        ev.stopPropagation();
        ev.preventDefault();
        this.focusIn(-1); // Moves focus to previous radio button in the group.
        this.selectIndex(this.focusIndex); // Selects the radio button in the group.
        break;
      case KeyboardKeys.ARROW_RIGHT:
      case KeyboardKeys.ARROW_DOWN:
        ev.stopPropagation();
        ev.preventDefault();
        this.focusIn(1); // Moves focus to next radio button in the group.
        this.selectIndex(this.focusIndex); // Selects the radio button in the group.
        break;
    }
  }

  subscribeToRadios(): void {
    this._destroy$.next();

    /* istanbul ignore else */
    if (this._radios) {
      this._radios.map(radio => {
        radio.change.pipe(takeUntil(this._destroy$)).subscribe(this.onRadioSelected.bind(this));
      });
    }

    this.update();
  }

  onRadioSelected(value: string) {
    if (this.value !== value) {
      setTimeout(() => {
        this.value = value;
      });
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.update();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChangeCallback(_: any) {
    // placeholder
  }

  /* istanbul ignore next */
  onTouchedCallback() {
    // placeholder
  }

  focusFirst() {
    if (!this.disabled && this._radios) {
      const len = this._radios.length;
      for (let i = 0; i < len; i++) {
        if (!this._radios.get(i).disabled) {
          this.focusIndex = i;
          break;
        }
      }
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = coerceBooleanProperty(isDisabled);
  }

  private selectIndex(index: number) {
    if (!this.disabled && this.focusIndex > -1) {
      this.value = this._radios.get(index).value;
    }
  }

  private focusOn(index: number) {
    if (!this.disabled) {
      this._radios.get(index).focusElement();
    }
  }

  /**
   * Moves focus to next radio button in the group.
   * +1 is next radio button, -1 is previous radio button.
   */
  private focusIn(dir: 1 | -1) {
    if (!this.disabled && this._radios) {
      const len = this._radios.length;
      for (let i = 1; i < len; i++) {
        const ii = mod(this.focusIndex + dir * i, len);
        if (!this._radios.get(ii).disabled) {
          this.focusIndex = ii;
          return;
        }
      }
    }
  }

  private update() {
    this._updateSelectedRadioFromValue();
    this._updateRadioDisabledState();
    this._cdr.markForCheck();
  }

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  private _updateSelectedRadioFromValue(): void {
    /* istanbul ignore else */
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        radio.isInGroup = true;

        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  private _updateRadioDisabledState(): void {
    /* istanbul ignore else */
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.groupDisabled = this.disabled;
      });
    }
  }
}
