import { Directive, TemplateRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({
  exportAs: 'ngxSelectOptionTemplate',
  selector: '[ngx-select-option-template]'
})
export class SelectOptionTemplateDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
