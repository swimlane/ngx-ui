import type { BooleanInput } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DestroyedService, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';
import { takeUntil } from 'rxjs/operators';
import { RadioButtonComponent } from '../radio-button.component';

const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonGroupComponent),
  multi: true,
};

let nextId = 0;

@Component({
  selector: 'ngx-radio-button-group',
  exportAs: 'ngxRadiobuttonGroup',
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIOGROUP_VALUE_ACCESSOR, DestroyedService],
})
export class RadioButtonGroupComponent
  implements ControlValueAccessor, AfterContentInit, OnChanges
{
  static ngAcceptInputType_disabled: BooleanInput;

  readonly UNIQUE_ID = `ngx-radio-group-${++nextId}`;

  @Input() id = this.UNIQUE_ID;

  @HostBinding('class.disabled')
  @NgxBooleanInput()
  @Input()
  disabled = false;

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

  @Output() radioButtonGroupChange = new EventEmitter<boolean>();
  @Output() radioButtonGroupBlur = new EventEmitter<Event>();
  @Output() radioButtonGroupFocus = new EventEmitter<FocusEvent>();

  @ContentChildren(forwardRef(() => RadioButtonComponent), {
    descendants: true,
  })
  readonly _radios?: QueryList<RadioButtonComponent>;

  get selected(): RadioButtonComponent | undefined {
    return this._selected;
  }

  private _selected?: RadioButtonComponent;

  private _name = this.UNIQUE_ID;
  private _value = false;

  @HostBinding('class.ngx-radio-button-group') hostClass = true;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyed: DestroyedService
  ) {}

  ngAfterContentInit() {
    this.subscribeToRadios();

    /* istanbul ignore else */
    if (this._radios) {
      this._radios.changes.subscribe(this.subscribeToRadios.bind(this));
    }
  }

  ngOnChanges() {
    this._updateRadioDisabledState();
  }

  subscribeToRadios(): void {
    this.destroyed.imperativeDestroy();

    /* istanbul ignore else */
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.radioButtonChange
          .pipe(takeUntil(this.destroyed))
          .subscribe(this.onRadioSelected.bind(this));
      });
    }

    this.cdr.markForCheck();
  }

  onRadioSelected(value: boolean) {
    if (this.value !== value) {
      queueForNextRender(() => {
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
