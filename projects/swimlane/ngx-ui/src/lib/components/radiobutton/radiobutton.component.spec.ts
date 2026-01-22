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
      component.two.value = true;
      fixture.detectChanges();
      expect(component.value).toBe(true);
    });

    it('should emit if checked', () => {
      component.checked$.next(true);
      fixture.detectChanges();
      const spy = spyOn(component.one.change, 'emit');
      component.one.value = !component.one.value;
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('should focus', () => {
      const spy = spyOn(component.one.focus, 'emit');
      component.one.onFocus(undefined);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('_onInputChange', () => {
    it('should be checked', () => {
      component.one.checked = false;
      component.one._onInputChange({ stopPropagation: () => undefined } as any);
      expect(component.one.checked).toBe(true);
    });
  });
});
