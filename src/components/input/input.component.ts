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
    <div>
      <div class="sw-input-wrap">
        <input
          type="text"
          class="sw-input full-width"
          [id]="id"
          [name]="name"
          [(ngModel)]="value"
          (keyup)="onKeyUp($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          required
        />

        <span
          class="sw-input-label"
          [@labelState]="labelState">
          {{label}}
        </span>

        <div class="sw-input-underline">
          <div
            class="underline-fill"
            [@underlineState]="underlineState">
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('labelState', [
      state('inside', style({
        'font-size': '18px',
        top: '-30px',
      })),
      state('outside',   style({
        'font-size': '11px',
        top: '-45px',
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

  @Output() onChange = new EventEmitter();

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
  }

  onFocus(event) {
    this.focused = true;
    this.updateState();
  }

  onBlur(event) {
    this.focused = false;
    this.updateState();
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
