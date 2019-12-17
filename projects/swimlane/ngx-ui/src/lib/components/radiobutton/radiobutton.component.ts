import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};

let nextId = 0;

@Component({
  exportAs: 'ngxRadiobutton',
  selector: 'ngx-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  host: {
    class: 'ngx-radiobutton',
    '[class.disabled]': 'disabled'
  },
  providers: [RADIO_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent implements ControlValueAccessor {
  readonly UNIQUE_ID = `ngx-radio-${++nextId}`;

  @Input() id: string = this.UNIQUE_ID;
  @Input() name: string = this.UNIQUE_ID;

  @Input()
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(tabindex: number) {
    this._tabindex = coerceNumberProperty(tabindex);
  }

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

  @Input()
  get disabled() {
    return this._disabled || this.groupDisabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Output() change = new EventEmitter<boolean>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();

  public groupDisabled: boolean = false;

  private _checked: boolean = false;
  private _value: boolean = false;
  private _disabled: boolean = false;
  private _tabindex: number = 0;

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
