import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

import { ColumnComponent } from './column.component';

@Component({
  selector: 'app-column-test-content',
  template: ` <h1>Column Test Content</h1> `,
  styles: [],
  standalone: true
})
export class ColumnTestContentComponent {}

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;
  let searchInputWriteValueSpy: jasmine.Spy;

  const column = {
    id: '3m',
    active: true,
    title: 'Column 3m',
    children: [
      {
        id: '3n',
        active: true,
        title: 'Column 3n',
        children: [
          {
            id: '3o',
            active: false,
            title: 'Column 3o',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      },
      {
        id: '3p',
        active: false,
        title: 'Column 3p',
        content: {
          component: ColumnTestContentComponent
        }
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ColumnComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('column', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should be defined', () => {
      expect(component).toBeTruthy();
    });

    it('should set list', () => {
      component.ngOnChanges({
        column: {
          currentValue: column,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      expect(component.list).toEqual(column.children);
    });

    it('should set active child', () => {
      component.ngOnChanges({
        column: {
          currentValue: column,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      expect(component.activeChild).toEqual({
        id: '3n',
        active: true,
        title: 'Column 3n',
        children: [
          {
            id: '3o',
            active: false,
            title: 'Column 3o',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      });
    });

    it('should display active child with content', () => {
      const contentChild = {
        id: '3m',
        active: true,
        title: 'Column 3m',
        children: [
          {
            id: '3p',
            active: true,
            title: 'Column 3p',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      };
      spyOn(component, 'displayContent').and.callThrough();
      component.ngOnChanges({
        column: {
          currentValue: contentChild,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      expect(component.activeChild).toEqual({
        id: '3p',
        active: true,
        title: 'Column 3p',
        content: {
          component: ColumnTestContentComponent
        }
      });
      expect(component.displayContent).toHaveBeenCalled();
      expect(component.componentRef).toBeDefined();
    });

    it('should set height of scrollable view', () => {
      component.ngOnChanges({
        height: {
          currentValue: '400px',
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      expect(component.scrollerHeight()).toBe('290');
    });
  });

  describe('column events', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ColumnComponent);
      fixture.componentRef?.setInput('column', column);
      fixture.detectChanges();
      component = fixture.componentInstance;
      searchInputWriteValueSpy = jasmine.createSpy('writeValue');
      (component as any).searchInput = () => ({ writeValue: searchInputWriteValueSpy });
    });

    it('should emit column id on click', () => {
      const activeColumn = {
        id: '3o',
        active: true,
        title: 'Column 3o',
        children: [
          {
            id: '3p',
            active: false,
            title: 'Column 3p',
            content: {
              component: ColumnTestContentComponent
            }
          },
          {
            id: '3q',
            active: false,
            title: 'Column 3q',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      };
      spyOn(component.tabClick, 'emit');
      component.ngOnChanges({
        column: {
          currentValue: activeColumn,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      component.onChildClick('3p');
      expect(component.tabClick.emit).toHaveBeenCalledWith({
        columnId: '3p',
        active: true,
        title: 'Column 3p',
        content: true
      });
    });

    it('should emit column id on keyup', () => {
      const activeColumn = {
        id: '3o',
        active: true,
        title: 'Column 3o',
        children: [
          {
            id: '3p',
            active: false,
            title: 'Column 3p',
            content: {
              component: ColumnTestContentComponent
            }
          },
          {
            id: '3q',
            active: false,
            title: 'Column 3q',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      };
      spyOn(component.tabClick, 'emit');
      component.ngOnChanges({
        column: {
          currentValue: activeColumn,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      component.onChildKeyup({ key: 'Enter' } as any, '3p');
      expect(component.tabClick.emit).toHaveBeenCalledWith({
        columnId: '3p',
        active: true,
        title: 'Column 3p',
        content: true
      });
    });

    it('should emit column id on keyup with space bar', () => {
      const activeColumn = {
        id: '3o',
        active: true,
        title: 'Column 3o',
        children: [
          {
            id: '3p',
            active: false,
            title: 'Column 3p',
            content: {
              component: ColumnTestContentComponent
            }
          },
          {
            id: '3q',
            active: false,
            title: 'Column 3q',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      };
      spyOn(component.tabClick, 'emit');
      component.ngOnChanges({
        column: {
          currentValue: activeColumn,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      component.onChildKeyup({ key: ' ' } as any, '3p');
      expect(component.tabClick.emit).toHaveBeenCalledWith({
        columnId: '3p',
        active: true,
        title: 'Column 3p',
        content: true
      });
    });

    it('should display content on click', () => {
      const activeColumn = {
        id: '3o',
        active: true,
        title: 'Column 3o',
        children: [
          {
            id: '3p',
            active: true,
            title: 'Column 3p',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      };
      spyOn(component, 'displayContent').and.callThrough();
      component.ngOnChanges({
        column: {
          currentValue: activeColumn,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      component.onChildClick('3p');
      expect(component.displayContent).toHaveBeenCalled();
      expect(component.componentRef).toBeDefined();
    });

    it('should display content on keyup', () => {
      const activeColumn = {
        id: '3o',
        active: true,
        title: 'Column 3o',
        children: [
          {
            id: '3p',
            active: true,
            title: 'Column 3p',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      };
      spyOn(component, 'displayContent').and.callThrough();
      component.ngOnChanges({
        column: {
          currentValue: activeColumn,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      component.onChildKeyup({ key: ' ' } as any, '3p');
      expect(component.displayContent).toHaveBeenCalled();
      expect(component.componentRef).toBeDefined();
    });

    it('should modify the list on input change', () => {
      const inputEvent = {
        target: {
          value: 'Column 3n'
        }
      } as unknown as KeyboardEvent;
      component.onInputChange(inputEvent);
      expect(component.searchInputValue).toBe('Column 3n');
      expect(component.list).toEqual([
        {
          id: '3n',
          active: true,
          title: 'Column 3n',
          children: [
            {
              id: '3o',
              active: false,
              title: 'Column 3o',
              content: {
                component: ColumnTestContentComponent
              }
            }
          ]
        }
      ]);
    });

    it('should not modify the list on input change when the input has no length', () => {
      const inputEvent = {
        target: {
          value: ''
        }
      } as unknown as KeyboardEvent;
      component.onInputChange(inputEvent);
      expect(component.searchInputValue).toBe('');
      expect(component.list).toEqual([
        {
          id: '3n',
          active: true,
          title: 'Column 3n',
          children: [
            {
              id: '3o',
              active: false,
              title: 'Column 3o',
              content: {
                component: ColumnTestContentComponent
              }
            }
          ]
        },
        {
          id: '3p',
          active: false,
          title: 'Column 3p',
          content: {
            component: ColumnTestContentComponent
          }
        }
      ]);
    });

    it('should not modify the list on input change when the input does not match', () => {
      const inputEvent = {
        target: {
          value: 'non-matching value'
        }
      } as unknown as KeyboardEvent;
      component.onInputChange(inputEvent);
      expect(component.list).toEqual([
        {
          id: '3n',
          active: true,
          title: 'Column 3n',
          children: [
            {
              id: '3o',
              active: false,
              title: 'Column 3o',
              content: {
                component: ColumnTestContentComponent
              }
            }
          ]
        },
        {
          id: '3p',
          active: false,
          title: 'Column 3p',
          content: {
            component: ColumnTestContentComponent
          }
        }
      ]);
      expect(component.activeChild).toEqual({
        id: '3n',
        active: true,
        title: 'Column 3n',
        children: [
          {
            id: '3o',
            active: false,
            title: 'Column 3o',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      });
    });

    it('should retain the active child when when the list does not include a match for the active child', () => {
      const inputEvent = {
        target: {
          value: 'Column 3p'
        }
      } as unknown as KeyboardEvent;
      component.activeChild = {
        id: '3n',
        active: true,
        title: 'Column 3n',
        children: [
          {
            id: '3o',
            active: false,
            title: 'Column 3o',
            content: {
              component: ColumnTestContentComponent
            }
          }
        ]
      };
      component.onInputChange(inputEvent);
      expect(component.list).toEqual([
        {
          id: '3n',
          active: true,
          title: 'Column 3n',
          children: [
            {
              id: '3o',
              active: false,
              title: 'Column 3o',
              content: {
                component: ColumnTestContentComponent
              }
            }
          ]
        },
        {
          id: '3p',
          active: false,
          title: 'Column 3p',
          content: {
            component: ColumnTestContentComponent
          }
        }
      ]);
    });

    it('should clear filter after child click selection', () => {
      component.onInputChange({
        target: { value: 'Column 3n' }
      } as unknown as KeyboardEvent);
      expect(component.searchInputValue).toBe('Column 3n');

      component.onChildClick('3p');
      expect(component.searchInputValue).toBe('');
      expect(component.list).toEqual(column.children);
      expect(searchInputWriteValueSpy).toHaveBeenCalledWith('');
    });

    it('should clear filter after child key selection', () => {
      component.onInputChange({
        target: { value: 'Column 3n' }
      } as unknown as KeyboardEvent);
      expect(component.searchInputValue).toBe('Column 3n');

      component.onChildKeyup({ key: 'Enter' } as any, '3p');
      expect(component.searchInputValue).toBe('');
      expect(component.list).toEqual(column.children);
      expect(searchInputWriteValueSpy).toHaveBeenCalledWith('');
    });

    it('should scroll to child by id first then title', () => {
      const scrollToIndex = jasmine.createSpy('scrollToIndex');
      (component as any).virtualScrollViewport = () => ({
        elementRef: { nativeElement: { scrollHeight: 100 } },
        scrollToIndex
      });

      const byId = component.scrollToChild('3p', 'does-not-matter');
      expect(byId).toBeTrue();
      expect(scrollToIndex).toHaveBeenCalledWith(1);

      scrollToIndex.calls.reset();
      const byTitle = component.scrollToChild(undefined, 'Column 3n');
      expect(byTitle).toBeTrue();
      expect(scrollToIndex).toHaveBeenCalledWith(0);
    });
  });
});
