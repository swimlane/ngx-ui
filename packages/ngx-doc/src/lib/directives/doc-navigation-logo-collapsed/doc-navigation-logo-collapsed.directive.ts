import { Directive, HostBinding } from '@angular/core';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';
import { DocNavigationLogoDirective } from '../doc-navigation-logo/doc-navigation-logo.directive';

@Directive({
  selector: '[ngxDocNavigationLogoCollapsed]',
})
export class DocNavigationLogoCollapsedDirective {
  @HostBinding('class.logo-collapsed') hostClass = true;

  constructor(readonly logoDirective: DocNavigationLogoDirective) {
    queueForNextRender(() => {
      logoDirective.hasLogoCollapsed$.next(true);
    });
  }
}
