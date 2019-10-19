import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonComponent } from './button.component';
import { ButtonState } from './button-state.enum';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('disabled defaults to: false', () => {
    expect(component.disabled).toEqual(false);
  });

  it('state defaults to: active', () => {
    expect(component.state).toEqual('active');
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'updateState');
      component.ngOnInit();
      expect(component.updateState).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      spyOn(component, 'updateState');
      spyOn(component, 'updatePromise');
      component.ngOnChanges();
      expect(component.updateState).toHaveBeenCalled();
      expect(component.updatePromise).toHaveBeenCalled();
    });
  });

  describe('updateState', () => {
    it('makes expected calls', () => {
      spyOn(component, 'updateState');
      component.updateState();
      expect(component.updateState).toHaveBeenCalled();
    });
  });

  describe('General button tests', () => {
    it('should disable button', () => {
      component.disabled = true;
      component.ngOnChanges();
      fixture.detectChanges();
      expect(fixture.debugElement.classes['disabled-button']).toBeTruthy();
    });

    it('should apply class based on state attribute', () => {
      component.state = ButtonState.InProgress;
      component.ngOnChanges();
      fixture.detectChanges();
      expect(fixture.debugElement.classes['in-progress']).toBeTruthy();

      component.state = ButtonState.Success;
      component.ngOnChanges();
      fixture.detectChanges();
      expect(fixture.debugElement.classes['success']).toBeTruthy();

      component.state = ButtonState.Fail;
      component.ngOnChanges();
      fixture.detectChanges();
      expect(fixture.debugElement.classes['fail']).toBeTruthy();
    });
  });
});
