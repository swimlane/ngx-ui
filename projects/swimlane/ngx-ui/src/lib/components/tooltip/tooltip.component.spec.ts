import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { TooltipContentComponent } from './tooltip.component';
describe('TooltipContentComponent', () => {
  let component: TooltipContentComponent;
  let fixture: ComponentFixture<TooltipContentComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TooltipContentComponent]
    });
    fixture = TestBed.createComponent(TooltipContentComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('onWindowResize', () => {
    it('makes expected calls', () => {
      spyOn(component, 'position');
      component.onWindowResize();
      expect(component.position).toHaveBeenCalled();
    });
  });
});
