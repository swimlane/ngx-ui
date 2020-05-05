import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar-child-component2',
  template: `<div>Child component route 2 content</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarChildComponent2 {}
