import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonComponent } from './button.component';
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
  it('inProgress defaults to: false', () => {
    expect(component.inProgress).toEqual(false);
  });
  it('active defaults to: true', () => {
    expect(component.active).toEqual(true);
  });
  it('success defaults to: false', () => {
    expect(component.success).toEqual(false);
  });
  it('fail defaults to: false', () => {
    expect(component.fail).toEqual(false);
  });
  it('_disabled defaults to: false', () => {
    expect(component._disabled).toEqual(false);
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
  it('disables button', () => {
    component.disabled = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(fixture.debugElement.classes['disabled-button']).toBeTruthy();
  });
});
