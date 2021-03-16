import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

const TOGGLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-toggle',
  exportAs: 'ngxToggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TOGGLE_VALUE_ACCESSOR]
})
export class ToggleComponent implements ControlValueAccessor {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_showIcons: BooleanInput;
  static ngAcceptInputType_tabIndex: NumericInput;

  @Input() id = `toggle-${++nextId}`;
  @Input() name = '';
  @Input() label?: string;

  @HostBinding('class.disabled')
  @InputBoolean()
  @Input()
  disabled = false;

  @InputBoolean()
  @Input()
  required = false;

  @InputBoolean()
  @Input()
  showIcons = true;

  @InputNumeric(0)
  @Input()
  tabIndex = 0;

  @HostBinding('class.ngx-toggle') hostClass = true;

  get value(): boolean {
    return this._value;
  }

  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this.onChangeCallback(value);
      this.cdr.markForCheck();
    }
  }

  private _value: boolean = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  toggle(): void {
    this.value = !this.value;
  }

  onBlur(): void {
    this.onTouchedCallback();
  }

  writeValue(val: any): void {
    if (val === null || val === undefined) {
      val = false;
    }

    if (val !== this._value) {
      this.value = val;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback = () => {
    // placeholder
  };

  private onChangeCallback = (_: any) => {
    // placeholder
  };
}
