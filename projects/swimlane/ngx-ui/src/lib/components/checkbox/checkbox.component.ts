import {
  Component,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CHKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-checkbox',
  exportAs: 'ngxCheckbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: {
    class: 'ngx-checkbox',
    '[class.disabled]': 'disabled',
    '(blur)': 'onBlur($event)'
  },
  providers: [CHKBOX_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id = `checkbox-${++nextId}`;
  @Input() name?: string;
  @Input() tabindex = 0;
  @Input() disabled = false;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

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

  constructor(private readonly cdr: ChangeDetectorRef) {}

  onBlur(_: any) {
    this.onTouchedCallback();
  }

  toggle() {
    this.value = !this.value;
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  private onTouchedCallback = () => {
    // placeholder
  };

  private onChangeCallback = (_: any) => {
    // placeholder
  };
}
