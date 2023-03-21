import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  forwardRef,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  Optional,
  Inject
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';

let nextId = 0;
const selector = 'ngx-button-toggle';

@Component({
  selector,
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonToggleComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleComponent implements ControlValueAccessor {
  readonly UNIQUE_ID = `${selector}-${++nextId}`;
  private _checked = false;
  private _value = false;
  private _disabled = false;

  @Input() id: string = this.UNIQUE_ID;
  @Input() name: string = this.UNIQUE_ID;

  @Input() radioId = `${this.id}-button-toggle`;

  get checked() {
    return this._checked;
  }
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this.markForCheck();
    }
  }

  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    this._value = newValue;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }

  @Output() readonly valueChange = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeCallback: (value: any) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouchedCallback: (value: any) => void = () => {};

  writeValue(incomingValue: any): void {
    this.value = incomingValue;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  buttonToggleGroup: ButtonToggleGroupComponent;

  constructor(
    @Optional() @Inject(ButtonToggleGroupComponent) buttonToggleGroup: ButtonToggleGroupComponent,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.buttonToggleGroup = buttonToggleGroup;
  }

  handleClick(incomingEvent: Event): void {
    incomingEvent.preventDefault();
    incomingEvent.stopPropagation();

    if (this.disabled) {
      return;
    }

    if (this.buttonToggleGroup) {
      this.buttonToggleGroup.notifyChange(this.value);
    } else {
      this.checked = true;
      this.onChangeCallback(this.value);
      this.valueChange.emit(this.value);
    }
  }

  markForCheck() {
    this.cdr.markForCheck();
  }
}
