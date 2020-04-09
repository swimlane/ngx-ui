import { Directive, TemplateRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({
  exportAs: 'ngxSelectOptionInputTemplate',
  selector: '[ngx-select-option-input-template]',
})
export class SelectOptionInputTemplateDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
