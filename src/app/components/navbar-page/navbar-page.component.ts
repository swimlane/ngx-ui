import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar-page',
  templateUrl: './navbar-page.component.html',
  styles: [
    `
      .navbar-page--container {
        display: flex;
        justify-content: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarPageComponent {
  activeBottom = 0;
  activeTop = 0;
}
