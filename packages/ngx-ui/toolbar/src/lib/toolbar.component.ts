import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import type { ToolbarMenuItem } from './models';

@Component({
  selector: 'ngx-toolbar',
  exportAs: 'ngxToolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() mainTitle?: string;
  @Input() subtitle?: string;
  @Input() menu: ToolbarMenuItem[] = [];

  @HostBinding('class.ngx-toolbar') hostClass = true;

  get toolbarItems() {
    return this.menu.filter((m) => {
      return !m.dropdown;
    });
  }

  get dropdownItems() {
    return this.menu.filter((m) => {
      return m.dropdown;
    });
  }

  onMenuClicked(item: ToolbarMenuItem, $event: MouseEvent) {
    if (item.click) {
      item.click($event);
    }
  }
}
