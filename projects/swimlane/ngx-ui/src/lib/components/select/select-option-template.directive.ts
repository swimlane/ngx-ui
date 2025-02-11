import { Directive, TemplateRef } from '@angular/core';

@Directive({
  exportAs: 'ngxSelectOptionTemplate',
  selector: '[ngx-select-option-template]',
  standalone: false
})
export class SelectOptionTemplateDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
