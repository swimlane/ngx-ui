import { Component, Input, EventEmitter, Output, forwardRef, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (change)="onChange($event)"
      />
      <ng-content></ng-content>
    </label>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkbox.component.scss'],
  host: {
    class: 'ngx-checkbox'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id: string = `checkbox-${++nextId}`;
  @Input() name: string = null;
  @Input() tabindex: number = 0;

  @HostBinding('class.disabled')
  @Input()
  disabled: boolean = false;

  @Output() change = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  get value(): boolean {
    return this._value;
  }

  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this.onChangeCallback(this._value);
    }
    this.cd.markForCheck();
  }

  private _value: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  onFocus(event: Event): void {
    this.focus.emit(event);
  }

  onBlur(event: Event): void {
    this.onTouchedCallback();
    this.blur.emit(event);
  }

  onChange(event: Event): void {
    this.onChangeCallback(this.value);
    this.change.emit(event);
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

  // tslint:disable-next-line: no-empty
  private onTouchedCallback = () => {};

  // tslint:disable-next-line: no-empty
  private onChangeCallback = (_: any) => {};
}
