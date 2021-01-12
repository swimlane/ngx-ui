import { Directive, TemplateRef } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({
  exportAs: 'ngxSelectOptionTemplate',
  selector: '[ngx-select-option-template]'
})
export class SelectOptionTemplateDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
