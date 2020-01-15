import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SplitDirectiveFixture } from './split.directive.fixture';
import { SplitDirective } from './split.directive';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
import { SplitDirection } from './split-direction.enum';

describe('SplitDirective', () => {
  let component: SplitDirectiveFixture;
  let fixture: ComponentFixture<SplitDirectiveFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FlexLayoutModule],
      declarations: [SplitDirectiveFixture, SplitDirective, SplitAreaDirective, SplitHandleComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitDirectiveFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should drag on handle drag', () => {
    const spy = spyOn(component.split, 'onDrag');
    component.splitHandle.onMouseMove({} as any);
    expect(spy).toHaveBeenCalled();
  });

  it('should double click on handle double click', () => {
    const spy = spyOn(component.split, 'onDblClick');
    component.splitHandle.dblclick.emit();
    expect(spy).toHaveBeenCalled();
  });

  describe('onDblClick', () => {
    it('should resize row on double click', () => {
      const spy = spyOn(component.split, 'resize');
      component.split.onDblClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should resize column on double click', () => {
      const spy = spyOn(component.split, 'resize');
      component.split.direction = SplitDirection.Column;
      component.split.onDblClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should resize with px value instead of %', () => {
      const spy = spyOn(component.split, 'resize');
      component.flex$.next('10px');
      fixture.detectChanges();
      component.split.onDblClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onDrag', () => {
    it('should resize horizontal', () => {
      const spy = spyOn(component.split, 'resize');
      component.split.onDrag({ movementX: 10, movementY: 20 } as any);
      expect(spy).toHaveBeenCalledWith(10);
    });

    it('should resize vertical', () => {
      const spy = spyOn(component.split, 'resize');
      component.split.direction = SplitDirection.Column;
      component.split.onDrag({ movementX: 10, movementY: 20 } as any);
      expect(spy).toHaveBeenCalledWith(20);
    });
  });

  describe('resize', () => {
    it('should resize splitAreas as row', () => {
      component.split.resize(10);
    });

    it('should resize splitAreas as column', () => {
      component.split.direction = SplitDirection.Column;
      component.split.resize(10);
    });
  });
});
