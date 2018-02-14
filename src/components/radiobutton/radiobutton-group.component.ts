import {
  Component,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  HostBinding,
  ViewEncapsulation,
  ContentChildren,
  QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioButtonComponent } from './radiobutton.component';

const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonGroupComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-radiobutton-group',
  providers: [RADIOGROUP_VALUE_ACCESSOR],
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./radiobutton.component.scss'],
  host: {
    class: 'ngx-radiobutton-group'
  }
})
export class RadioButtonGroupComponent implements ControlValueAccessor {

  _uniqueId: string = `ngx-radio-group-${++nextId}`;

  @Input() id: string = this._uniqueId;
  
  @Input() tabindex: number = 0;

  @HostBinding('class.disabled')
  @Input() disabled: boolean = false;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  _radios: QueryList<RadioButtonComponent>;

  @Input() get value(): any {
    return this._value;
  }

  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedRadioFromValue();
      this.onChangeCallback(this._value);
    }
  }

  @Input() get name(): string {
    return this._name;
  }
  set name(value: string) {
    if (this._name !== value) {
      this._updateRadioButtonNames();
    }
  }

  get selected(): RadioButtonComponent {
    return this._selected;
  }

  private _name: string = this._uniqueId;
  private _value: boolean = false;
  private _selected: RadioButtonComponent;

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

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  private _updateSelectedRadioFromValue(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
}
