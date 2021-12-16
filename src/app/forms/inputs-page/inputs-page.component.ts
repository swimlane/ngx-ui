import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Appearance } from '@swimlane/ngx-ui/mixins/appearance/appearance.enum';

@Component({
  selector: 'app-inputs-page',
  templateUrl: './inputs-page.component.html',
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
  output: any;
  patternValue = 'Has space';

  Appearance = Appearance;

  onClick(event: any) {
    console.log({ event });
  }
}
