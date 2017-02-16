import {
  Component, Input, Output, EventEmitter, trigger, HostBinding,
  state, style, transition, animate, OnInit, OnChanges, ViewEncapsulation,
  forwardRef, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { InputTypes } from './input-types';

let nextId = 0;

const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'ngx-input',
  providers: [INPUT_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./input.component.scss'],
  template: `
    <div
      class="ngx-input-wrap"
      [ngClass]="getCssClasses">
      <div class="ngx-input-box-wrap">
        <textarea
          *ngIf="type === 'textarea'"
          class="ngx-input-textarea"
          rows="1"
          autosize
          [(ngModel)]="value"
          [id]="id"
          [name]="name"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [attr.tabindex]="tabindex"
          [attr.autocomplete]="autocomplete"
          [attr.autocorrect]="autocorrect"
          [attr.spellcheck]="spellcheck"
          [required]="required"
          (change)="onChange($event)"
          (keyup)="onKeyUp($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (click)="click.emit($event)"
          #inputModel="ngModel"
          #textareaControl>
        </textarea>
        <input
          *ngIf="type !== 'textarea'"
          class="ngx-input-box"
          [(ngModel)]="value"
          [hidden]="passwordTextVisible"
          [id]="id"
          [name]="name"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [type]="type"
          [min]="min"
          [max]="max"
          [attr.tabindex]="tabindex"
          [attr.autocomplete]="autocomplete"
          [attr.autocorrect]="autocorrect"
          [attr.spellcheck]="spellcheck"
          (change)="onChange($event)"
          (keyup)="onKeyUp($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (click)="click.emit($event)"
          [required]="required"
          #inputModel="ngModel"
          #inputControl
        />
        <input
          *ngIf="passwordToggleEnabled"
          [hidden]="!passwordTextVisible"
          type="text"
          class="ngx-input-box"
          type="text"
          [id]="id"
          [placeholder]="placeholder"
          [name]="name"
          [disabled]="disabled"
          [attr.autocomplete]="autocomplete"
          [attr.autocorrect]="autocorrect"
          [attr.spellcheck]="spellcheck"
          [attr.tabindex]="tabindex"
          [(ngModel)]="value"
          (change)="onChange($event)"
          (keyup)="onKeyUp($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (click)="click.emit($event)"
          [required]="required"
          #inputTextModel="ngModel"
          #passwordControl
        />
        <span
          *ngIf="type === 'password' && passwordToggleEnabled"
          class="icon-eye"
          title="Toggle Text Visibility"
          (click)="togglePassword()">
        </span>
      </div>
      <span
        class="ngx-input-label"
        [@labelState]="labelState">
        <span [innerHTML]="label"></span> <span [innerHTML]="requiredIndicatorView"></span>
      </span>
      <div class="ngx-input-underline">
        <div
          class="underline-fill"
          [@underlineState]="underlineState">
        </div>
      </div>
      <div class="ngx-input-hint">
        <span *ngIf="hint" [innerHTML]="hint"></span>
        <ng-content select="ngx-input-hint"></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('labelState', [
      state('inside', style({
        'font-size': '1rem',
        top: '0',
      })),
      state('outside',   style({
        'font-size': '.7rem',
        top: '-15px',
      })),
      transition('inside => outside', animate('150ms ease-out')),
      transition('outside => inside', animate('150ms ease-out'))
    ]),
    trigger('underlineState', [
      state('collapsed', style({
        width: '0%',
      })),
      state('expanded',   style({
        width: '100%',
      })),
      transition('collapsed => expanded', animate('150ms ease-out')),
      transition('expanded => collapsed', animate('150ms ease-out'))
    ])
  ]
})
export class InputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() id: string = `input-${++nextId}`;
  @Input() name: string;
  @Input() label: string = '';
  @Input() type: InputTypes = InputTypes.text;
  @Input() hint: string;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() tabindex: number;

  @Input() min: number;
  @Input() max: number;

  @Input() required: boolean = false;
  @Input() requiredIndicator: string|boolean = '*';

  @Input() passwordToggleEnabled: boolean = false;
  @Input() passwordTextVisible: boolean = false;

  @Input() autofocus: boolean = false;
  @Input() autocomplete: boolean = false;
  @Input() autocorrect: boolean = false;
  @Input() spellcheck: boolean = false;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() keyup = new EventEmitter();
  @Output() click = new EventEmitter();

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this._value);
    }
  }

  get focusedOrDirty(): any {
    return this.focused || (this.value && this.value.length);
  }

  @HostBinding('class')
  get getHostCssClasses(): string {
    return 'ngx-input';
  }

  get isInvalid(): boolean {
    return this.inputModel && 
      this.inputModel.invalid;
  }

  get isValid(): boolean {
    return this.inputModel && 
      this.inputModel.valid;
  }

  get isTouched(): boolean {
    return this.inputModel && 
      this.inputModel.touched;
  }

  get getCssClasses(): any {
    if(!this.inputModel) return {};

    return {
      'ng-invalid': this.isInvalid,
      'ng-touched': this.isTouched,
      'ng-valid': this.isValid
    };
  }

  @ViewChild('inputModel')
  inputModel: NgModel;

  @ViewChild('inputControl')
  inputControl: ElementRef;

  @ViewChild('textareaControl')
  textareaControl: ElementRef;

  @ViewChild('passwordControl')
  passwordControl: ElementRef;

  get labelState(): string {
    if (this.focusedOrDirty) return 'outside';
    return 'inside';
  }

  get underlineState(): string {
    if (this.focused) return 'expanded';
    return 'collapsed';
  }

  get requiredIndicatorView(): string {
    if(!this.requiredIndicator || !this.required) return '';
    return this.requiredIndicator as string;
  }

  get element(): any {
    if(this.type === InputTypes.textarea) return this.textareaControl;
    return this.inputControl;
  }

  focused: boolean = false;
  _value: string;

  ngOnInit(): void  {
    if(!this.value) this.value = '';
  }

  ngAfterViewInit(): void {
    if(this.autofocus) {
      setTimeout(() => {
        this.element.nativeElement.focus();
      });
    }
  }

  onChange(event): void  {
    event.stopPropagation();
    this.change.emit(this.value);
  }

  onKeyUp(event): void  {
    event.stopPropagation();
    this.keyup.emit(event);
  }

  onFocus(event): void  {
    event.stopPropagation();

    this.focused = true;
    this.focus.emit(event);
    this.onTouchedCallback();
  }

  onBlur(event): void  {
    event.stopPropagation();

    this.focused = false;
    this.blur.emit(event);
  }

  writeValue(val: string): void  {
    if (val !== this._value) {
      this._value = val;
    }
  }

  registerOnChange(fn: any): void  {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void  {
    this.onTouchedCallback = fn;
  }

  togglePassword(): void  {
    this.passwordTextVisible = !this.passwordTextVisible;

    setTimeout(() => {
      if(this.passwordTextVisible) {
        this.passwordControl.nativeElement.focus();
      } else {
        this.element.nativeElement.focus();
      }
    });
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  }

}
