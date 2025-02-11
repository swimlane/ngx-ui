import { ChangeDetectionStrategy, Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-inputs-page',
  templateUrl: './inputs-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
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
  longInputValueTextarea = lorem.paragraphs(2);

  onClick(event: any) {
    console.log({ event });
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
