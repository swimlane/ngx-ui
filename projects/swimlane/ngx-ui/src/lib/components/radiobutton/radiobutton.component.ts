import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CoerceNumberProperty } from '../../utils/coerce/coerce-number';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class RadioButtonComponent implements ControlValueAccessor {
  readonly UNIQUE_ID = `ngx-radio-${++nextId}`;

  @HostListener('click', ['$event']) onClick(ev: Event) {
    ev.preventDefault();
    if (!this.disabled) {
      this.toggle();
    }
  }

  @Input() id: string = this.UNIQUE_ID;
  @Input() name: string = this.UNIQUE_ID;

  @Input() radioId = `${this.id}-radio`;

  @Input()
  @CoerceNumberProperty()
  tabindex = 0;

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

    this.cdr.detectChanges(); // Update this component
    this.cdr.markForCheck(); // Update the host component (radio group)
  }

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
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

  @Output() change = new EventEmitter<any>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();

  public groupDisabled = false;
  public isInGroup = false;

  private _checked = false;
  private _value = false;
  private _disabled = false;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly elementRef: ElementRef
  ) {}

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

  focusElement(): void {
    this.elementRef.nativeElement.getElementsByClassName('radio-label')[0].focus();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onSpace(ev: Event) {
    // If the radio button with focus is unchecked, it's state will be changed to checked.
    ev.stopPropagation();
    ev.preventDefault();
    this.checked = true;
  }

  toggle(): void {
    this.checked = !this.checked;
  }

  private onChangeCallback(value: any) {
    if (this.checked) {
      this.change.emit(value);
    }
  }

  private onTouchedCallback() {
    // placeholder
  }
}
