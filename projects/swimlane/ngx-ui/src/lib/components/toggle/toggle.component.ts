import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TOGGLE_VALUE_ACCESSOR: any = {
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
  providers: [TOGGLE_VALUE_ACCESSOR],
  host: {
    class: 'ngx-toggle',
    '[class.disabled]': 'getDisabled'
  }
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() id: string = `toggle-${++nextId}`;
  @Input() name: string = null;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() tabIndex: number = 0;
  @Input() label: string;

  get value(): boolean {
    return this._value;
  }

  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this.onChange();
      this.cdr.markForCheck();
    }
  }

  @Output() change = new EventEmitter();

  get getHostCssClasses(): string {
    return 'ngx-toggle';
  }

  get getDisabled(): string {
    return this.disabled ? 'disabled' : '';
  }

  private _value: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggle(): void {
    this.value = !this.value;
  }

  onBlur(): void {
    this.onTouchedCallback();
  }

  onChange(): void {
    this.change.emit(this.value);

    setTimeout(() => {
      this.onChangeCallback(this._value);
    });
  }

  writeValue(val: any): void {
    if (val === null || val === undefined) {
      val = false;
    }

    if (val !== this._value) {
      this._value = val;
      this.onChange();
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
