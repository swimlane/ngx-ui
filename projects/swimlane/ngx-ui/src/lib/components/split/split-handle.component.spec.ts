import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SplitHandleComponent } from './split-handle.component';

describe('SplitHandleComponent', () => {
  let component: SplitHandleComponent;
  let fixture: ComponentFixture<SplitHandleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SplitHandleComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onMousedown', () => {
    it('should emit dragStart', () => {
      const spy = vi.spyOn(component.dragStart, 'emit');
      component.onMousedown({} as any);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onMouseMove', () => {
    it('should emit drag', () => {
      const spy = vi.spyOn(component.drag, 'emit');
      (component as any).onMouseMove({} as any);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onMouseup', () => {
    it('should stop drag if subscription defined', () => {
      const spy = vi.spyOn(component.dragEnd, 'emit');
      component.onMousedown({} as any);
      (component as any).onMouseup({} as any);
      expect(spy).toHaveBeenCalled();
    });

    it('should not stop drag if !subscription', () => {
      const spy = vi.spyOn(component.dragEnd, 'emit');
      (component as any).onMouseup({} as any);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
