import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DropdownComponent } from '../dropdown.component';
import { DropdownModule } from '../dropdown.module';
import { CommonModule } from '@angular/common';

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
  standalone: true,
  imports: [DropdownModule, CommonModule]
})
export class DropdownComponentFixture {
  @ViewChild(DropdownComponent, { static: false })
  readonly dropdown: DropdownComponent;

  readonly hasToggler$ = new BehaviorSubject(true);
}
