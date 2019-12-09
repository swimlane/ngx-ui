import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RadioButtonGroupComponent } from './radiobutton-group.component';

describe('RadioButtonGroupComponent', () => {
  let component: RadioButtonGroupComponent;
  let fixture: ComponentFixture<RadioButtonGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RadioButtonGroupComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
