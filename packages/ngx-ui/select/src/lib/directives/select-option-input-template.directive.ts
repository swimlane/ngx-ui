import { Directive, TemplateRef } from '@angular/core';

@Directive({
  exportAs: 'ngxSelectOptionInputTemplate',
  selector: '[ngx-select-option-input-template]'
})
export class SelectOptionInputTemplateDirective {
  constructor(readonly templateRef: TemplateRef<unknown>) {}
}
