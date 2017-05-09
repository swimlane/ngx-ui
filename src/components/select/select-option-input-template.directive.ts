import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-select-option-input-template]' })
export class SelectOptionInputTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
