import { ChangeDetectionStrategy, Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-inputs-page',
  templateUrl: './inputs-page.component.html',
  styleUrls: ['./inputs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputsPageComponent {
  searchInputValue = '';
  inputValue: any = 'A Value';
  longInputValue = 'A very long input value that should be autosized';
  inputValue1: any;
  inputValue2: any;
  inputValue3: any;
  input5: any;
  inputDefaultVal = 'Defaulted!';
  numericValue: any;
  usernameValue: any;
  passwordValue: any;
  secretValue = 'secret';
  output: any;
  patternValue = 'Has space';
  readonlyTextareaValue = lorem.words(100);

  onClick(event: any) {
    console.log({ event });
  }
}
