import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  exportAs: 'ngxInputHint',
  selector: 'ngx-input-hint'
})
export class InputHintDirective {}
