import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { CssPixelInput } from '@swimlane/ngx-ui/decorators/input-css-pixel';
import { InputCssPixel } from '@swimlane/ngx-ui/decorators/input-css-pixel';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

let nextId = 0;

@Component({
  selector: 'ngx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_VALUE_ACCESSOR],
  exportAs: 'ngxCheckbox',
})
export class CheckboxComponent implements ControlValueAccessor {
  static ngAcceptInputType_diameter: CssPixelInput;
  static ngAcceptInputType_tabIndex: NumericInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_round: BooleanInput;

  @Input() id = `checkbox-${++nextId}`;
  @Input() name?: string;

  @InputCssPixel()
  @Input()
  diameter = '18px';

  @InputNumeric(0)
  @Input()
  tabIndex = 0;

  @HostBinding('class.disabled')
  @InputBoolean()
  @Input()
  disabled = false;

  @HostBinding('class.round')
  @InputBoolean()
  @Input()
  round = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() focus = new EventEmitter<FocusEvent>();

  set value(val: boolean) {
    if (this._value !== val) {
      this._value = val;
      this.onChangeCallback(this._value);
    }
  }

  get value(): boolean {
    return this._value;
  }

  private _value = false;

  @HostBinding('class.ngx-checkbox') hostClass = true;

  toggle() {
    this.value = !this.value;
  }

  @HostListener('blur')
  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(val: boolean): void {
    this.value = val;
  }

  registerOnChange(fn: () => void) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback = () => {
    // placeholder
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChangeCallback = (_: unknown) => {
    // placeholder
  };
}
