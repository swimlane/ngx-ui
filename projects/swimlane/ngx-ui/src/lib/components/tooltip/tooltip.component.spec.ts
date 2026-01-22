import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipContentComponent } from './tooltip.component';
import { StyleTypes } from './style-types.enum';

import { PlacementTypes } from '../../utils/position/placement-type.enum';
import { AlignmentTypes } from '../../utils/position/alignment-types.enum';
import { positionCaret } from '../../utils/position/position-caret/position-caret.util';
import { positionContent } from '../../utils/position/position-content/position-content.util';

const position = {
  positionCaret,
  positionContent
};

describe('TooltipContentComponent', () => {
  let component: TooltipContentComponent;
  let fixture: ComponentFixture<TooltipContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TooltipContentComponent],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipContentComponent);
    component = fixture.componentInstance;

    component.type = StyleTypes.tooltip;
    component.placement = PlacementTypes.bottom;
    component.alignment = AlignmentTypes.left;
    component.showCaret = true;
    component.spacing = 0;
    component.host = {
      nativeElement: {
        getBoundingClientRect: () =>
          ({
            height: 10,
            width: 10
          } as any)
      } as any
    };

    vi.spyOn(component.element.nativeElement, 'getBoundingClientRect').mockReturnValue({
      wdith: 10,
      height: 10
    } as any);

    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onWindowResize', () => {
    it('should reposition', () => {
      const spy = vi.spyOn(component, 'position');
      component.onWindowResize();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('position', () => {
    it('should do nothing if no bounding box', () => {
      const spy = vi.spyOn(position, 'positionContent');
      component.host = { nativeElement: document.createElement('div') };
      component.position();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not position caret', () => {
      const spy = vi.spyOn(position, 'positionCaret');
      component.showCaret = false;
      component.position();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
