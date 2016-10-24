import {
  Component, Input, Output, EventEmitter, trigger, HostBinding,
  state, style, transition, animate, OnInit, OnChanges,
  forwardRef, ViewChild, ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { InputTypes } from './input-types';
import './input.scss';

let nextId = 0;

const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'swui-input',
  providers: [INPUT_VALUE_ACCESSOR],
  template: `
    <div
      class="swui-input-wrap"
      [ngClass]="getCssClasses">
      <div class="swui-input-box-wrap">
        <input
          class="swui-input-box"
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
          class="swui-input-box"
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
        class="swui-input-label"
        [@labelState]="labelState">
        <span [innerHTML]="label"></span> <span [innerHTML]="requiredIndicatorView"></span>
      </span>
      <div class="swui-input-underline">
        <div
          class="underline-fill"
          [@underlineState]="underlineState">
        </div>
      </div>
      <div class="swui-input-hint">
        <span *ngIf="hint" [innerHTML]="hint"></span>
        <ng-content select="swui-input-hint"></ng-content>
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
export class InputComponent implements OnInit, ControlValueAccessor {

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

  @Input() passwordToggleEnabled: boolean = true;
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
  private get getHostCssClasses(): string {
    return 'swui-input';
  }

  private get getCssClasses(): any {
    return {
      'ng-invalid': this.inputModel.invalid,
      'ng-touched': this.inputModel.touched,
      'ng-valid': this.inputModel.valid
    };
  }

  @ViewChild('inputModel')
  private inputModel: NgModel;

  @ViewChild('inputControl')
  private inputControl: ElementRef;

  @ViewChild('passwordControl')
  private passwordControl: ElementRef;

  private get labelState(): string {
    if (this.focusedOrDirty) return 'outside';
    return 'inside';
  }

  private get underlineState(): string {
    if (this.focused) return 'expanded';
    return 'collapsed';
  }

  private get requiredIndicatorView(): string {
    if(!this.requiredIndicator || !this.required) return '';
    return this.requiredIndicator as string;
  }

  private focused: boolean = false;
  private _value: string;

  ngOnInit() {
    if(!this.value) this.value = '';
  }

  ngAfterViewInit() {
    if(this.autofocus) {
      setTimeout(() => {
        this.inputControl.nativeElement.focus();
      });
    }
  }

  onChange(event) {
    event.stopPropagation();
    this.change.emit(this.value);
  }

  onKeyUp(event) {
    event.stopPropagation();
    this.keyup.emit(event);
  }

  onFocus(event) {
    event.stopPropagation();

    this.focused = true;
    this.focus.emit(event);
    this.onTouchedCallback();
  }

  onBlur(event) {
    event.stopPropagation();

    this.focused = false;
    this.blur.emit(event);
  }

  writeValue(val: string) {
    if (val !== this._value) {
      this._value = val;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  togglePassword() {
    this.passwordTextVisible = !this.passwordTextVisible;

    setTimeout(() => {
      if(this.passwordTextVisible) {
        this.passwordControl.nativeElement.focus();
      } else {
        this.inputControl.nativeElement.focus();
      }
    });
  }

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

}
