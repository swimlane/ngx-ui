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
  FormControl,
  Validators
} from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';

import { Appearance } from '../../mixins/appearance/appearance.enum';
import { appearanceMixin } from '../../mixins/appearance/appearance.mixin';
import { sizeMixin } from '../../mixins/size/size.mixin';

import { InputTypes } from './input-types.enum';
import { INPUT_ANIMATIONS } from './input-animations.constant';

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

class InputBase {}
const _InputMixinBase = appearanceMixin(sizeMixin(InputBase));

@Component({
  exportAs: 'ngxInput',
  selector: 'ngx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'ngx-input',
    '[class.legacy]': 'appearance === "legacy"',
    '[class.fill]': 'appearance === "fill"',
    '[class.sm]': 'size === "sm"',
    '[class.md]': 'size === "md"',
    '[class.lg]': 'size === "lg"',
    '[class.focused]': 'focused',
    '[class.autosize]': 'autosize'
  },
  animations: INPUT_ANIMATIONS,
  providers: [INPUT_VALUE_ACCESSOR, INPUT_VALIDATORS],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends _InputMixinBase
  implements AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
  @Input() id: string = `input-${++nextId}`;
  @Input() name: string;
  @Input() label: string = '';
  @Input() hint: string;
  @Input() placeholder: string = '';
  @Input() tabindex: number;
  @Input() min: number;
  @Input() max: number;
  @Input() minlength: number;
  @Input() maxlength: number;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
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

  @Input() passwordToggleEnabled: boolean = false;
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
  set autocomplete(autocomplete: boolean) {
    this._autocomplete = coerceBooleanProperty(autocomplete);
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

  @Output() change = new EventEmitter<string | number>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<Event>();
  @Output() select = new EventEmitter<FocusEvent>();

  @ViewChild('inputControl') readonly inputControl: ElementRef<HTMLInputElement>;
  @ViewChild('inputModel') readonly inputModel: NgModel;
  @ViewChild('textareaControl') readonly textareaControl: ElementRef<HTMLTextAreaElement>;

  get value(): string | number {
    return this._value;
  }
  set value(val: string | number) {
    if (val !== this._value) {
      this._value = this.type === InputTypes.number ? coerceNumberProperty(val, null) : val;
      this.onChangeCallback(this._value);
    }
  }

  @HostBinding('class.ng-dirty')
  get focusedOrDirty(): any {
    if (this.focused) {
      return true;
    }

    if (typeof this.value === 'string') {
      return this.value && this.value.length;
    }

    return typeof this.value !== 'undefined' && this.value !== null;
  }

  @HostBinding('class.ng-touched')
  get isTouched(): boolean {
    return this.inputModel ? this.inputModel.touched : false;
  }

  get labelState(): string {
    return this.placeholder || this.focusedOrDirty || this.appearance === Appearance.Fill ? 'outside' : 'inside';
  }

  get underlineState(): string {
    return this.focused ? 'expanded' : 'collapsed';
  }

  get element() {
    return this.type === InputTypes.textarea ? this.textareaControl : this.inputControl;
  }

  focused: boolean = false;
  readonly type$ = new BehaviorSubject<InputTypes>(InputTypes.text);
  readonly inputTypes = InputTypes;

  private _value: string | number = '';
  private _type: InputTypes = InputTypes.text;
  private _passwordTextVisible: boolean = false;
  private _disabled: boolean = false;
  private _required: boolean = false;
  private _autoSelect: boolean = false;
  private _autofocus: boolean = false;
  private _autocomplete: boolean = false;
  private _autocorrect: boolean = false;
  private _spellcheck: boolean = false;
  private _autosize: boolean = false;
  private _spinnerInterval;
  private _spinnerTimeout;
  private _minWidth: number = MIN_WIDTH;

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

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
    this.onTouchedCallback();
  }

  onBlur(event: Event): void {
    event.stopPropagation();

    this.focused = false;
    this.blur.emit(event);
  }

  validate(c: FormControl) {
    if (this.type !== InputTypes.number) {
      return null;
    }

    return {
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

  incrementValue(event: MouseEvent): void {
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
    // tslint:disable-next-line: tsr-detect-possible-timing-attacks
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
          this.inputControl.nativeElement.focus();
          return;
        } else if (+el.value <= min) {
          return;
        }
      }

      el.value = el.value ? (+el.value - 1).toString() : '-1';
      this.value = el.value;
      if (document.activeElement !== this.inputControl.nativeElement) {
        this.inputControl.nativeElement.focus();
      }
    }
  }
}
