import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar-child-component-1',
  template: '<div>Child component route 1 content</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NavbarChildComponent1 {}
