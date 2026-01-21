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
    vi.spyOn(component, 'getCurrentColumns');
    vi.spyOn(component, 'traverseActivePath');

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
    vi.spyOn(component, 'deactivatePath');
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
    expect(component.columns[2].active).toBe(true);
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
    vi.spyOn(component, 'deactivatePath');
    component.deactivatePath(activeColumn);

    expect(activeColumn.active).toBeFalsy();
    expect(activeColumn.children[0].active).toBeFalsy();
  });
});
