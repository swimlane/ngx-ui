import { Component } from '@angular/core';

@Component({
  selector: 'app-inputs-page',
  templateUrl: './inputs-page.component.html'
})
export class InputsPageComponent {
  
  searchInputValue: string = '';
  inputValue: any = 'A Value';
  inputValue1: any;
  inputValue2: any;
  inputValue3: any;
  input5: any;
  inputDefaultVal: string = 'Defaulted!';
  numericValue: any;
  usernameValue: any;
  passwordValue: any;

}

