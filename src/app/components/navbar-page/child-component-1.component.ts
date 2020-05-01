import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar-child-component-1',
  template: `<div>Child component route 1 content</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarChildComponent1 {}
