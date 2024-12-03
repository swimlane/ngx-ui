import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTipFixtureComponent } from './fixtures/tooltip.fixture';
import { TooltipModule } from './tooltip.module';
import { TooltipDirective } from './tooltip.directive';
import { ShowTypes } from './show-types.enum';
import { TooltipService } from './tooltip.service';

describe('TooltipDirective', () => {
  let directive: TooltipDirective;
  let fixture: ComponentFixture<ToolTipFixtureComponent>;
  let service: TooltipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolTipFixtureComponent],
      imports: [TooltipModule],
      providers: [
        {
          provide: TooltipService,
          useValue: {
            create: () => undefined,
            destroy: () => undefined,
            destroyAll: () => undefined
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TooltipService);
    fixture = TestBed.createComponent(ToolTipFixtureComponent);
    directive = fixture.componentInstance.tooltipDirective;
    fixture.autoDetectChanges();
  });

  it('can load instance', () => {
    expect(directive).toBeTruthy();
    expect(service).toBeTruthy();
  });

  describe('onFocus', () => {
    it('should show tooltip', () => {
      const spy = spyOn(directive, 'showTooltip');
      directive.onFocus();
      expect(spy).toHaveBeenCalled();
    });

    it('should not show tooltip', () => {
      const spy = spyOn(directive, 'showTooltip');
      directive.tooltipShowEvent = ShowTypes.mouseover;
      directive.onFocus();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onBlur', () => {
    it('should hide tooltip', () => {
      const spy = spyOn(directive, 'hideTooltip');
      directive.onBlur();
      expect(spy).toHaveBeenCalled();
    });

    it('should not hide tooltip', () => {
      const spy = spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.mouseover;
      directive.onBlur();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseEvent', () => {
    it('should show tooltip', () => {
      const spy = spyOn(directive, 'showTooltip');
      directive.onMouseEnter();
      expect(spy).toHaveBeenCalled();
    });

    it('should not show tooltip', () => {
      const spy = spyOn(directive, 'showTooltip');
      directive.tooltipShowEvent = ShowTypes.focus;
      directive.onMouseEnter();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseLeave', () => {
    it('should hide tooltip', () => {
      const spy = spyOn(directive, 'hideTooltip');
      directive.onMouseLeave({ toElement: document.createElement('div') });
      expect(spy).toHaveBeenCalled();
    });

    it('should not hide tooltip', () => {
      const spy = spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.focus;
      directive.onMouseLeave({ toElement: document.createElement('div') });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseClick', () => {
    it('should hide tooltip', () => {
      const spy = spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.mouseover;
      directive.onMouseClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should not hide tooltip', () => {
      const spy = spyOn(directive, 'hideTooltip');
      directive.onMouseClick();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should show tooltip - ShowTypes.click', () => {
      const spy = spyOn(directive, 'showTooltip');
      directive.tooltipShowEvent = ShowTypes.click;
      directive.onMouseClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should hide tooltip - ShowTypes.click', () => {
      const spy = spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.click;
      // open tooltip
      directive.onMouseClick();
      // close tooltip
      directive.onMouseClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('showTooltip', () => {
    it('should show tooltip', done => {
      const spy = spyOn(directive.show, 'emit');
      directive.showTooltip(true);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });
    });

    it('should add hide listeners to component if exists', done => {
      const spy = spyOn(directive, 'addHideListeners').and.callThrough();
      spyOn(service, 'create').and.returnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      directive.tooltipShowTimeout = 1;
      directive.showTooltip();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 20);
    });

    it('should add hide listeners to component if exists without tooltipCloseOnMouseLeave', done => {
      const spy = spyOn(directive, 'addHideListeners').and.callThrough();
      spyOn(service, 'create').and.returnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      directive.tooltipCloseOnMouseLeave = false;
      directive.showTooltip(true);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 20);
    });

    it('should add hide listeners to component if exists without tooltipCloseOnClickOutside', done => {
      const spy = spyOn(directive, 'addHideListeners').and.callThrough();
      spyOn(service, 'create').and.returnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      directive.tooltipCloseOnClickOutside = false;
      directive.showTooltip(true);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 20);
    });

    it('should not show tooltip when component exists', () => {
      const spy = spyOn(directive.show, 'emit');
      directive.tooltipDisabled = true;
      directive.showTooltip();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('hideTooltip', () => {
    it('should hide tooltip with timeout set', done => {
      const spy = spyOn(directive.hide, 'emit');
      spyOn(service, 'create').and.returnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      directive.showTooltip(true);

      setTimeout(() => {
        directive.hideTooltip();

        setTimeout(() => {
          expect(spy).toHaveBeenCalled();
          done();
        }, directive.tooltipHideTimeout);
      });
    });
  });
});
