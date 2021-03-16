import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-radiobutton',
  exportAs: 'ngxRadiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioButtonComponent implements ControlValueAccessor {
  static ngAcceptInputType_tabIndex: NumericInput;
  static ngAcceptInputType_checked: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;

  readonly UNIQUE_ID = `ngx-radio-${++nextId}`;

  @Input() id = this.UNIQUE_ID;
  @Input() name = this.UNIQUE_ID;

  @InputNumeric(0)
  @Input()
  tabIndex = 0;

  @Input()
  get checked() {
    return this._checked;
  }

  set checked(checked: boolean) {
    checked = coerceBooleanProperty(checked);

    if (this._checked !== checked) {
      this._checked = checked;
      this.onChangeCallback(this._value);
    }

    this.cdr.markForCheck();
  }

  private _checked = false;

  @Input()
  get value() {
    return this._value;
  }

  set value(value: boolean) {
    if (this._value !== value) {
      this._value = value;
      this.onChangeCallback(this._value);
    }
  }

  private _value = false;

  @HostBinding('class.disabled')
  @Input()
  get disabled() {
    return this._disabled || this.groupDisabled;
  }

  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  private _disabled = false;

  @Output() change = new EventEmitter<boolean>();

  @Output() blur = new EventEmitter<Event>();

  @Output() focus = new EventEmitter<FocusEvent>();

  groupDisabled = false;

  @HostBinding('class.ngx-radiobutton') hostClass = true;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  _onInputChange(event: Event) {
    event.stopPropagation();
    this.checked = true;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onFocus(e: FocusEvent) {
    this.focus.emit(e);
    this.onTouchedCallback();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback(value: boolean) {
    if (this.checked) {
      this.change.emit(value);
    }
  }

  private onTouchedCallback() {
    // placeholder
  }
}
