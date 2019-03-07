import { Directive, TemplateRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[ngx-select-option-template]' })
export class SelectOptionTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
