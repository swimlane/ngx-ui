import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'ngx-navbar-fixture',
  template: `
    <ngx-navbar [(active)]="active">
      <ngx-nav><ngx-icon fontIcon="apps"></ngx-icon></ngx-nav>
      <ngx-nav><ngx-icon fontIcon="chart-scatter"></ngx-icon></ngx-nav>
      <ngx-nav><ngx-icon fontIcon="database"></ngx-icon></ngx-nav>
      <ngx-nav><ngx-icon fontIcon="commandline"></ngx-icon></ngx-nav>
    </ngx-navbar>
  `
})
export class NavbarComponentFixture {
  @ViewChild(NavbarComponent) readonly navbar: NavbarComponent;

  active = 0;
}
