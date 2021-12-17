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
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';

const CHECKBOX_VALUE_ACCESSOR = {
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
    '[class.round]': 'round',
    '(blur)': 'onBlur($event)'
  },
  providers: [CHECKBOX_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id = `checkbox-${++nextId}`;
  @Input() name?: string;
  @Input() diameter = '18px';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('checked')
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

  @Input()
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(v: number) {
    this._tabindex = coerceNumberProperty(v);
    this.cdr.markForCheck();
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(v: boolean) {
    this._disabled = coerceBooleanProperty(v);
    this.cdr.markForCheck();
  }

  @Input()
  get round() {
    return this._round;
  }
  set round(v: boolean) {
    this._round = coerceBooleanProperty(v);
    this.cdr.markForCheck();
  }

  @Output() change = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();

  private _value = false;
  private _tabindex = 1;
  private _disabled = false;
  private _round = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  onBlur(_: any) {
    this.onTouchedCallback();
  }

  onKeyup(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
    this.toggle();
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
