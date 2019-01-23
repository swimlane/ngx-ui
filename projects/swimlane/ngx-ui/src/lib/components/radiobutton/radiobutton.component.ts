import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  Output,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-radiobutton',
  providers: [RADIO_VALUE_ACCESSOR],
  template: `
    <label class="radio-label">
      <input
        type="radio"
        class="radio-input"
        [id]="id"
        [checked]="checked"
        [disabled]="disabled"
        [name]="name"
        [tabIndex]="tabindex"
        (focus)="focus.emit($event)"
        (blur)="blur.emit($event)"
        (change)="_onInputChange($event)"
      />
      <span class="checkmark"></span>
      <ng-content></ng-content>
    </label>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./radiobutton.component.scss'],
  host: {
    class: 'ngx-radiobutton'
  }
})
export class RadioButtonComponent implements ControlValueAccessor {
  _uniqueId: string = `ngx-radio-${++nextId}`;

  @Input() id: string = this._uniqueId;
  @Input() name: string = this._uniqueId;
  @Input() tabindex: number = 0;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    value = !!value;
    if (this._checked !== value) {
      this._checked = value;
      this.onChangeCallback(this._value);
    }
  }

  @Input()
  get value(): boolean {
    return this._value;
  }

  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this.onChangeCallback(this._value);
    }
  }

  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled || this.groupDisabled;
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  public groupDisabled: boolean = false;

  private _checked: boolean = false;
  private _value: boolean = false;
  private _disabled: boolean = false;

  _onInputChange(event: Event) {
    event.stopPropagation();
    this.checked = true;
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

  private onChangeCallback = (value: boolean) => {
    if (this.checked) {
      this.change.emit(value);
    }
  };

  private onTouchedCallback = () => {
    // placeholder
  };
}
