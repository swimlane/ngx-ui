import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private readonly router: Router) {}

  activeBottom = 1;
  activeTop = 0;

  get activeRoute(): number {
    return this.router.url === '/navbar/child-1' ? 0 : this.router.url === '/navbar/child-2' ? 1 : -1;
  }
}
