import { Directive, TemplateRef } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({
  exportAs: 'ngxSelectOptionInputTemplate',
  selector: '[ngx-select-option-input-template]'
})
export class SelectOptionInputTemplateDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
