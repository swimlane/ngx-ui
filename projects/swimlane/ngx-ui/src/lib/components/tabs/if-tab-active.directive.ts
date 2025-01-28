import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxIfTabActive]',
  standalone: false
})
export class IfTabActiveDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
