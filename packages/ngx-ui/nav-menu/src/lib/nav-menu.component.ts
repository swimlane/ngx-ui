import type { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';

@Component({
  selector: 'ngx-nav-menu',
  exportAs: 'ngxNavMenu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent {
  static ngAcceptInputType_expanded: BooleanInput;

  @HostBinding('class.ngx-nav-menu') hostClass = true;

  @HostBinding('class.expanded')
  @InputBoolean()
  @Input()
  expanded = false;
}
