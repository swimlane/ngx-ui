import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inputs-page',
  templateUrl: './inputs-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputsPageComponent {
  searchInputValue: string = '';
  inputValue: any = 'A Value';
  longInputValue = 'A very long input value that should be autosized';
  inputValue1: any;
  inputValue2: any;
  inputValue3: any;
  input5: any;
  inputDefaultVal: string = 'Defaulted!';
  numericValue: any;
  usernameValue: any;
  passwordValue: any;
  output: any;
  patternValue: string = 'Has space';
}
