import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';

@Component({
  selector: 'ngx-nav-menu',
  exportAs: 'ngxNavMenu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent {
  static ngAcceptInputType_expanded: BooleanInput;

  @HostBinding('class.ngx-nav-menu') hostClass = true;

  @HostBinding('class.expanded')
  @NgxBooleanInput()
  @Input()
  expanded = false;
}
