import { fakeAsync, tick } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  const mockScrollEvent = {} as Event;

  beforeEach(() => {
    component = new ListComponent();
    component.columnLayout = null as any;
    component.headers = null as any;
    component.listRowsContainer = {
      nativeElement: {
        clientHeight: 400,
        scrollHeight: 0,
        scrollTo: (options: ScrollToOptions) => options
      }
    } as any;
    component.paginationConfig = null as any;
    component.virtualScroll = false;
    component.virtualScrollViewport = {
      elementScrolled: () => of(mockScrollEvent)
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngAfterContentInit', () => {
    const generateLayoutSpy = spyOn(component, 'generateLayout');

    component.ngAfterContentInit();

    expect(generateLayoutSpy).toHaveBeenCalled();
  });

  describe('ngAfterViewInit', () => {
    it('should call initScrollListener and determine there is no scrollbar', fakeAsync(() => {
      const initScrollListenerSpy = spyOn(component, 'initScrollListener');

      component.ngAfterViewInit();

      tick();

      expect(initScrollListenerSpy).toHaveBeenCalled();
      expect(component.hasScrollbar).toBe(false);
    }));

    it('should call initScrollListener and determine there is a scrollbar', fakeAsync(() => {
      const initScrollListenerSpy = spyOn(component, 'initScrollListener');
      (component.listRowsContainer.nativeElement as any).scrollHeight = 800;

      component.ngAfterViewInit();

      tick();

      expect(initScrollListenerSpy).toHaveBeenCalled();
      expect(component.hasScrollbar).toBe(true);
    }));

    it('should call initScrollListener and scroll to the correct page when the paginationConfig Input is provided', fakeAsync(() => {
      const scrollToSpy: jasmine.Spy<{ (options: ScrollToOptions): void }> = spyOn(
        component.listRowsContainer.nativeElement,
        'scrollTo'
      );
      const initScrollListenerSpy = spyOn(component, 'initScrollListener');
      component.paginationConfig = {
        index: 5,
        pageSize: 10
      };
      const pageSize = component.paginationConfig.pageSize;
      const index = component.paginationConfig.index as number;
      const expectedTopValue = component.rowHeight * (pageSize * (index - 1));

      component.ngAfterViewInit();

      tick();

      expect(initScrollListenerSpy).toHaveBeenCalled();
      expect(component.hasScrollbar).toBe(false);
      expect(scrollToSpy).toHaveBeenCalledWith({ top: expectedTopValue });
    }));
  });

  it('ngOnDestroy', () => {
    const destroyNextSpy = spyOn(component['destroy$'], 'next');
    const destroyCompleteSpy = spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNextSpy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
  });

  describe('emitScrollChanges', () => {
    it('should emit the scroll event', () => {
      const scrollEvent = { target: { scrollTop: 1000 } } as any;
      const onScrollSpy = spyOn(component.onScroll, 'emit');

      component.emitScrollChanges(scrollEvent);

      expect(onScrollSpy).toHaveBeenCalledWith(scrollEvent.target.scrollTop);
    });

    it('should emit the onScroll event and emit the onPageChange event when the pageSize is provided as part of the paginationConfig Input', () => {
      const scrollEvent = { target: { scrollTop: 1000 } } as any;
      const onScrollSpy = spyOn(component.onScroll, 'emit');
      const onPageChangeSpy = spyOn(component.onPageChange, 'emit');
      component.paginationConfig = {
        pageSize: 10
      };
      component.page = 2;
      const expectedPage = 3;

      component.emitScrollChanges(scrollEvent);

      expect(onScrollSpy).toHaveBeenCalledWith(scrollEvent.target.scrollTop);
      expect(onPageChangeSpy).toHaveBeenCalledWith(expectedPage);
    });
  });

  describe('generateLayout', () => {
    it('should generate the default layout based on the number of header templates when the columnLayout Input is not provided', () => {
      component.headers = {
        length: 4
      } as any;

      component.generateLayout();

      expect(component._columnLayout).toEqual({
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: `repeat(${component.headers.length}, 1fr)`
      });
    });

    it('should merge the provided columnLayout Input with the default _columnLayout', () => {
      component.columnLayout = {
        gridTemplateColumns: '3fr 2fr 1fr'
      };

      component.generateLayout();

      expect(component._columnLayout).toEqual({
        ...component.columnLayout,
        ...component._columnLayout
      });
    });
  });

  describe('initScrollListener', () => {
    it('should initialize the scroll listener for virtual scroll viewport', () => {
      const emitScrollChangesSpy = spyOn(component, 'emitScrollChanges');
      component.virtualScroll = true;

      component.initScrollListener();

      expect(emitScrollChangesSpy).toHaveBeenCalledWith(mockScrollEvent);
    });
  });
});
