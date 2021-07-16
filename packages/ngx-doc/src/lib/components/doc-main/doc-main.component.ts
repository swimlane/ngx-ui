import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';
import { LoadingService } from '@swimlane/ngx-ui/loading';
import { filter, takeUntil } from 'rxjs/operators';
import { DocNavigationLogoDirective } from '../../directives/doc-navigation-logo/doc-navigation-logo.directive';
import { DocMenuItem } from '../../models';

@Component({
  selector: 'ngx-doc-main',
  templateUrl: './doc-main.component.html',
  styleUrls: ['./doc-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyedService],
})
export class DocMainComponent {
  static ngAcceptInputType_navigation: BooleanInput;
  static ngAcceptInputType_search: BooleanInput;
  static ngAcceptInputType_logo: BooleanInput;

  @HostBinding('class.ngx-doc-main') hostClass = true;

  @Input() mainTitle = '';
  @Input() subtitle = '';

  @NgxBooleanInput()
  @Input()
  navigation = true;

  @Input()
  navigationItems: DocMenuItem[] = [];

  @NgxBooleanInput()
  @Input()
  search = true;

  @NgxBooleanInput()
  @Input()
  logo = true;

  @ContentChild(DocNavigationLogoDirective)
  logoTemplate?: DocNavigationLogoDirective;

  navigationExpanded = true;

  constructor(
    private readonly destroyed: DestroyedService,
    readonly router: Router,
    readonly loadingService: LoadingService
  ) {
    router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        ),
        takeUntil(destroyed)
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          loadingService.start();
        } else {
          loadingService.complete(true);
        }
      });
  }
}
