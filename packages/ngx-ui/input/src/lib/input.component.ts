import { BooleanInput, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgModel,
  Validator,
  Validators
} from '@angular/forms';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { Appearance, Size } from '@swimlane/ngx-ui/types';
import { queueForNextRender } from '@swimlane/ngx-ui/utils/queue-for-next-render';
import { BehaviorSubject } from 'rxjs';
import { InputTypes } from './enums';
import { INPUT_ANIMATIONS } from './input.animations';

let nextId = 0;
const MIN_WIDTH = 60;

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

@Component({
  selector: 'ngx-input',
  exportAs: 'ngxInput',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: INPUT_ANIMATIONS,
  providers: [INPUT_VALUE_ACCESSOR, INPUT_VALIDATORS]
})
export class InputComponent implements AfterViewInit, ControlValueAccessor, Validator {
  static ngAcceptInputType_tabindex: NumericInput;
  static ngAcceptInputType_min: NumericInput;
  static ngAcceptInputType_max: NumericInput;
  static ngAcceptInputType_minlength: NumericInput;
  static ngAcceptInputType_maxlength: NumericInput;
  static ngAcceptInputType_minWidth: NumericInput;
  static ngAcceptInputType_marginless: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_autoCorrect: BooleanInput;
  static ngAcceptInputType_autofocus: BooleanInput;
  static ngAcceptInputType_autocomplete: BooleanInput;
  static ngAcceptInputType_autosize: BooleanInput;
  static ngAcceptInputType_spellcheck: BooleanInput;
  static ngAcceptInputType_passwordToggleEnabled: BooleanInput;

  @Input() id = `input-${++nextId}`;

  @Input() name?: string;
  @Input() label = '';
  @Input() hint?: string;
  @Input() placeholder = '';

  @InputNumeric()
  @Input()
  tabindex?: number;

  @InputNumeric()
  @Input()
  min?: number;

  @InputNumeric()
  @Input()
  max?: number;

  @InputNumeric()
  @Input()
  minlength?: number;

  @InputNumeric()
  @Input()
  maxlength?: number;

  @InputEnum(Size)
  @Input('size')
  _size!: EnumKey<typeof Size>;
  size = Size.small;

  @InputEnum(Appearance)
  @Input('appearance')
  _appearance!: EnumKey<typeof Appearance>;
  appearance = Appearance.legacy;

  @InputNumeric(MIN_WIDTH)
  @Input()
  minWidth = MIN_WIDTH;

  @HostBinding('class.marginless')
  @InputBoolean()
  @Input()
  marginless = false;

  @InputBoolean()
  @Input()
  disabled = false;

  @Input() requiredIndicator: string | boolean = '*';
  @InputBoolean()
  @Input()
  required = false;

  @InputBoolean()
  @Input()
  autoSelect = false;

  @InputBoolean()
  @Input()
  autofocus = false;

  @InputBoolean()
  @Input()
  autocomplete = false;

  @InputBoolean()
  @Input()
  autocorrect = false;

  @HostBinding('class.autosize')
  @InputBoolean()
  @Input()
  autosize = false;

  @InputBoolean()
  @Input()
  spellcheck = false;

  @Input() set unlockable(v: boolean) {
    this._unlockable = coerceBooleanProperty(v);
    if (this._unlockable) {
      this.disabled = true;
    }
  }

  get unlockable(): boolean {
    return this._unlockable;
  }

  private _unlockable = false;

  @Input() unlockableTooltip = 'Click to unlock';

  @InputBoolean()
  @Input()
  passwordToggleEnabled = false;

  @Input() set passwordTextVisible(v: boolean) {
    this._passwordTextVisible = coerceBooleanProperty(v);
    this.updateInputType();
  }

  get passwordTextVisible(): boolean {
    return this._passwordTextVisible;
  }

  private _passwordTextVisible = false;

  @Input() set type(v: EnumKey<typeof InputTypes>) {
    this._type = InputTypes[v];
    this.updateInputType();
  }

  get inputType(): InputTypes {
    return this._type;
  }

  private _type = InputTypes.text;
  readonly type$ = new BehaviorSubject<InputTypes>(this._type);

  @Output() change = new EventEmitter<string | number>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<Event>();
  @Output() select = new EventEmitter<FocusEvent>();

