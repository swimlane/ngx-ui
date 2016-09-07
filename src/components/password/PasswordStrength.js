import { Component, Input, Output, EventEmitter } from '@angular/core';
import './passwordStrength.scss';

let nextId = 0;

@Component({
  selector: 'password-strength',
  template: `
    <div>
      <div class="password-strength-input-wrap">
        <input
          type="password"
          [hidden]="textVisible"
          class="password-strength-input password-strength-password"
          [id]="id + '-pass'"
          [name]="name"
          [value]="value"
          (keyup)="onKeyUp($event)"
          required
        />
        <input
          type="text"
          [hidden]="!textVisible"
          class="password-strength-input password-strength-txt"
          [id]="id + '-txt'"
          [name]="name"
          [value]="value"
          (keyup)="onKeyUp($event)"
          required
        />
        <span
          class="icon-eye"
          title="Toggle Text Visibility"
          (click)="textVisible = !textVisible">
        </span>
      </div>
      <meter
        max="4"
        [value]="strength"
        class="password-strength-meter">
        <div class="meter-text">{{message}}</div>
      </meter>
    </div>
  `,
  host: {
    class: 'password-strength'
  }
})
export class PasswordStrength {

  @Input() id = `pstrength-${++nextId}`;
  @Input() name = null;
  @Input() value = '';

  @Input() minLength = 10;
  @Input() maxLength = 120;

  @Input() requireUppercase = true;
  @Input() requireLowercase = true;
  @Input() requireNumber = true;
  @Input() requireSpecialChars = true;

  @Output() onChange = new EventEmitter();

  get strength() {
    return 0;
  }

  get message() {
    return 'Complex passwords are required';
  }

  ngOnInit() {
    // ensure default population
    if(!this.value) this.value = '';
  }

  onKeyUp(event) {
    const value = event.target.value;
    this.value = value;

    const results = {};

    this.onChange.emit({
      value,
      results
    });
  }

}
