import {
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

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
  @Input() id = `toggle-${++nextId}`;
  @Input() name: string = null;
  @Input() label: string;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(required) {
    this._required = coerceBooleanProperty(required);
  }

  @Input()
  get showIcons() {
    return this._showIcons;
  }

  set showIcons(showIcons) {
    this._showIcons = coerceBooleanProperty(showIcons);
  }

  @Input()
  get tabIndex() {
    return this._tabIndex;
  }
  set tabIndex(tabIndex) {
    this._tabIndex = coerceNumberProperty(tabIndex);
  }

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

  get getHostCssClasses(): string {
    return 'ngx-toggle';
  }

  get getDisabled(): string {
    return this.disabled ? 'disabled' : '';
  }

  private _value: boolean = false;
  private _disabled: boolean = false;
  private _required: boolean = false;
  private _showIcons: boolean = true;
  private _tabIndex: number = 0;

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
