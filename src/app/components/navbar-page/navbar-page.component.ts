import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar-page',
  templateUrl: './navbar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarPageComponent {
  active = 0;

  setActive(act: number) {
    this.active = act;
  }
}
