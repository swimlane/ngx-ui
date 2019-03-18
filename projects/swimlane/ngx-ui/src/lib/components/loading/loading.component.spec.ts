import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoadingComponent } from './loading.component';
describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoadingComponent]
    });
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('visible defaults to: false', () => {
    expect(component.visible).toEqual(false);
  });
  it('progress defaults to: 0', () => {
    expect(component.progress).toEqual(0);
  });
});
