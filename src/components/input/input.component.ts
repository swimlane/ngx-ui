import {
  Component,
  Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

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
        [id]="id"
        [name]="name"
        [(ngModel)]="value"
        [type]="type"
        (keyup)="onKeyUp($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (click)="click.emit($event)"
        [required]="required"
        #input="ngModel"
      />

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
export class InputComponent {
  @Input() id = `input-${++nextId}`;
  @Input() name = null;
  @Input() value = '';
  @Input() label = '';
  @Input() type: string = 'text';
  @Input() hint: string;
  @Input() required;

  @Output() onChange = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() keyup = new EventEmitter();
  @Output() click = new EventEmitter();

  labelState: string;
  underlineState: string;
  focused: boolean = false;

  ngOnInit() {
    if(!this.value) this.value = '';
    this.updateState();
  }

  onKeyUp(event) {
    let value = event.target.value;

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
    let focusOrDirty = this.focused || this.value.length > 0;
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
