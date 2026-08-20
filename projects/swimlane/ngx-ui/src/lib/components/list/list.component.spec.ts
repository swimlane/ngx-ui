import type { Mock } from 'vitest';
import { fakeAsync, tick } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  const mockScrollEvent = { target: { scrollTop: 0 } } as unknown as Event;
  let listRowsScrollMetrics: { clientHeight: number; scrollHeight: number; offsetWidth: number; clientWidth: number };

  const createListRowsNativeElement = () => {
    const el = document.createElement('div');
    listRowsScrollMetrics = { clientHeight: 400, scrollHeight: 0, offsetWidth: 500, clientWidth: 500 };
    Object.defineProperty(el, 'clientHeight', {
      configurable: true,
      get: () => listRowsScrollMetrics.clientHeight
    });
    Object.defineProperty(el, 'scrollHeight', {
      configurable: true,
      get: () => listRowsScrollMetrics.scrollHeight
    });
    Object.defineProperty(el, 'offsetWidth', {
      configurable: true,
      get: () => listRowsScrollMetrics.offsetWidth
    });
    Object.defineProperty(el, 'clientWidth', {
      configurable: true,
      get: () => listRowsScrollMetrics.clientWidth
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

  describe('getColumnAlign', () => {
    beforeEach(() => {
      component.columns = {
        get: (index: number) => [{ align: 'left' }, { align: 'center' }, { align: 'right' }][index]
      } as any;
    });

    it('mirrors each column alignment onto the header when the list is flat', () => {
      component.isNested = false;

      expect(component.getColumnAlign(0)).toBe('left');
      expect(component.getColumnAlign(1)).toBe('center');
      expect(component.getColumnAlign(2)).toBe('right');
    });

    it('centers data headers but keeps the tree column header left aligned when nested', () => {
      component.isNested = true;
      component.indentColumn = 1;

      expect(component.getColumnAlign(0)).toBe('center');
      expect(component.getColumnAlign(1)).toBe('left');
      expect(component.getColumnAlign(2)).toBe('center');
    });

    it('leaves alignment to each column when nested rows keep their columns aligned', () => {
      component.isNested = true;
      component.nestMode = 'aligned';
      component.indentColumn = 0;

      expect(component.getColumnAlign(0)).toBe('left');
      expect(component.getColumnAlign(1)).toBe('center');
      expect(component.getColumnAlign(2)).toBe('right');
    });

    it('falls back to left when no column is declared at that index', () => {
      component.isNested = false;
      component.columns = { get: () => undefined } as any;

      expect(component.getColumnAlign(5)).toBe('left');
    });
  });

  describe('headersPaddingLeft', () => {
    beforeEach(() => {
      component.nestIndent = 20;
      component.maxDepth = 4;
      component.isNested = true;
    });

    it('gives the header grid the geometry of a mid-depth row', () => {
      component.selectable = true;

      expect(component.headersPaddingLeft).toBe('40px');
    });

    it('keeps the base padding when there is no select-all wrapper', () => {
      component.selectable = false;

      expect(component.headersPaddingLeft).toBe('calc(1rem + 40px)');
    });

    it('needs no offset when nested rows keep their columns aligned', () => {
      component.nestMode = 'aligned';

      expect(component.headersPaddingLeft).toBeNull();
    });

    it('leaves flat lists untouched', () => {
      component.isNested = false;
      component.maxDepth = 0;

      expect(component.headersPaddingLeft).toBeNull();
    });
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
      listRowsScrollMetrics.clientWidth = 485;

      component.ngAfterViewInit();

      tick();

      expect(initScrollListenerSpy).toHaveBeenCalled();
      expect(component.hasScrollbar).toBe(true);
      expect(component.scrollbarWidth).toBe(15);
      expect(component.headersMarginRight).toBe('calc(1rem + 15px)');
    }));

    it('reserves no header gutter for an overlay scrollbar that takes no layout width', fakeAsync(() => {
      listRowsScrollMetrics.scrollHeight = 800;

      component.ngAfterViewInit();

      tick();

      expect(component.hasScrollbar).toBe(false);
      expect(component.headersMarginRight).toBeNull();
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

  describe('nesting and selection', () => {
    it('flattens nested children into display rows with depth', () => {
      component.dataSource = [
        {
          id: 'root',
          name: 'Root',
          children: [{ id: 'child', name: 'Child' }]
        }
      ];
      component.ngOnChanges({
        dataSource: {
          currentValue: component.dataSource,
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.displayDataSource.map(row => row.name)).toEqual(['Root', 'Child']);
      expect(component.displayDataSource.map(row => row['_listDepth'])).toEqual([0, 1]);
    });

    it('ignores row changes that match the current selection state', () => {
      component.selectable = true;
      component.selectedIds = ['a'];
      component.dataSource = [{ id: 'a', name: 'A' }];
      component.ngAfterContentInit();

      const selectedIdsSpy = vi.spyOn(component.selectedIdsChange, 'emit');

      component.onRowCheckedChange(component.displayDataSource[0], 0, true);

      expect(selectedIdsSpy).not.toHaveBeenCalled();
    });

    it('selects and clears every selectable row from the header checkbox', () => {
      component.selectable = true;
      component.selectedIds = [];
      component.dataSource = [
        { id: 'a', name: 'A' },
        { id: 'b', name: 'B', disabled: true },
        { id: 'c', name: 'C' }
      ];
      component.ngAfterContentInit();

      const selectionSpy = vi.spyOn(component.onSelectionChange, 'emit');

      component.onSelectAllChange(true);

      expect(component.selectedIds).toEqual(['a', 'c']);
      expect(component.allRowsSelected).toBe(true);
      expect(component.someRowsSelected).toBe(false);
      expect(selectionSpy).toHaveBeenCalledWith({ selectedIds: ['a', 'c'] });

      component.onSelectAllChange(false);

      expect(component.selectedIds).toEqual([]);
      expect(component.allRowsSelected).toBe(false);
    });

    it('ignores select-all when there are no selectable rows', () => {
      component.selectable = true;
      component.selectedIds = [];
      component.dataSource = [
        { id: 'a', name: 'A', disabled: true },
        { id: 'b', name: 'B', selectable: false }
      ];
      component.ngAfterContentInit();

      const selectionSpy = vi.spyOn(component.onSelectionChange, 'emit');

      expect(component.hasSelectableRows).toBe(false);
      expect(component.allRowsSelected).toBe(false);

      component.onSelectAllChange(true);

      expect(component.selectedIds).toEqual([]);
      expect(component.allRowsSelected).toBe(false);
      expect(selectionSpy).not.toHaveBeenCalled();
    });

    it('preserves host selection for disabled rows across select-all toggles', () => {
      component.selectable = true;
      component.selectedIds = ['b'];
      component.dataSource = [
        { id: 'a', name: 'A' },
        { id: 'b', name: 'B', disabled: true },
        { id: 'c', name: 'C' }
      ];
      component.ngAfterContentInit();

      component.onSelectAllChange(true);
      expect(component.selectedIds).toEqual(['b', 'a', 'c']);
      expect(component.allRowsSelected).toBe(true);

      component.onSelectAllChange(false);
      expect(component.selectedIds).toEqual(['b']);
      expect(component.allRowsSelected).toBe(false);
      expect(component.someRowsSelected).toBe(false);
    });

    it('reports an indeterminate state for a partial selection', () => {
      component.selectable = true;
      component.selectedIds = ['a'];
      component.dataSource = [
        { id: 'a', name: 'A' },
        { id: 'b', name: 'B' }
      ];
      component.ngAfterContentInit();

      expect(component.allRowsSelected).toBe(false);
      expect(component.someRowsSelected).toBe(true);
    });

    it('marks host supplied rows indeterminate until they are selected outright', () => {
      component.selectable = true;
      component.selectedIds = ['child'];
      component.indeterminateIds = ['parent'];
      component.dataSource = [
        { id: 'parent', name: 'Parent' },
        { id: 'child', name: 'Child', parentId: 'parent' }
      ];
      component.ngAfterContentInit();

      const [parent, child] = component.displayDataSource;

      expect(component.isRowIndeterminate(parent, 0)).toBe(true);
      expect(component.isRowSelected(parent, 0)).toBe(false);
      expect(component.isRowIndeterminate(child, 1)).toBe(false);
    });

    it('drops the indeterminate state once a row becomes selected', () => {
      component.selectable = true;
      component.selectedIds = ['parent'];
      component.indeterminateIds = ['parent'];
      component.dataSource = [{ id: 'parent', name: 'Parent' }];
      component.ngAfterContentInit();

      expect(component.isRowSelected(component.displayDataSource[0], 0)).toBe(true);
      expect(component.isRowIndeterminate(component.displayDataSource[0], 0)).toBe(false);
    });

    it('emits host-owned selection changes when a selectable row is toggled', () => {
      component.selectable = true;
      component.selectedIds = [];
      component.dataSource = [
        { id: 'a', name: 'A' },
        { id: 'b', name: 'B', selectable: false }
      ];
      component.ngAfterContentInit();

      const selectedIdsSpy = vi.spyOn(component.selectedIdsChange, 'emit');
      const selectionSpy = vi.spyOn(component.onSelectionChange, 'emit');

      expect(component.isRowSelectable(component.displayDataSource[0])).toBe(true);
      expect(component.isRowSelectable(component.displayDataSource[1])).toBe(false);

      component.onRowCheckedChange(component.displayDataSource[0], 0, true);

      expect(component.selectedIds).toEqual(['a']);
      expect(selectedIdsSpy).toHaveBeenCalledWith(['a']);
      expect(selectionSpy).toHaveBeenCalledWith({
        selectedIds: ['a'],
        row: component.displayDataSource[0],
        selected: true
      });
    });
  });
});
