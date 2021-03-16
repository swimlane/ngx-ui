import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxStepContent]',
  exportAs: 'ngxStepContent',
})
export class StepContentDirective {
  constructor(readonly template: TemplateRef<unknown>) {}
}
