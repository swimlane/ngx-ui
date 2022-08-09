import {
  AfterViewInit,
  OnDestroy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NgModel,
  UntypedFormControl,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';

import { Appearance } from '../../mixins/appearance/appearance.enum';

import { InputTypes } from './input-types.enum';
import { INPUT_ANIMATIONS } from './input-animations.constant';
import { Size } from '../../mixins/size/size.enum';

let nextId = 0;

const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

const INPUT_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

const MIN_WIDTH = 60;

@Component({
  exportAs: 'ngxInput',
  selector: 'ngx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'ngx-input',
    '[class.legacy]': 'appearance === "legacy"',
    '[class.fill]': 'appearance === "fill" && !readonly',
    '[class.sm]': 'size === "sm"',
    '[class.md]': 'size === "md"',
    '[class.lg]': 'size === "lg"',
    '[class.focused]': 'focused',
    '[class.autosize]': 'autosize',
    '[class.marginless]': '!withMargin',
    '[class.no-label]': '!label'
  },
  animations: INPUT_ANIMATIONS,
  providers: [INPUT_VALUE_ACCESSOR, INPUT_VALIDATORS],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
  @Input() id = `input-${++nextId}`;
  @Input() name: string;
  @Input() label = '';
  @Input() hint: string;
  @Input() placeholder = '';
  @Input() tabindex: number;
  @Input() min: number;
  @Input() max: number;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() size: Size = Size.Small;
  @Input() appearance: Appearance = Appearance.Legacy;
  @Input() withMargin = true;
  @Input() textareaRows = 1;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Input()
  get readonly() {
    return this._readonly;
  }
  set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
  }

  @Input()
  get minWidth(): number {
    return this._minWidth;
  }
  set minWidth(minWidth) {
    this._minWidth = coerceNumberProperty(minWidth);
  }

  @Input() requiredIndicator: string | boolean = '*';

  @Input()
  get required() {
    return this._required;
  }
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
  }

  @Input() passwordToggleEnabled = false;
  @Input()
  get passwordTextVisible() {
    return this._passwordTextVisible;
  }
  set passwordTextVisible(p: boolean) {
    this._passwordTextVisible = coerceBooleanProperty(p);
    this.updateInputType();
  }

  @Input()
  get autoSelect() {
    return this._autoSelect;
  }
  set autoSelect(autoSelect: boolean) {
    this._autoSelect = coerceBooleanProperty(autoSelect);
  }

  @Input()
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(autofocus: boolean) {
    this._autofocus = coerceBooleanProperty(autofocus);
  }

  @Input()
  get autocomplete() {
    return this._autocomplete;
  }
  set autocomplete(autocomplete: boolean | string) {
    this._autocomplete = coerceBooleanProperty(autocomplete) ? 'on' : 'new-password';
  }

  @Input()
  get autocorrect() {
    return this._autocorrect;
  }
  set autocorrect(autocorrect: boolean) {
    this._autocorrect = coerceBooleanProperty(autocorrect);
  }

  @Input()
  get spellcheck() {
    return this._spellcheck;
  }
  set spellcheck(spellcheck: boolean) {
    this._spellcheck = coerceBooleanProperty(spellcheck);
  }

  @Input()
  get type() {
    return this._type;
  }
  set type(type: InputTypes) {
    this._type = type;
    this.updateInputType();
  }

  @Input()
  get autosize() {
    return this._autosize;
  }
  set autosize(v: boolean) {
    this._autosize = coerceBooleanProperty(v);
  }

  @Input()
  get unlockable() {
    return this._unlockable;
  }
  set unlockable(v: boolean) {
    this._unlockable = coerceBooleanProperty(v);
    if (this._unlockable) {
      this.disabled = true;
    }
  }
  @Input() unlockableTooltip = 'Click to unlock';

  @Output() change = new EventEmitter<string | number>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<Event>();
  @Output() select = new EventEmitter<FocusEvent>();
  @Output() lockChange = new EventEmitter<boolean>();

  @ViewChild('inputControl') readonly inputControl: ElementRef<HTMLInputElement>;
  @ViewChild('inputModel') readonly inputModel: NgModel;
  @ViewChild('textareaControl') readonly textareaControl: ElementRef<HTMLTextAreaElement>;

  get value(): string | number {
    return this.type === InputTypes.number ? this.valueAsNumber : this._value;
  }
  set value(val: string | number) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this.value);
    }
  }

  get valueAsString(): string {
    if (this._value == null || typeof this._value === 'undefined') return '';
    return String(this._value);
  }

  get valueAsNumber(): number {
    return coerceNumberProperty(this._value, null);
  }

  @HostBinding('class.ng-dirty')
  get focusedOrDirty(): any {
    if (this.focused) {
      return true;
    }

    if (this._type === InputTypes.number && this.isBadInput) {
      return true;
    }

    if (typeof this.value === 'string') {
      return (this.value && this.value.length > 0) || false;
    }

    return typeof this.value !== 'undefined' && this.value !== null;
  }

  get isBadInput() {
    const validity = (this.inputControl?.nativeElement as HTMLInputElement)?.validity;
    return validity && validity.badInput;
  }

  @HostBinding('class.ng-touched')
  get isTouched(): boolean {
    return this.inputModel ? this.inputModel.touched : false;
  }

  @HostBinding('class.has-placeholder')
  get hasPlaceholder(): boolean {
    return !!this.placeholder;
  }

  @HostBinding('class.active')
  get labelState(): boolean {
    return this.focusedOrDirty;
  }

  get underlineState(): string {
    return this.focused ? 'expanded' : 'collapsed';
  }

  get element() {
    return this.type === InputTypes.textarea ? this.textareaControl : this.inputControl;
  }

  focused = false;
  readonly type$ = new BehaviorSubject<InputTypes>(InputTypes.text);
  readonly inputTypes = InputTypes;

  private _value: string | number = '';
  private _type: InputTypes = InputTypes.text;
  private _passwordTextVisible = false;
  private _disabled = false;
  private _readonly = false;
  private _required = false;
  private _autoSelect = false;
  private _autofocus = false;
  private _autocomplete: boolean | string = 'off';
  private _autocorrect = false;
  private _spellcheck = false;
  private _autosize = false;
  private _spinnerInterval;
  private _spinnerTimeout;
  private _minWidth: number = MIN_WIDTH;
  private _unlockable = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.autofocus) {
      setTimeout(() => {
        this.element.nativeElement.focus();

        // sometimes the label doesn't update on load
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.clearSpinnerInterval();
  }

  onChange(event: Event): void {
    event.stopPropagation();

    this.change.emit(this.value);
  }

  onKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();
    this.keyup.emit(event);
  }

  onFocus(event: FocusEvent): void {
    event.stopPropagation();
    this.focused = true;

    if (this.autoSelect) {
      setTimeout(() => this.element.nativeElement.select());
      this.select.emit(event);
    }

    this.focus.emit(event);
  }

  onBlur(event: Event): void {
    event.stopPropagation();

    this.focused = false;
    this.blur.emit(event);
    this.onTouchedCallback();
  }

  validate(c: UntypedFormControl): ValidationErrors | null {
    if (this.type !== InputTypes.number) {
      return null;
    }

    return {
      ...(this.isBadInput ? { badInput: true } : null),
      ...Validators.max(this.max)(c),
      ...Validators.min(this.min)(c)
    };
  }

  writeValue(val: string): void {
    if (val !== this._value) {
      this._value = val;
    }

    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  togglePassword(): void {
    this.passwordTextVisible = !this.passwordTextVisible;
    this.element.nativeElement.focus();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = coerceBooleanProperty(isDisabled);
  }

  unlock(): void {
    if (this.type === InputTypes.password) {
      this.value = '';
    }
    this.disabled = false;
    this.lockChange.emit(false);
    this.updateInputType();
  }

  incrementValue(event: MouseEvent): void {
    if (this.disabled) return;

    this.increment(event);
    if (!this._spinnerInterval) {
      this._spinnerTimeout = setTimeout(() => {
        this._spinnerInterval = setInterval(() => {
          this.increment(event);
        }, 50);
      }, 500);
    }
  }

  decrementValue(event: MouseEvent): void {
    if (this.disabled) return;

    this.decrement(event);
    if (!this._spinnerInterval) {
      this._spinnerTimeout = setTimeout(() => {
        this._spinnerInterval = setInterval(() => {
          this.decrement(event);
        }, 50);
      }, 500);
    }
  }

  clearSpinnerInterval() {
    clearTimeout(this._spinnerTimeout);
    this._spinnerTimeout = undefined;

    clearInterval(this._spinnerInterval);
    this._spinnerInterval = undefined;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  private updateInputType() {
    // eslint-disable-next-line
    this.type$.next(this.passwordTextVisible && InputTypes.password === this.type ? InputTypes.text : this.type);
  }

  private increment(event: MouseEvent) {
    event.preventDefault();

    if (!this.disabled) {
      const el = this.element.nativeElement as HTMLInputElement;
      const max = +this.max;
      if ((max || max === 0) && +el.value >= max) return;

      el.value = el.value ? (+el.value + 1).toString() : '1';
      this.value = el.value;
      this.change.emit(this._value);
      if (document.activeElement !== this.inputControl.nativeElement) {
        this.inputControl.nativeElement.focus();
      }
    }
  }

  private decrement(event: MouseEvent) {
    event.preventDefault();

    if (!this.disabled) {
      const el = this.element.nativeElement as HTMLInputElement;
      const min = +this.min;
      if (min || min === 0) {
        if (min === 0 && !el.value) {
          el.value = '0';
          this.value = el.value;
          this.change.emit(this._value);
          this.inputControl.nativeElement.focus();
          return;
        } else if (+el.value <= min) {
          return;
        }
      }

      el.value = el.value ? (+el.value - 1).toString() : '-1';
      this.value = el.value;
      this.change.emit(this._value);
      if (document.activeElement !== this.inputControl.nativeElement) {
        this.inputControl.nativeElement.focus();
      }
    }
  }
}
