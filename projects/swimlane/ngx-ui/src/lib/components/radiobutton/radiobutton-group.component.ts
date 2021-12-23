import {
  Component,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
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
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { coerceNumberProperty } from '@angular/cdk/coercion';

const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonGroupComponent),
  multi: true
};

let nextId = 0;

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonGroupComponent implements ControlValueAccessor, OnDestroy, OnChanges, AfterContentInit {
  readonly UNIQUE_ID = `ngx-radio-group-${++nextId}`;

  @Input() id: string = this.UNIQUE_ID;

  @Input()
  @CoerceBooleanProperty()
  disabled = false;

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
  private _selected: RadioButtonComponent;
  private _focusIndex: number;
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

  @HostListener('keydown', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    switch (ev.code) {
      case KeyboardKeys.ARROW_UP:
        ev.stopPropagation();
        ev.preventDefault();
        this.focusPrev();
        break;
      case KeyboardKeys.ARROW_DOWN:
        ev.stopPropagation();
        ev.preventDefault();
        this.focusNext();
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

  @HostListener('focus')
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

  private focusOn(index: number) {
    if (!this.disabled) {
      this._radios.get(index).focusElement();
    }
  }

  private focusPrev() {
    if (!this.disabled && this._radios) {
      if (this.focusIndex > 0) {
        for (let i = this.focusIndex - 1; i >= 0; i--) {
          if (!this._radios.get(i).disabled) {
            this.focusIndex = i;
            break;
          }
        }
      }
    }
  }

  private focusNext() {
    if (!this.disabled && this._radios) {
      const len = this._radios.length;
      if (this.focusIndex < len - 1) {
        for (let i = this.focusIndex + 1; i < len; i++) {
          if (!this._radios.get(i).disabled) {
            this.focusIndex = i;
            break;
          }
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
