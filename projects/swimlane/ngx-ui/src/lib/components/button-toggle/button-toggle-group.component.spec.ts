import { InjectionToken, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { ButtonToggleComponent } from './button-toggle.component';
import { ButtonToggleGroupComponentFixture } from './button-toggle-group.component.fixture';

export const TOGGLE_GROUP = new InjectionToken<ButtonToggleGroupComponent>('ButtonToggleGroupComponent');

describe('ButtonToggleGroupComponent', () => {
  let component: ButtonToggleGroupComponent;
  let fixture: ComponentFixture<ButtonToggleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ButtonToggleComponent, ButtonToggleGroupComponent, ButtonToggleGroupComponentFixture],
      providers: [{ provide: TOGGLE_GROUP, useExisting: ButtonToggleGroupComponent }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonToggleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
