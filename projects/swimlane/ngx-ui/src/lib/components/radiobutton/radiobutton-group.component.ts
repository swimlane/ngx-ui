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
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RadioButtonComponent } from './radiobutton.component';

const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonGroupComponent),
  multi: true,
};

let nextId = 0;

@Component({
  exportAs: 'ngxRadiobuttonGroup',
  selector: 'ngx-radiobutton-group',
  providers: [RADIOGROUP_VALUE_ACCESSOR],
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./radiobutton.component.scss'],
  host: {
    class: 'ngx-radiobutton-group',
    '[class.disabled]': 'disabled',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonGroupComponent implements ControlValueAccessor, OnDestroy, AfterContentInit {
  readonly UNIQUE_ID = `ngx-radio-group-${++nextId}`;

  @Input() id: string = this.UNIQUE_ID;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedRadioFromValue();
      this._updateRadioDisabledState();
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

  @Output() change = new EventEmitter<boolean>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  readonly _radios: QueryList<RadioButtonComponent>;

  get selected(): RadioButtonComponent {
    return this._selected;
  }

  private _name: string = this.UNIQUE_ID;
  private _value: boolean = false;
  private _selected: RadioButtonComponent;
  private _disabled: boolean = false;
  private _destroy$ = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.subscribeToRadios();

    /* istanbul ignore else */
    if (this._radios) {
      this._radios.changes.subscribe(this.subscribeToRadios.bind(this));
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnChanges() {
    this._updateRadioDisabledState();
  }

  subscribeToRadios(): void {
    this._destroy$.next();

    /* istanbul ignore else */
    if (this._radios) {
      this._radios.map((radio) => {
        radio.change.pipe(takeUntil(this._destroy$)).subscribe(this.onRadioSelected.bind(this));
      });
    }

    this._cdr.markForCheck();
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

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.name = this.name;
      });
    }
  }

  private _updateSelectedRadioFromValue(): void {
    /* istanbul ignore else */
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.checked = this.value === radio.value;

        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  private _updateRadioDisabledState(): void {
    /* istanbul ignore else */
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.groupDisabled = this.disabled;
      });
    }
  }
}
