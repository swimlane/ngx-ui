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
      const spy = vi.spyOn(directive, 'showTooltip');
      directive.onFocus();
      expect(spy).toHaveBeenCalled();
    });

    it('should not show tooltip', () => {
      const spy = vi.spyOn(directive, 'showTooltip');
      directive.tooltipShowEvent = ShowTypes.mouseover;
      directive.onFocus();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onBlur', () => {
    it('should hide tooltip', () => {
      const spy = vi.spyOn(directive, 'hideTooltip');
      directive.onBlur();
      expect(spy).toHaveBeenCalled();
    });

    it('should not hide tooltip', () => {
      const spy = vi.spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.mouseover;
      directive.onBlur();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseEvent', () => {
    it('should show tooltip', () => {
      const spy = vi.spyOn(directive, 'showTooltip');
      directive.onMouseEnter();
      expect(spy).toHaveBeenCalled();
    });

    it('should not show tooltip', () => {
      const spy = vi.spyOn(directive, 'showTooltip');
      directive.tooltipShowEvent = ShowTypes.focus;
      directive.onMouseEnter();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseLeave', () => {
    it('should hide tooltip', () => {
      const spy = vi.spyOn(directive, 'hideTooltip');
      directive.onMouseLeave({ toElement: document.createElement('div') });
      expect(spy).toHaveBeenCalled();
    });

    it('should not hide tooltip', () => {
      const spy = vi.spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.focus;
      directive.onMouseLeave({ toElement: document.createElement('div') });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseClick', () => {
    it('should hide tooltip', () => {
      const spy = vi.spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.mouseover;
      directive.onMouseClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should not hide tooltip', () => {
      const spy = vi.spyOn(directive, 'hideTooltip');
      directive.onMouseClick();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should show tooltip - ShowTypes.click', () => {
      const spy = vi.spyOn(directive, 'showTooltip');
      directive.tooltipShowEvent = ShowTypes.click;
      directive.onMouseClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should hide tooltip - ShowTypes.click', () => {
      const spy = vi.spyOn(directive, 'hideTooltip');
      directive.tooltipShowEvent = ShowTypes.click;
      // open tooltip
      directive.onMouseClick();
      // close tooltip
      directive.onMouseClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('showTooltip', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should show tooltip', async () => {
      const spy = vi.spyOn(directive.show, 'emit');
      directive.showTooltip(true);

      await new Promise<void>(resolve => setTimeout(resolve, 0));
      expect(spy).toHaveBeenCalled();
    });

    it('should add hide listeners to component if exists', async () => {
      const spy = vi.spyOn(directive, 'addHideListeners');
      vi.spyOn(service, 'create').mockReturnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      // Outer delay skipped; addHideListeners still runs after inner 10ms in showTooltip.
      directive.showTooltip(true);

      await new Promise<void>(resolve => setTimeout(resolve, 20));
      expect(spy).toHaveBeenCalled();
    });

    it('should add hide listeners to component if exists without tooltipCloseOnMouseLeave', async () => {
      const spy = vi.spyOn(directive, 'addHideListeners');
      vi.spyOn(service, 'create').mockReturnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      directive.tooltipCloseOnMouseLeave = false;
      directive.showTooltip(true);

      await new Promise<void>(resolve => setTimeout(resolve, 20));
      expect(spy).toHaveBeenCalled();
    });

    it('should add hide listeners to component if exists without tooltipCloseOnClickOutside', async () => {
      const spy = vi.spyOn(directive, 'addHideListeners');
      vi.spyOn(service, 'create').mockReturnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      directive.tooltipCloseOnClickOutside = false;
      directive.showTooltip(true);

      await new Promise<void>(resolve => setTimeout(resolve, 20));
      expect(spy).toHaveBeenCalled();
    });

    it('should not show tooltip when component exists', () => {
      const spy = vi.spyOn(directive.show, 'emit');
      directive.tooltipDisabled = true;
      directive.showTooltip();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('hideTooltip', () => {
    it('should hide tooltip with timeout set', async () => {
      const spy = vi.spyOn(directive.hide, 'emit');
      vi.spyOn(service, 'create').mockReturnValue({
        instance: {
          element: {
            nativeElement: document.createElement('div')
          }
        }
      } as any);

      directive.showTooltip(true);

      await new Promise<void>(resolve => setTimeout(resolve, 20));

      directive.hideTooltip();

      await new Promise<void>(resolve => setTimeout(resolve, directive.tooltipHideTimeout));

      expect(spy).toHaveBeenCalled();
    });
  });
});
