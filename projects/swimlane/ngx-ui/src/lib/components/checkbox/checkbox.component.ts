import {
  Component,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CoerceNumberProperty } from '../../utils/coerce/coerce-number';
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CheckboxComponent implements ControlValueAccessor {
  @HostListener('click', ['$event']) onClick(ev: Event) {
    ev.preventDefault();
    if (!this.disabled) {
      this.toggle();
    }
    this.emitChange();
  }

  @HostBinding()
  @Input()
  id = `checkbox-${++nextId}`;

  @Input() name?: string;
  @Input() diameter = '18px';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('checked')
  set value(value: boolean) {
    if (this._value !== value) {
      this._value = value;
      this.cdr.markForCheck();
      this.onChangeCallback(this._value);
      this.checkedChange.emit(this._value);
    }
  }
  get value(): boolean {
    return this._value;
  }

  @Input()
  set indeterminate(value: boolean) {
    if (this._indeterminate !== value) {
      this._indeterminate = value;
      this.cdr.markForCheck();
      this.indeterminateChange.emit(this.indeterminate);
    }
  }
  get indeterminate(): boolean {
    return this._indeterminate;
  }

  @Input()
  @CoerceNumberProperty()
  tabindex = 0;

  @Input()
  @CoerceBooleanProperty()
  disabled = false;

  @Input()
  @CoerceBooleanProperty()
  round = false;

  @Output() change = new EventEmitter<Event>();
  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() indeterminateChange = new EventEmitter<boolean>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();

  private _value = false;
  private _indeterminate = false;

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
    this.emitChange();
    this.cdr.markForCheck();
  }

  writeValue(value: boolean) {
    this.value = value;
    this.cdr.markForCheck();
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

  private emitChange() {
    this.change.emit({
      stopPropagation: () => {},
      timeStamp: new CustomEvent('change').timeStamp,
      target: { checked: this._value }
    } as any);
  }
}
