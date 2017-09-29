import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxIfTabActive]'
})
export class IfTabActiveDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
