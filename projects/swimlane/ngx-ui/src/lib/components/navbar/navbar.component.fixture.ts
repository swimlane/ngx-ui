import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'ngx-navbar-fixture',
  template: `
    <ngx-navbar [(active)]="active" #navbar1>
      <ngx-navbar-item><ngx-icon fontIcon="apps"></ngx-icon></ngx-navbar-item>
      <ngx-navbar-item><ngx-icon fontIcon="chart-scatter"></ngx-icon></ngx-navbar-item>
      <ngx-navbar-item><ngx-icon fontIcon="database"></ngx-icon></ngx-navbar-item>
      <ngx-navbar-item><ngx-icon fontIcon="commandline"></ngx-icon></ngx-navbar-item>
    </ngx-navbar>
    <ngx-navbar [(active)]="active2" #navbar2>
      <ngx-navbar-item><ngx-icon fontIcon="apps"></ngx-icon></ngx-navbar-item>
      <ngx-navbar-item><ngx-icon fontIcon="chart-scatter"></ngx-icon></ngx-navbar-item>
      <ngx-navbar-item><ngx-icon fontIcon="database"></ngx-icon></ngx-navbar-item>
      <ngx-navbar-item><ngx-icon fontIcon="commandline"></ngx-icon></ngx-navbar-item>
    </ngx-navbar>
  `
})
export class NavbarComponentFixture {
  @ViewChild('navbar1') readonly navbar: NavbarComponent;
  @ViewChild('navbar2') readonly navbar2: NavbarComponent;

  active = 0;
  active2 = 2;
}
