import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavMenuComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    component.expanded = false;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('expanded defaults to: false', () => {
    expect(component.expanded).toEqual(false);
  });
});
