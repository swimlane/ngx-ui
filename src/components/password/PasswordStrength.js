import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

import zxcvbn from 'zxcvbn';
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
          class="password-strength-input password-strength-password full-width"
          [id]="id + '-pass'"
          [name]="name"
          [placeholder]="placeholder"
          [value]="value"
          (keyup)="onKeyUp($event)"
          required
        />
        <input
          type="text"
          [hidden]="!textVisible"
          class="password-strength-input password-strength-txt full-width"
          [id]="id + '-txt'"
          [name]="name"
          [placeholder]="placeholder"
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
        [value]="score"
        class="password-strength-meter">
        <div
          class="meter-text"
          [hidden]="!showMessage"
          [innerHTML]="message">
        </div>
      </meter>
    </div>
  `
})
export class PasswordStrength {

  @Input() id = `pstrength-${++nextId}`;
  @Input() name = null;
  @Input() value = '';
  @Input() placeholder = '';
  @Input() showMessage = true;
  @Input() showAscent = true;

  @Output() onChange = new EventEmitter();

  @HostBinding('class')
  get cssClasses() {
    let clz = 'password-strength';

    if(this.value.length) {
      clz += ' has-value';
    }

    if(this.showAscent) {
      clz += ' ascent-score';
    }

    clz += ` score-${this.score}`;

    return clz;
  }

  get score() {
    if(!this.results) return 0;
    return this.results.score;
  }

  get message() {
    if(!this.results || !this.value.length)
      return 'Strong passwords are required';

    let msg;
    if(this.score === 0 || this.score === 1) {
      msg = 'Weak Password';
    } else if(this.score === 2 || this.score === 3) {
      msg = 'Average Password';
    } else if(this.score === 4) {
      msg = 'Strong Password';
    }

    msg = `<strong>${msg}</strong>`;

    if(this.results.feedback.warning) {
      msg = `${msg} | ${this.results.feedback.warning}`;
    }

    return msg;
  }

  ngOnInit() {
    // ensure default population
    if(!this.value) this.value = '';
  }

  onKeyUp(event) {
    const value = event.target.value;
    this.value = value;
    this.results = zxcvbn(value);

    this.onChange.emit({
      value,
      results: this.results
    });
  }

}
