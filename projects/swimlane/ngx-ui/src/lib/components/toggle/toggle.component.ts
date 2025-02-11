import {
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

const TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-toggle',
  exportAs: 'ngxToggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TOGGLE_VALUE_ACCESSOR],
  host: {
    class: 'ngx-toggle',
    '[class.disabled]': 'getDisabled'
  },
  standalone: false
})
export class ToggleComponent implements ControlValueAccessor {
  @HostListener('click', ['$event']) onClick(ev: Event) {
    ev.preventDefault();
    if (!this.disabled) {
      this.toggle();
      this.emitChange();
    }
  }

  @Input() id = `toggle-${++nextId}`;
  @Input() name: string = null;
  @Input() label: string;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
  }

  @Input()
  get showIcons(): boolean {
    return this._showIcons;
  }

  set showIcons(showIcons: boolean) {
    this._showIcons = coerceBooleanProperty(showIcons);
  }

  @Input()
  get tabIndex(): number {
    return this._tabIndex;
  }
  set tabIndex(tabIndex: number) {
    this._tabIndex = coerceNumberProperty(tabIndex);
  }

  @Output() change = new EventEmitter<Event>();

  get value(): boolean {
    return this._value;
  }

  set value(value: boolean) {
    if (this.value !== value) {
      this._value = value;
      this.onChangeCallback(value);
      this.cdr.markForCheck();
    }
  }

  get getHostCssClasses(): string {
    return 'ngx-toggle';
  }

  get getDisabled(): string {
    return this.disabled ? 'disabled' : '';
  }

  private _value = false;
  private _disabled = false;
  private _required = false;
  private _showIcons = true;
  private _tabIndex = 0;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  toggle(): void {
    this.value = !this.value;
  }

  onBlur(): void {
    this.onTouchedCallback();
  }

  writeValue(val: unknown): void {
    if (val === null || val === undefined) {
      val = false;
    }

    if (val !== this._value) {
      this.value = val as boolean;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (_: unknown) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback = () => {
    // placeholder
  };

  private onChangeCallback = (_: unknown) => {
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
