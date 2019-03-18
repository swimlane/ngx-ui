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
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('tabindex defaults to: 0', () => {
    expect(component.tabindex).toEqual(0);
  });
  it('disabled defaults to: false', () => {
    expect(component.disabled).toEqual(false);
  });
});
