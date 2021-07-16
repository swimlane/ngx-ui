import { Directive, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: 'ng-template[ngxDocNavigationLogo]',
})
export class DocNavigationLogoDirective {
  hasLogoCollapsed$ = new BehaviorSubject<boolean>(false);

  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
