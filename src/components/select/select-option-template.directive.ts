import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-select-option-template]' })
export class SelectOptionTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
