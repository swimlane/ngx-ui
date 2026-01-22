import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DropdownComponent } from '../dropdown.component';

@Component({
  selector: 'ngx-dropdown-fixture',
  template: `
    <ngx-dropdown showCaret>
      @if (hasToggler$ | async) {
        <ngx-dropdown-toggle>Button</ngx-dropdown-toggle>
      }
      <ngx-dropdown-menu class="pull-right">
        <ul>
          <li><a>...</a></li>
        </ul>
      </ngx-dropdown-menu>
    </ngx-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DropdownComponentFixture {
  @ViewChild(DropdownComponent, { static: false })
  readonly dropdown: DropdownComponent;

  readonly hasToggler$ = new BehaviorSubject(true);
}
