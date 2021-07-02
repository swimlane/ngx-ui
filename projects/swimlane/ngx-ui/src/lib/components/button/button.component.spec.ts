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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.disabled = false;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have timeout default to: 3000', () => {
    expect(component.timeout).toEqual(3000);
  });

  it('should update state and promise on change', () => {
    const stateSpy = spyOn(component, 'updateState');
    const promiseSpy = spyOn(component, 'updatePromise');

    component.ngOnChanges();

    expect(stateSpy).toHaveBeenCalled();
    expect(promiseSpy).toHaveBeenCalled();
  });

  describe('state', () => {
    it('should set state', () => {
      const spy = spyOn(component.fail$, 'next');
      component.state = ButtonState.Fail;
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('updatePromise', () => {
    it('should not update when undefined', () => {
      const spy = spyOn(component, 'updateState');
      component.updatePromise();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should update and resolve', done => {
      const spy = spyOn(component, 'updateState');
      component.promise = new Promise(resolve => {
        resolve('');
      });

      component.updatePromise().finally(() => {
        expect(component.state).toBe(ButtonState.Success);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should update and reject', done => {
      const spy = spyOn(component, 'updateState');
      component.promise = new Promise(() => {
        throw new Error();
      });

      component.updatePromise().finally(() => {
        expect(component.state).toBe(ButtonState.Fail);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('updateState', () => {
    it('should update state when undefined', () => {
      component.state = undefined;
      component.updateState();
      expect(component.state).toBe(ButtonState.Active);
    });

    it('should reset state when not active', () => {
      const spy = spyOn(window, 'setTimeout').and.callThrough();
      component.state = ButtonState.InProgress;
      component.updateState();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    it('should prevent event when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const res = component.onClick({
        stopPropagation: () => null,
        preventDefault: () => null
      } as any);
      expect(res).toBe(false);
    });

    it('should allow event when not disabled', () => {
      component.disabled = false;
      fixture.detectChanges();
      const res = component.onClick({} as any);
      expect(res).toBe(true);
    });
  });
});
