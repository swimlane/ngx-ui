import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonComponentFixture } from './radiobutton.component.fixture';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponentFixture;
  let fixture: ComponentFixture<RadioButtonComponentFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule],
      declarations: [RadioButtonComponent, RadioButtonComponentFixture]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonComponentFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('value', () => {
    it('should change value', () => {
      component.model = true;
      fixture.detectChanges();
      expect(component.radioButton.value).toBe(component.model);
    });
  });
});
