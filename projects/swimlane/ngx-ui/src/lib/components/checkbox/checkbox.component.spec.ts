import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckboxComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.value = true;
    component.tabindex = 0;
    component.round = false;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('value', () => {
    it('should set value', () => {
      component.value = false;
      expect(component.value).toBe(false);
    });

    it('should not set value if is equal to _value', () => {
      component.value = true;
      expect(component.value).toBe(true);
    });
  });

  describe('onBlur', () => {
    it('should call touched callback on blur', done => {
      const fn = () => {
        // @ts-ignore
        expect(component.onTouchedCallback).toBe(fn);
        done();
      };

      component.registerOnTouched(fn);

      component.onBlur({});
    });
  });

  describe('toggle', () => {
    it('should toggle value', () => {
      component.toggle();
      expect(component.value).toBe(false);
    });
  });

  describe('writeValue', () => {
    it('should write new value', () => {
      component.writeValue(false);
      expect(component.value).toBe(false);
    });
  });

  describe('registerOnChange', () => {
    it('should register new callback and call when value changes', done => {
      component.registerOnChange((v: boolean) => {
        expect(v).toBe(false);
        done();
      });

      component.value = false;
    });
  });

  describe('setDisabledState', () => {
    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
    });
  });
});
