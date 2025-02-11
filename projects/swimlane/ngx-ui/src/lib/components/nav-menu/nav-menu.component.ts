import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  exportAs: 'ngxNavMenu',
  selector: 'ngx-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  host: {
    class: 'ngx-nav-menu',
    '[class.expanded]': 'expanded'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NavMenuComponent {
  @Input()
  get expanded() {
    return this._expanded;
  }
  set expanded(expanded) {
    this._expanded = coerceBooleanProperty(expanded);
  }
  private _expanded = false;
}
