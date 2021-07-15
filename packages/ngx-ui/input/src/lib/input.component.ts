import { coerceNumberProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
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
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgModel,
  Validators,
} from '@angular/forms';
import {
  AppearanceControllerDirective,
  NGX_APPEARANCE_CONTROLLER_PROVIDER,
  NGX_APPEARANCE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/appearance';
import {
  AutofocusControllerDirective,
  NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
  NGX_AUTOFOCUS_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/autofocus';
import {
  AutosizeControllerDirective,
  NGX_AUTOSIZE_CONTROLLER_PROVIDER,
  NGX_AUTOSIZE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/autosize';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import {
  InputAttributeControllerDirective,
  NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
  NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/input-attribute';
import { NGX_MARGINLESS_CONTROLLER_PROVIDER } from '@swimlane/ngx-ui/marginless';
import { NGX_SIZE_CONTROLLER_PROVIDER } from '@swimlane/ngx-ui/size';
import { Appearance, InputType } from '@swimlane/ngx-ui/typings';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';
import { INPUT_ANIMATIONS } from './constants';

let nextId = 0;

const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

const INPUT_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'ngx-input',
  exportAs: 'ngxInput',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [INPUT_ANIMATIONS],
  providers: [
    INPUT_VALUE_ACCESSOR,
    INPUT_VALIDATORS,
    NGX_SIZE_CONTROLLER_PROVIDER,
    NGX_APPEARANCE_CONTROLLER_PROVIDER,
    NGX_MARGINLESS_CONTROLLER_PROVIDER,
    NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
    NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
    NGX_AUTOSIZE_CONTROLLER_PROVIDER,
  ],
})
export class InputComponent implements ControlValueAccessor {
  static ngAcceptInputType_autoSelect: BooleanInput;

  @HostBinding('class.ngx-input') hostClass = true;

  @Input() id = `input-${++nextId}`;
  @Input() name = '';

  @NgxBooleanInput()
  @Input()
  autoSelect = false;

  @Output() inputChange = new EventEmitter<string | number>();
  @Output() inputBlur = new EventEmitter<FocusEvent>();
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  @Output() inputKeyup = new EventEmitter<KeyboardEvent>();
  @Output() inputClick = new EventEmitter<MouseEvent>();
  @Output() inputSelect = new EventEmitter<FocusEvent>();

  @ViewChild('inputControl') set inputControl(v: ElementRef<HTMLInputElement>) {
    if (v?.nativeElement) {
      this.autofocusController.focusableElement = v.nativeElement;
      this.element = v.nativeElement;
    }
  }

  @ViewChild('textareaControl') set textareaControl(
    v: ElementRef<HTMLTextAreaElement>
  ) {
    if (v?.nativeElement) {
      this.autofocusController.focusableElement = v.nativeElement;
      this.element = v.nativeElement;
    }
  }

  @ViewChild('inputModel') readonly inputModel?: NgModel;

  readonly InputType = InputType;

  private _value: string | number = '';

  get value(): string | number {
    return this._value;
  }

  set value(val: string | number) {
    if (val !== this._value) {
      this._value =
        this.inputAttributeController.type === InputType.number
          ? coerceNumberProperty(val)
          : val;
      this.onChangeCallback(this._value);
    }
  }

  @HostBinding('class.focused') get focusedClass() {
    return this.focused;
  }

  focused = false;

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
    return this.inputModel ? !!this.inputModel.touched : false;
  }

  get labelState(): string {
    return this.inputAttributeController.placeholder ||
      this.focusedOrDirty ||
      this.appearanceController?.appearance === Appearance.fill
      ? 'outside'
      : 'inside';
  }

  get underlineState(): string {
    return this.focused ? 'expanded' : 'collapsed';
  }

  private element?: HTMLTextAreaElement | HTMLInputElement;

  constructor(
    @Inject(NGX_APPEARANCE_WATCHED_CONTROLLER)
    public readonly appearanceController: AppearanceControllerDirective,
    @Inject(NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER)
    public readonly inputAttributeController: InputAttributeControllerDirective,
    @Inject(NGX_AUTOFOCUS_WATCHED_CONTROLLER)
    public readonly autofocusController: AutofocusControllerDirective,
    @Inject(NGX_AUTOSIZE_WATCHED_CONTROLLER)
    public readonly autosizeController: AutosizeControllerDirective,
    private readonly cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  onChange(event: Event): void {
    event.stopPropagation();
    this.inputChange.emit(this.value);
  }

  onKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();
    this.inputKeyup.emit(event);
  }

  onFocus(event: FocusEvent): void {
    event.stopPropagation();
    this.focused = true;

    if (this.autoSelect) {
      queueForNextRender(() => this.element?.select());
      this.inputSelect.emit(event);
    }

    this.inputFocus.emit(event);
    this.onTouchedCallback();
  }

  onBlur(event: FocusEvent): void {
    event.stopPropagation();

    this.focused = false;
    this.inputBlur.emit(event);
  }

  validate(c: FormControl) {
    if (this.inputAttributeController.type !== InputType.number) {
      return null;
    }

    if (
      this.inputAttributeController.min &&
      this.inputAttributeController.max
    ) {
      return {
        ...Validators.max(this.inputAttributeController.max)(c),
        ...Validators.min(this.inputAttributeController.min)(c),
      };
    }

    return null;
  }

  writeValue(val: string): void {
    if (val !== this._value) {
      this._value = val;
    }

    this.cdr.markForCheck();
  }

  registerOnChange(fn: (val: string | number) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.inputAttributeController.disabled = isDisabled;
  }

  togglePassword(): void {
    this.inputAttributeController.togglePasswordVisible();
    this.element?.focus();
  }

  increment(event: MouseEvent) {
    event.preventDefault();

    if (!this.inputAttributeController.disabled) {
      const el = this.element as HTMLInputElement;
      if (this.inputAttributeController.max) {
        const max = +this.inputAttributeController.max;
        if ((max || max === 0) && +el.value >= max) return;
      }

      el.value = el.value ? (+el.value + 1).toString() : '1';
      this.value = el.value;
      this.inputChange.emit(this._value);
      if (this.document.activeElement !== this.element) {
        this.element?.focus();
      }
    }
  }

  decrement(event: MouseEvent) {
    event.preventDefault();

    if (!this.inputAttributeController.disabled) {
      const el = this.element as HTMLInputElement;
      if (this.inputAttributeController.min) {
        const min = +this.inputAttributeController.min;
        if (min || min === 0) {
          if (min === 0 && !el.value) {
            el.value = '0';
            this.value = el.value;
            this.inputChange.emit(this._value);
            this.element?.focus();
            return;
          } else if (+el.value <= min) {
            return;
          }
        }
      }

      el.value = el.value ? (+el.value - 1).toString() : '-1';
      this.value = el.value;
      this.inputChange.emit(this._value);
      if (this.document.activeElement !== this.element) {
        this.element?.focus();
      }
    }
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: string | number) => void = () => {
    // placeholder
  };
}
