import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ColumnsComponent } from './columns.component';

describe('ColumnsComponent', () => {
  let component: ColumnsComponent;
  let fixture: ComponentFixture<ColumnsComponent>;
  const column = {
    id: '1',
    active: true,
    title: 'Column 1',
    children: [
      {
        id: '1-1',
        active: true,
        title: 'Child Column 1-1',
        children: [
          {
            id: '1-1-1',
            active: true,
            title: 'Child Column 1-1-1',
            children: [
              {
                id: '1-1-1-1',
                active: true,
                title: 'Child Column 1-1-1',
                content: {
                  component: 'ColumnTestContentComponent'
                }
              }
            ]
          },
          {
            id: '1-1-2',
            active: false,
            title: 'Child Column 1-1-2',
            content: {
              component: 'ColumnTestContentComponent'
            }
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ColumnsComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsComponent);
    fixture.componentRef?.setInput('column', column);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.columns = [];
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should change the column height', () => {
    component.ngOnChanges({
      height: {
        currentValue: 600,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component.columnHeight()).toBe(600 as any);
  });

  it('should set columns on ngOnChanges', fakeAsync(() => {
    spyOn(component, 'getCurrentColumns').and.callThrough();
    spyOn(component, 'traverseActivePath').and.callThrough();

    component.ngOnChanges({
      column: {
        currentValue: column,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.getCurrentColumns).toHaveBeenCalled();
    expect(component.traverseActivePath).toHaveBeenCalledTimes(4);

    tick();
    expect(component.columns.length).toBe(3);
    expect(component.columns[0].id).toBe('1');
    expect(component.columns[1].id).toBe('1-1');
    expect(component.columns[2].id).toBe('1-1-1');
  }));

  it('should deactivate path on column navigation', () => {
    const columnId = '1-1-1';
    component.columns = [
      {
        id: '1',
        active: true,
        title: 'Column 1',
        children: [
          {
            id: '1-1',
            active: true,
            title: 'Child Column 1-1',
            children: [
              {
                id: '1-1-1',
                active: false,
                title: 'Child Column 1-1-1',
                children: [
                  {
                    id: '1-1-1-1',
                    active: false,
                    title: 'Child Column 1-1-1',
                    content: {
                      component: 'ColumnTestContentComponent'
                    }
                  }
                ]
              },
              {
                id: '1-1-2',
                active: true,
                title: 'Child Column 1-1-2',
                content: {
                  component: 'ColumnTestContentComponent'
                }
              }
            ]
          }
        ]
      },
      {
        id: '1-1',
        active: true,
        title: 'Child Column 1-1',
        children: [
          {
            id: '1-1-1',
            active: false,
            title: 'Child Column 1-1-1',
            children: [
              {
                id: '1-1-1-1',
                active: false,
                title: 'Child Column 1-1-1',
                content: {
                  component: 'ColumnTestContentComponent'
                }
              }
            ]
          },
          {
            id: '1-1-2',
            active: false,
            title: 'Child Column 1-1-2',
            content: {
              component: 'ColumnTestContentComponent'
            }
          }
        ]
      },
      {
        id: '1-1-1',
        active: false,
        title: 'Child Column 1-1-1',
        children: [
          {
            id: '1-1-1-1',
            active: false,
            title: 'Child Column 1-1-1',
            content: {
              component: 'ColumnTestContentComponent'
            }
          }
        ]
      },
      {
        id: '1-1-1-1',
        active: false,
        title: 'Child Column 1-1-1',
        content: {
          component: 'ColumnTestContentComponent'
        }
      }
    ];
    spyOn(component, 'deactivatePath').and.callThrough();
    component.onColumnNavigation({
      columnId,
      active: false,
      title: 'Child Column 1-1-1',
      children: [
        {
          columnId: '1-1-1-1',
          active: false,
          title: 'Child Column 1-1-1',
          content: true
        }
      ]
    });

    expect(component.columns.length).toBe(3);
    expect(component.columns[0].id).toBe('1');
    expect(component.columns[1].id).toBe('1-1');
    expect(component.columns[2].id).toBe('1-1-1');
    expect(component.columns[2].active).toBeTrue();
    expect(component.deactivatePath).toHaveBeenCalledWith({
      id: '1-1-2',
      active: false,
      title: 'Child Column 1-1-2',
      content: {
        component: 'ColumnTestContentComponent'
      }
    });
  });

  it('should not traverse active path if no column is provided', () => {
    component.traverseActivePath(undefined, []);
    expect(component.columns.length).toBe(0);
  });

  it('should not deactivate column if no column is provided', () => {
    component.deactivatePath(undefined);
    expect(component.columns.length).toBe(0);
  });

  it('should deactivate column if column is active', () => {
    const activeColumn = {
      id: '1',
      active: true,
      title: 'Child Column 1',
      children: [
        {
          id: '1-1',
          active: true,
          title: 'Child Column 1-1',
          content: {
            component: 'ColumnTestContentComponent'
          }
        }
      ]
    };
    spyOn(component, 'deactivatePath').and.callThrough();
    component.deactivatePath(activeColumn);

    expect(activeColumn.active).toBeFalsy();
    expect(activeColumn.children[0].active).toBeFalsy();
  });

  it('should save selected child id/title when filter is active', () => {
    const columnCompMock = {
      column: () => ({
        id: 'c1',
        children: [
          { id: 'c1-1', title: 'Child 1', active: true },
          { id: 'c1-2', title: 'Child 2', active: false }
        ]
      }),
      searchInputValue: 'abc',
      virtualScrollViewport: () => null
    };

    component.columnComponents = {
      length: 1,
      forEach: cb => [columnCompMock].forEach(cb),
      toArray: () => [columnCompMock]
    } as any;

    component.saveScrollState();

    expect((component as any).selectedChildIds.get('c1')).toBe('c1-1');
    expect((component as any).selectedChildTitles.get('c1')).toBe('Child 1');
    expect((component as any).scrollPositions.has('c1')).toBeFalse();
  });

  it('should restore scroll using selected child id/title', () => {
    const scrollToChild = jasmine.createSpy('scrollToChild').and.returnValue(true);
    const columnCompMock = {
      column: () => ({ id: 'c1' }),
      scrollToChild,
      virtualScrollViewport: () => null
    };

    component.columns = [{ id: 'c1', active: true, title: 'C1' } as any];
    component.columnComponents = {
      length: 1,
      forEach: cb => [columnCompMock].forEach(cb),
      toArray: () => [columnCompMock]
    } as any;

    (component as any).selectedChildIds.set('c1', 'c1-2');
    (component as any).selectedChildTitles.set('c1', 'Child 2');

    const restored = component.restoreScrollPositions();
    expect(restored).toBeTrue();
    expect(scrollToChild).toHaveBeenCalledWith('c1-2', 'Child 2');
    expect((component as any).selectedChildIds.has('c1')).toBeFalse();
    expect((component as any).selectedChildTitles.has('c1')).toBeFalse();
  });
});
