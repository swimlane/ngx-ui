import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BooleanInput,
  CssPixelInput,
  NgxBooleanInput,
  NgxCssPixelInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

let nextId = 0;

@Component({
  selector: 'ngx-checkbox',
  exportAs: 'ngxCheckbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_VALUE_ACCESSOR],
})
export class CheckboxComponent implements ControlValueAccessor {
  static ngAcceptInputType_diameter: CssPixelInput;
  static ngAcceptInputType_tabindex: NumericInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_round: BooleanInput;

  @HostBinding('class.ngx-checkbox') hostClass = true;

  @Input() id = `checkbox-${++nextId}`;
  @Input() name = '';

  @NgxCssPixelInput()
  @Input()
  diameter: CssPixelInput = '18px';

  @NgxNumericInput(0)
  @Input()
  tabindex = 0;

  @HostBinding('class.disabled')
  @NgxBooleanInput()
  @Input()
  disabled = false;

  @HostBinding('class.round')
  @NgxBooleanInput()
  @Input()
  round = false;

  @Output() checkboxChange = new EventEmitter<Event>();
  @Output() checkboxBlur = new EventEmitter<FocusEvent>();
  @Output() checkboxFocus = new EventEmitter<FocusEvent>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  set value(value: boolean) {
    if (this._value !== value) {
      this._value = value;
      this.cdr.markForCheck();
      this.onChangeCallback(this._value);
    }
  }

  get value(): boolean {
    return this._value;
  }

  private _value = false;

  onBlur() {
    this.onTouchedCallback();
  }

  toggle() {
    this.value = !this.value;
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  registerOnChange(fn: (_: boolean) => void) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  private onTouchedCallback = () => {
    // placeholder
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChangeCallback = (_: boolean) => {
    // placeholder
  };
}
