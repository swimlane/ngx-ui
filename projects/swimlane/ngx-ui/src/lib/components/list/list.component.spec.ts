import type { Mock } from 'vitest';
import { fakeAsync, tick } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  const mockScrollEvent = { target: { scrollTop: 0 } } as unknown as Event;
  let listRowsScrollMetrics: { clientHeight: number; scrollHeight: number };

  const createListRowsNativeElement = () => {
    const el = document.createElement('div');
    listRowsScrollMetrics = { clientHeight: 400, scrollHeight: 0 };
    Object.defineProperty(el, 'clientHeight', {
      configurable: true,
      get: () => listRowsScrollMetrics.clientHeight
    });
    Object.defineProperty(el, 'scrollHeight', {
      configurable: true,
      get: () => listRowsScrollMetrics.scrollHeight
    });
    el.scrollTo = vi.fn() as unknown as HTMLDivElement['scrollTo'];
    return el;
  };

  const createSortableHeader = (prop: string, sortable = true): ListHeaderComponent => {
    const header = new ListHeaderComponent();
    header.sortable = sortable;
    header.prop = prop;
    return header;
  };

  beforeEach(() => {
    component = new ListComponent();
    component.columnLayout = null as any;
    component.headers = {
      length: 1,
      toArray: () => [createSortableHeader('name')]
    } as any;
    component.listRowsContainer = {
      nativeElement: createListRowsNativeElement()
    } as any;
    component.paginationConfig = null as any;
    component.virtualScroll = false;
    component.virtualScrollViewport = {
      elementScrolled: () => of(mockScrollEvent)
    } as any;
    component.dataSource = [
      { name: 'Charlie', value: 3 },
      { name: 'Alice', value: 1 },
      { name: 'Bob', value: 2 }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngAfterContentInit', () => {
    const generateLayoutSpy = vi.spyOn(component, 'generateLayout');

    component.ngAfterContentInit();

    expect(generateLayoutSpy).toHaveBeenCalled();
  });

  describe('ngAfterViewInit', () => {
    it('should call initScrollListener and determine there is no scrollbar', fakeAsync(() => {
      const initScrollListenerSpy = vi.spyOn(component, 'initScrollListener');

      component.ngAfterViewInit();

      tick();

      expect(initScrollListenerSpy).toHaveBeenCalled();
      expect(component.hasScrollbar).toBe(false);
    }));

    it('should call initScrollListener and determine there is a scrollbar', fakeAsync(() => {
      const initScrollListenerSpy = vi.spyOn(component, 'initScrollListener');
      listRowsScrollMetrics.scrollHeight = 800;

      component.ngAfterViewInit();

      tick();

      expect(initScrollListenerSpy).toHaveBeenCalled();
      expect(component.hasScrollbar).toBe(true);
    }));

    it('should call initScrollListener and scroll to the correct page when the paginationConfig Input is provided', fakeAsync(() => {
      const scrollToSpy: Mock = vi.spyOn(component.listRowsContainer.nativeElement, 'scrollTo');
      const initScrollListenerSpy = vi.spyOn(component, 'initScrollListener');
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
    const destroyNextSpy = vi.spyOn(component['destroy$'], 'next');
    const destroyCompleteSpy = vi.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNextSpy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
  });

  describe('emitScrollChanges', () => {
    it('should emit the scroll event', () => {
      const scrollEvent = { target: { scrollTop: 1000 } } as any;
      const onScrollSpy = vi.spyOn(component.onScroll, 'emit');

      component.emitScrollChanges(scrollEvent);

      expect(onScrollSpy).toHaveBeenCalledWith(scrollEvent.target.scrollTop);
    });

    it('should emit the onScroll event and emit the onPageChange event when the pageSize is provided as part of the paginationConfig Input', () => {
      const scrollEvent = { target: { scrollTop: 1000 } } as any;
      const onScrollSpy = vi.spyOn(component.onScroll, 'emit');
      const onPageChangeSpy = vi.spyOn(component.onPageChange, 'emit');
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
      const emitScrollChangesSpy = vi.spyOn(component, 'emitScrollChanges');
      component.virtualScroll = true;

      component.initScrollListener();

      expect(emitScrollChangesSpy).toHaveBeenCalledWith(mockScrollEvent);
    });
  });

  describe('sorting', () => {
    beforeEach(() => {
      component.headers = {
        length: 1,
        toArray: () => [createSortableHeader('name')]
      } as any;
      component.ngAfterContentInit();
    });

    it('should emit onSort with expected payload when a sortable header is clicked', () => {
      const header = createSortableHeader('name');
      const onSortSpy = vi.spyOn(component.onSort, 'emit');

      component.onHeaderSort(header);

      expect(onSortSpy).toHaveBeenCalledWith({
        sort: { prop: 'name', dir: 'asc' }
      });
    });

    it('should sort rows ascending then descending then ascending again in local mode', () => {
      const header = createSortableHeader('name');

      component.onHeaderSort(header);
      expect(component.displayDataSource.map(row => row.name)).toEqual(['Alice', 'Bob', 'Charlie']);

      component.onHeaderSort(header);
      expect(component.displayDataSource.map(row => row.name)).toEqual(['Charlie', 'Bob', 'Alice']);

      component.onHeaderSort(header);
      expect(component.displayDataSource.map(row => row.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should not reorder rows in external sorting mode', () => {
      component.externalSorting = true;
      const header = createSortableHeader('name');

      component.onHeaderSort(header);

      expect(component.displayDataSource.map(row => row.name)).toEqual(['Charlie', 'Alice', 'Bob']);
    });

    it('should respect pre-seeded sort input', () => {
      component.sort = { prop: 'name', dir: 'asc' };
      component.ngOnChanges({
        sort: {
          currentValue: component.sort,
          previousValue: null,
          firstChange: false,
          isFirstChange: () => false
        },
        dataSource: {
          currentValue: component.dataSource,
          previousValue: [],
          firstChange: false,
          isFirstChange: () => false
        }
      });

      expect(component.displayDataSource.map(row => row.name)).toEqual(['Alice', 'Bob', 'Charlie']);
      expect(component.getSortDirection(createSortableHeader('name'))).toBe('asc');
    });

    it('should recompute sorted rows when dataSource changes in local mode', () => {
      const header = createSortableHeader('name');
      component.onHeaderSort(header);

      component.dataSource = [
        { name: 'Zoe', value: 1 },
        { name: 'Amy', value: 2 }
      ];
      component.ngOnChanges({
        dataSource: {
          currentValue: component.dataSource,
          previousValue: [],
          firstChange: false,
          isFirstChange: () => false
        }
      });

      expect(component.displayDataSource.map(row => row.name)).toEqual(['Amy', 'Zoe']);
    });

    it('should reset scroll position after local sort', () => {
      const scrollToSpy = vi.spyOn(component.listRowsContainer.nativeElement, 'scrollTo');
      const header = createSortableHeader('name');

      component.onHeaderSort(header);

      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0 });
      expect(component.page).toBe(1);
    });

    it('should reset scroll position after external sort', () => {
      const scrollToSpy = vi.spyOn(component.listRowsContainer.nativeElement, 'scrollTo');
      component.externalSorting = true;
      const header = createSortableHeader('name');

      component.onHeaderSort(header);

      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0 });
      expect(component.page).toBe(1);
    });
  });
});
