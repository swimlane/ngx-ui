import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
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
import { BehaviorSubject } from 'rxjs';

import { coerceBoolean } from '@swimlane/ngx-ui/utils';
import { InputTypes } from './input-types.enum';

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

@Component({
  exportAs: 'ngxInput',
  selector: 'ngx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: { class: 'ngx-input' },
  providers: [INPUT_VALUE_ACCESSOR, INPUT_VALIDATORS],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('labelState', [
      state(
        'inside',
        style({
          'font-size': '1em',
          top: '0'
        })
      ),
      state(
        'outside',
        style({
          'font-size': '.7rem',
          top: '-15px'
        })
      ),
      transition('inside => outside', animate('150ms ease-out')),
      transition('outside => inside', animate('150ms ease-out'))
    ]),
    trigger('underlineState', [
      state(
        'collapsed',
        style({
          width: '0%'
        })
      ),
      state(
        'expanded',
        style({
          width: '100%'
        })
      ),
      transition('collapsed => expanded', animate('150ms ease-out')),
      transition('expanded => collapsed', animate('150ms ease-out'))
    ])
  ]
})
export class InputComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
  @Input() id: string = `input-${++nextId}`;
  @Input() name: string;
  @Input() label: string = '';
  @Input() hint: string;
  @Input() placeholder: string = '';
  @Input() tabindex: number;
  @Input()
  get disabled() { return this._disabled; }
  set disabled(disabled: boolean) {
    this._disabled = coerceBoolean(disabled);
  }

  @Input() min: number;
  @Input() max: number;

  @Input() minlength: number;
  @Input() maxlength: number;

  @Input() required: boolean = false;
  @Input() requiredIndicator: string | boolean = '*';

  @Input() passwordToggleEnabled: boolean = false;
  @Input()
  get passwordTextVisible() { return this._passwordTextVisible }
  set passwordTextVisible(p: boolean) {
    this._passwordTextVisible = coerceBoolean(p);
    this.updateInputType();
  }

  @Input() autoSelect: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() autocomplete: boolean = false;
  @Input() autocorrect: boolean = false;
  @Input() spellcheck: boolean = false;

  @Input()
  get type() { return this._type; }
  set type(type: InputTypes) {
    this._type = type;
    this.updateInputType();
  }

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() keyup = new EventEmitter();
  @Output() click = new EventEmitter();

  @ViewChild('inputControl', { static: false }) readonly inputControl: ElementRef<HTMLInputElement>;
  @ViewChild('inputModel', { static: false }) readonly inputModel: NgModel;
  @ViewChild('textareaControl', { static: false }) readonly textareaControl: ElementRef<HTMLTextAreaElement>;

  get value(): string { return this._value; }
  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
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
    return this.placeholder || this.focusedOrDirty ? 'outside' : 'inside';
  }

  get underlineState(): string {
    return this.focused ? 'expanded' : 'collapsed';
  }

  get requiredIndicatorView(): string {
    return (!this.requiredIndicator || !this.required) ? '' : this.requiredIndicator as string;
  }

  get element() {
    return this.type === InputTypes.textarea ? this.textareaControl : this.inputControl;
  }

  focused: boolean = false;
  readonly type$ = new BehaviorSubject<InputTypes>(undefined);

  private _value: string;
  private _type: InputTypes = InputTypes.text;
  private _passwordTextVisible: boolean = false;
  private _disabled: boolean = false;

  constructor(private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.value) this.value = '';
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      setTimeout(() => this.element.nativeElement.focus());
    }

    // sometimes the label doesn't update on load
    setTimeout(() => this.cdr.markForCheck());
  }

  ngOnChanges(changes: any) {
    if ('max' in changes || 'min' in changes) {
      this.onChangeCallback(this._value);
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

    if (this.autoSelect) {
      setTimeout(() => this.element.nativeElement.select());
    }

    this.focused = true;
    this.focus.emit(event);
    this.onTouchedCallback();
  }

  onBlur(event: Event): void {
    event.stopPropagation();

    this.focused = false;
    this.blur.emit(event);
  }

  validate(c: FormControl) {
    if (this.type !== 'number') {
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
    this.disabled = isDisabled;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  private updateInputType() {
    this.type$.next(this.passwordTextVisible && this.type === InputTypes.password ? InputTypes.text : this.type);
  }
}
