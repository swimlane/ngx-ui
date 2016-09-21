import {
  Component,
  Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate,
  OnInit,
  OnChanges
} from '@angular/core';

import { InputTypes } from './input-types';
import './input.scss';

let nextId = 0;

@Component({
  selector: 'swui-input',
  template: `
    <div
      class="sw-input-wrap"
      [class.ng-valid]="input.valid && input.touched"
      [class.ng-invalid]="input.invalid && input.touched">

      <input
        ngControl="id"
        type="text"
        class="sw-input full-width"
        [hidden]="passwordTextVisible"
        [id]="id"
        [name]="name"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        [disabled]="disabled"
        [type]="type"
        (keyup)="onKeyUp($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (click)="click.emit($event)"
        [required]="required"
        #input="ngModel"
      />

      <input
        *ngIf="passwordTextVisible"
        ngControl="id"
        type="text"
        class="sw-input full-width"
        [id]="id"
        [placeholder]="placeholder"
        spellcheck="false"
        autocomplete="false"
        [name]="name"
        [(ngModel)]="value"
        [disabled]="disabled"
        type="text"
        (keyup)="onKeyUp($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (click)="click.emit($event)"
        [required]="required"
        #inputText="ngModel"
      />

      <span
        *ngIf="type === 'password' && passwordToggleEnabled"
        class="icon-eye"
        title="Toggle Text Visibility"
        (click)="passwordTextVisible = !passwordTextVisible">
      </span>

      <span
        class="sw-input-label"
        [@labelState]="labelState">
        {{label}} {{ required ? '*' : '' }}
      </span>

      <div class="sw-input-underline">
        <div
          class="underline-fill"
          [@underlineState]="underlineState">
        </div>
      </div>

      <span class="sw-input-hint">
        {{hint}}
      </span>
    </div>
  `,
  animations: [
    trigger('labelState', [
      state('inside', style({
        'font-size': '18px',
        top: '0px',
      })),
      state('outside',   style({
        'font-size': '11px',
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
export class InputComponent implements OnInit, OnChanges {

  @Input() id: string = `input-${++nextId}`;
  @Input() name: any = null;
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() type: InputTypes = InputTypes.text;
  @Input() hint: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() passwordToggleEnabled: boolean = true;
  @Input() passwordTextVisible: boolean = false;

  @Output() onChange = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() keyup = new EventEmitter();
  @Output() click = new EventEmitter();

  private labelState: string;
  private underlineState: string;
  private focused: boolean = false;

  ngOnInit() {
    if(!this.value) this.value = '';
    this.updateState();
  }

  ngOnChanges(change) {
    if(change.value && change.value.currentValue) {
      this.updateState();
    }
  }

  onKeyUp(event) {
    const value = event.target.value;
    this.onChange.emit(value);
    this.keyup.emit(event);
  }

  onFocus(event) {
    this.focused = true;
    this.updateState();
    this.focus.emit(event);
  }

  onBlur(event) {
    this.focused = false;
    this.updateState();
    this.blur.emit(event);
  }

  updateState() {
    let focusOrDirty = this.focused || this.value.length;

    if (focusOrDirty) {
      this.labelState = 'outside';
    } else {
      this.labelState = 'inside';
    }

    if (this.focused) {
      this.underlineState = 'expanded';
    } else {
      this.underlineState = 'collapsed';
    }
  }

}
