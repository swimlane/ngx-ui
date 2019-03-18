import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToggleComponent } from './toggle.component';
describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ToggleComponent]
    });
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('disabled defaults to: false', () => {
    expect(component.disabled).toEqual(false);
  });
  it('required defaults to: false', () => {
    expect(component.required).toEqual(false);
  });
  it('tabIndex defaults to: 0', () => {
    expect(component.tabIndex).toEqual(0);
  });
});
