import { Component, Input, Output, EventEmitter } from '@angular/core';
import owasp from 'owasp-password-strength-test';
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
      </meter>
      <p class="hint">
        Complex passwords are required
      </p>
    </div>
  `,
  host: {
    class: 'password-strength'
  }
})
export class PasswordStrength {

  @Input() id: string = `pstrength-${++nextId}`;
  @Input() name: string = null;
  @Input() value: string = '';

  @Output() onChange = new EventEmitter();

  get strength() {
    return 1;
  }

  ngOnInit() {
    // ensure default population
    if(!this.value) this.value = '';

    // setup config
    owasp.config({
      allowPassphrases: false,
      maxLength: 128,
      minLength: 10,
      minOptionalTestsToPass: 4
    });
  }

  onKeyUp(event) {
    const value = event.target.value;
    this.value = value;

    const results = owasp.test(value);

    this.onChange.emit({
      value,
      results
    });
  }

}
