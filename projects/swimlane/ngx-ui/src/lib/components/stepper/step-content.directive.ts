import { Directive, TemplateRef } from '@angular/core';

@Directive({
  exportAs: 'ngxStepContent',
  selector: 'ng-template[ngxStepContent]',
})
export class StepContentDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
