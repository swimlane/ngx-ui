import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-inputs',
  templateUrl: './inputs.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class InputsComponent {
  searchInputValue = '';
  inputValue = 'A Value';
  longInputValue = 'A very long input value that should be autosized';
  inputValue1: string;
  inputValue2: string;
  inputValue3: string;
  input5: string;
  inputDefaultVal = 'Defaulted!';
  numericValue: number;
  usernameValue: string;
  passwordValue: string;
  output: string;
  patternValue = 'Try removing all the spaces';
}
