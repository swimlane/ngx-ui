import {
  Component, Input, EventEmitter, Output, forwardRef, HostBinding, ViewEncapsulation, Optional
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioButtonGroupComponent } from './radiobutton-group.component';

const CHKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-radiobutton',
  providers: [CHKBOX_VALUE_ACCESSOR],
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

  @Input() get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    value = !!value;
    if (this._checked !== value) {
      this._checked = value;
      if (this._checked && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.value = this.value;
      }
      this.onChangeCallback(this._value);
    }
  }

  @Input() get value(): boolean {
    return this._value;
  }

  set value(value) {
    if (this.value !== value) {
      this._value = value;
      if (this.radioGroup) {
        this._checked = this.radioGroup.value === this.value;
      }
      this.onChangeCallback(this._value);
    }
  }

  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  private _checked: boolean = false;
  private _value: boolean = false;
  private _disabled: boolean = false;

  constructor(@Optional() public radioGroup: RadioButtonGroupComponent) {
    this.radioGroup = radioGroup;
  }

  ngOnInit() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;
      this.name = this.radioGroup.name;
    }
  }

  _onInputChange(event: Event) {
    event.stopPropagation();
    this.change.emit(event);

    this.checked = true;

    if (this.radioGroup) {
      this.radioGroup.value = this.value;
    }
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

  private onChangeCallback = (_: any) => {
    // placeholder
  }

  private onTouchedCallback = () => {
    // placeholder
  }
}
