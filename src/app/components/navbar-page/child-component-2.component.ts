import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar-child-component2',
  template: '<div>Child component route 2 content</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NavbarChildComponent2 {}
