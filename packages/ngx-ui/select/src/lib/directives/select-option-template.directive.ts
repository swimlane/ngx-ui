import { Directive, TemplateRef } from '@angular/core';

@Directive({
  exportAs: 'ngxSelectOptionTemplate',
  selector: '[ngx-select-option-template]',
})
export class SelectOptionTemplateDirective {
  constructor(readonly templateRef: TemplateRef<unknown>) {}
}
