import { Directive, TemplateRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[ngx-select-option-input-template]' })
export class SelectOptionInputTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
