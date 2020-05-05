import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { IconModule } from '../icon/icon.module';

import { NavbarComponentFixture } from './navbar.component.fixture';
import { NavbarModule } from './navbar.module';

describe('Navbar Component', () => {
  let component: NavbarComponentFixture;
  let fixture: ComponentFixture<NavbarComponentFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponentFixture],
      imports: [NavbarModule, IconModule, HttpClientModule, BrowserAnimationsModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponentFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component.navbar).toBeDefined();
  });

  it('setting barAtTop moves bar to the top of component', () => {
    component.navbar.barAtTop = true;
    fixture.detectChanges();

    const bar = fixture.debugElement.query(By.css('ngx-navbar:first-child .ngx-navbar--bar'));

    expect(bar.classes['ngx-navbar--top']).toBeTruthy();
  });

  it('clicking on a nav changes navbar active property to that tab`s index', () => {
    expect(component.navbar.active).toEqual(0);

    const navs = fixture.debugElement.queryAll(By.css('ngx-navbar:first-child ngx-navbar-item'));
    const nav = navs[2];

    nav.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.navbar.active).toEqual(2);
  });

  it('goTo makes the appropriate tab active', () => {
    component.navbar.goTo(3);
    fixture.detectChanges();
    const navs = fixture.debugElement.queryAll(By.css('ngx-navbar:first-child ngx-navbar-item'));
    const lastNav = navs[navs.length - 1];

    expect(lastNav.classes.active).toBeTruthy();
  });

  it('goTo to the already active tab does not change active', () => {
    expect(component.navbar.active).toEqual(0);
    component.navbar.goTo(0);
    const navs = fixture.debugElement.queryAll(By.css('ngx-navbar:first-child ngx-navbar-item'));
    const firstNav = navs[0];

    expect(firstNav.classes.active).toBeTruthy();
    expect(component.navbar.active).toEqual(0);
  });

  it('navbar initiated to different active tab', () => {
    expect(component.navbar2.active).toEqual(2);

    const navs = fixture.debugElement.queryAll(By.css('ngx-navbar:nth-child(2) ngx-navbar-item'));
    const nav = navs[2];

    expect(nav.classes.active).toBeTruthy();
  });
});
