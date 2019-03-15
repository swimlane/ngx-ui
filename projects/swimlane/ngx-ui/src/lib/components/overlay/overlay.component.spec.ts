import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OverlayComponent } from './overlay.component';
describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OverlayComponent]
    });
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('visible defaults to: false', () => {
    expect(component.visible).toEqual(false);
  });
  it('zIndex defaults to: 990', () => {
    expect(component.zIndex).toEqual(990);
  });
});
