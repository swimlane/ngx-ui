import { Directive, TemplateRef } from '@angular/core';

@Directive({
  exportAs: 'ngxSelectOptionInputTemplate',
  selector: '[ngx-select-option-input-template]',
  standalone: false
})
export class SelectOptionInputTemplateDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