  @ViewChild('inputControl')
  readonly inputControl?: ElementRef<HTMLInputElement>;

  @ViewChild('inputModel') readonly inputModel?: NgModel;

  @ViewChild('textareaControl')
  readonly textareaControl?: ElementRef<HTMLTextAreaElement>;

  private _value: string | number = '';

  get value(): string | number {
    return this._value;
  }

  set value(val: string | number) {
    if (val !== this._value) {
      this._value = this._type === InputTypes.number ? coerceNumberProperty(val, '') : val;
      this.onChangeCallback(this._value);
    }
  }

  @HostBinding('class.focused')
  focused = false;

  @HostBinding('class.ngx-input') hostClass = true;

  @HostBinding('class.legacy') get legacyClass() {
    return this.appearance === Appearance.legacy;
  }

  @HostBinding('class.fill') get fillClass() {
    return this.appearance === Appearance.fill;
  }

  @HostBinding('class.sm') get smallClass() {
    return this.size === Size.small;
  }

  @HostBinding('class.md') get mediumClass() {
    return this.size === Size.medium;
  }

  @HostBinding('class.lg') get largeClass() {
    return this.size === Size.large;
  }

  @HostBinding('class.no-label') get noLabelClass() {
    return !this.label;
  }

  @HostBinding('class.ng-dirty')
  get focusedOrDirty(): boolean {
    if (this.focused) {
      return true;
    }

    if (typeof this.value === 'string') {
      return !!this.value && !!this.value.length;
    }

    return typeof this.value !== 'undefined' && this.value !== null;
  }

  @HostBinding('class.ng-touched')
  get isTouched(): boolean {
    return this.inputModel ? this.inputModel.touched === true : false;
  }

  get labelState(): string {
    return this.placeholder || this.focusedOrDirty || this.appearance === Appearance.fill ? 'outside' : 'inside';
  }

  get underlineState(): string {
    return this.focused ? 'expanded' : 'collapsed';
  }

  get element() {
    return this.type === InputTypes.textarea ? this.textareaControl : this.inputControl;
  }

  constructor(private readonly cdr: ChangeDetectorRef, @Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.autofocus) {
      queueForNextRender(() => {
        this.element?.nativeElement.focus();
        // sometimes the label doesn't update on load
        this.cdr.markForCheck();
      });
    }
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
      queueForNextRender(() => {
        this.element?.nativeElement.select();
      });
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

    if (this.max && this.min) {
      return {
        ...Validators.max(this.max)(c),
        ...Validators.min(this.min)(c)
      };
    }

    if (this.max) {
      return { ...Validators.max(this.max)(c) };
    }

    if (this.min) {
      return { ...Validators.min(this.min)(c) };
    }

    return null;
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
    this.element?.nativeElement.focus();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  increment(event: MouseEvent) {
    event.preventDefault();

    if (!this.disabled) {
      const el = this.element!.nativeElement as HTMLInputElement;
      if (this.max) {
        const max = +this.max;
        if ((max || max === 0) && +el.value >= max) return;
      }

      el.value = el.value ? (+el.value + 1).toString() : '1';
      this.value = el.value;
      this.change.emit(this._value);
      if (this.document.activeElement !== this.inputControl!.nativeElement) {
        this.inputControl!.nativeElement.focus();
      }
    }
  }

  decrement(event: MouseEvent) {
    event.preventDefault();

    if (!this.disabled) {
      const el = this.element!.nativeElement as HTMLInputElement;
      if (this.min) {
        const min = +this.min;
        if (min || min === 0) {
          if (min === 0 && !el.value) {
            el.value = '0';
            this.value = el.value;
            this.change.emit(this._value);
            this.inputControl!.nativeElement.focus();
            return;
          } else if (+el.value <= min) {
            return;
          }
        }
      }

      el.value = el.value ? (+el.value - 1).toString() : '-1';
      this.value = el.value;
      this.change.emit(this._value);
      if (this.document.activeElement !== this.inputControl!.nativeElement) {
        this.inputControl!.nativeElement.focus();
      }
    }
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: unknown) => void = () => {
    // placeholder
  };

  private updateInputType() {
    this.type$.next(this.passwordTextVisible && InputTypes.password === this._type ? InputTypes.text : this._type);
  }
}
