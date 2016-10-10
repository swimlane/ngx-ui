import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import * as zxcvbn from 'zxcvbn';
import './complexity-meter.scss';

@Component({
  selector: 'swui-complexity-meter',
  template: `
    <meter
      max="4"
      [value]="score"
      [class]="cssClass">
      <div
        class="meter-text"
        [hidden]="!showMessage"
        [innerHTML]="message">
      </div>
    </meter>
  `,
  host: {
    class: 'swui-complexity-meter'
  }
})
export class ComplexityMeterComponent implements OnInit, OnChanges {

  @Input() value: string = '';
  @Input() showMessage: boolean = true;
  @Input() showAscent: boolean = true;

  @Output() onChange = new EventEmitter();

  private results: any;

  get score() {
    if(!this.results) return 0;
    return this.results.score;
  }

  get message() {
    if(!this.results || !this.value || !this.value.length)
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

  get cssClass() {
    let clz = 'meter-bar';

    clz += ` score-${this.score}`;

    if(this.value && this.value.length) {
      clz += ' has-value';
    }

    if(this.showAscent) {
      clz += ' ascented';
    }

    return clz;
  }

  ngOnInit() {
    // ensure default population
    if(!this.value) this.value = '';
  }

  ngOnChanges(change) {
    if(change.value && change.value.currentValue) {
      this.updateValue(change.value.currentValue);
    }
  }

  updateValue(value) {
    this.value = value;
    this.results = zxcvbn(value);

    this.onChange.emit({
      value,
      results: this.results
    });
  }

}
