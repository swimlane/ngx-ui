import {
  Component, Input, EventEmitter, Output, forwardRef, HostBinding, ViewEncapsulation
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
  providers: [CHKBOX_VALUE_ACCESSOR],
  template: `
    <label class="checkbox-label">
      <input
        type="checkbox"
        class="checkbox-input"
        [id]="id + '-chk'"
        [(ngModel)]="value"
        [disabled]="disabled"
        [name]="name + '-chk'"
        [tabIndex]="tabindex"
        (focus)="focus.emit($event)"
        (blur)="blur.emit($event)"
        (change)="change.emit($event)"
      />
      <ng-content></ng-content>
    </label>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkbox.component.scss'],
  host: {
    class: 'ngx-checkbox'
  }
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input() id: string = `checkbox-${++nextId}`;
  @Input() name: string = null;
  @Input() tabindex: number = 0;

  @HostBinding('class.disabled')
  @Input() disabled: boolean = false;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  get value(): boolean {
    return this._value;
  }

  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this.onChangeCallback(this._value);
    }
  }

  private _value: boolean = false;

  onBlur(event): void {
    this.onTouchedCallback();
  }

  onChange(event): void {
    this.toggle();
  }

  toggle() {
    this.value = !this.value;
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

  private onTouchedCallback = () => {
    // placeholder
  }

  private onChangeCallback = (_: any) => {
    // placeholder
  }

}
