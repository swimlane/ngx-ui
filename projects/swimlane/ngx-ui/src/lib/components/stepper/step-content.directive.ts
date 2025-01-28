import { Directive, TemplateRef } from '@angular/core';

@Directive({
  exportAs: 'ngxStepContent',
  selector: 'ng-template[ngxStepContent]',
  standalone: false
})
export class StepContentDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
