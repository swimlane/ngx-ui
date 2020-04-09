import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import * as faker from 'faker';

import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { SelectDropdownComponent } from './select-dropdown.component';
import { selectDropdownOptionMock } from './select-dropdown-option.mock';

describe('SelectDropdownComponent', () => {
  let component: SelectDropdownComponent;
  let fixture: ComponentFixture<SelectDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectDropdownComponent],
      providers: [{ provide: ElementRef, useValue: { nativeElement: {} } }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDropdownComponent);
    component = fixture.componentInstance;

    component.options = [selectDropdownOptionMock(), selectDropdownOptionMock(), selectDropdownOptionMock()];

    component.tagging = false;
    component.allowAdditions = false;
    component.filterable = false;
    component.filterCaseSensitive = false;
    component.focusIndex = 0;

    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow additions', () => {
    expect(component.allowAdditions).toBeFalsy();
  });

  it('should have empty groups when no options', () => {
    component.options = undefined;
    expect(component.groups.length).toEqual(0);
  });

  describe('isNotTemplate', () => {
    it('should not be template if string', () => {
      expect(component.isNotTemplate).toBeTruthy();
    });

    it('should not be template if object', () => {
      component.allowAdditionsText = {} as any;
      expect(component.isNotTemplate).toBeTruthy();
    });
  });

  describe('ngAfterViewInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectDropdownComponent);
      component = fixture.componentInstance;

      component.options = [selectDropdownOptionMock(), selectDropdownOptionMock(), selectDropdownOptionMock()];

      component.tagging = false;
      component.allowAdditions = false;
      component.filterable = true;
      component.filterCaseSensitive = false;
      component.focusIndex = 0;

      fixture.detectChanges();
    });

    it('should focus filter input', (done) => {
      const spy = spyOn(component.filterInput.nativeElement, 'focus');
      component.ngAfterViewInit();
      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 5);
    });
  });

  describe('isSelected', () => {
    describe('without identifier', () => {
      it('should not be selected', () => {
        component.selected = [];
        expect(component.isSelected(component.options[0])).toBeFalsy();
      });

      it('should be selected', () => {
        component.selected = [component.options[0].value];
        expect(component.isSelected(component.options[0])).toBeTruthy();
      });
    });

    describe('with identifier', () => {
      beforeEach(() => {
        component.identifier = 'value';
        component.options = [
          selectDropdownOptionMock({
            value: { value: faker.random.word() }
          }),
          selectDropdownOptionMock({
            value: { value: faker.random.word() }
          }),
          selectDropdownOptionMock({
            value: { value: faker.random.word() }
          })
        ];

        fixture.detectChanges();
      });

      it('should not be selected', () => {
        component.selected = [];
        expect(component.isSelected(component.options[0])).toBeFalsy();
      });

      it('should be selected', () => {
        component.selected = [component.options[0].value];
        expect(component.isSelected(component.options[0])).toBeTruthy();
      });
    });
  });

  describe('onInputKeyUp', () => {
    let event: any;

    beforeEach(() => {
      event = {
        preventDefault: () => undefined,
        stopPropagation: () => undefined,
        key: '',
        target: { value: '' }
      };
    });

    it('should emit event and value', () => {
      const spy = spyOn(component.keyup, 'emit');
      component.onInputKeyUp(event);
      expect(spy).toHaveBeenCalledWith({ event, value: '' });
    });

    it('should close when escape pressed', () => {
      event.key = KeyboardKeys.ESCAPE;
      const spy = spyOn(component.close, 'emit');
      component.onInputKeyUp(event);
      expect(spy).toHaveBeenCalled();
    });

    it('should focus next item on arrow-down', () => {
      const idx = component.focusIndex;
      event.key = KeyboardKeys.ARROW_DOWN;
      component.onInputKeyUp(event);
      expect(component.focusIndex).toEqual(idx + 1);
    });

    it('should not change filterQuery if it equals value', () => {
      component.filterQuery = '';
      component.onInputKeyUp(event);
      expect(component.filterQuery).toEqual('');
    });
  });

  describe('onOptionKeyDown', () => {
    let event: any;

    beforeEach(() => {
      event = {
        preventDefault: () => undefined,
        stopPropagation: () => undefined,
        key: ''
      };
    });

    it('should focus next element on arrow down', () => {
      const idx = component.focusIndex;
      event.key = KeyboardKeys.ARROW_DOWN;
      component.onOptionKeyDown(event);
      expect(component.focusIndex).toEqual(idx + 1);
    });

    it('should not focus next element when element is last', () => {
      component.focusIndex = component.options.length - 1;
      const idx = component.focusIndex;
      event.key = KeyboardKeys.ARROW_DOWN;
      component.onOptionKeyDown(event);
      expect(component.focusIndex).toEqual(idx);
    });

    it('should focus last element on arrow up', () => {
      component.focusIndex = 2;
      const idx = component.focusIndex;
      event.key = KeyboardKeys.ARROW_UP;
      component.onOptionKeyDown(event);
      expect(component.focusIndex).toEqual(idx - 1);
    });

    it('should not focus last element when element is first', () => {
      component.focusIndex = 0;
      const idx = component.focusIndex;
      event.key = KeyboardKeys.ARROW_UP;
      component.onOptionKeyDown(event);
      expect(component.focusIndex).toEqual(idx);
    });

    it('should select element on enter', () => {
      const spy = spyOn(component.selection, 'emit');
      event.key = KeyboardKeys.ENTER;
      component.onOptionKeyDown(event);
      expect(spy).toHaveBeenCalled();
    });

    it('should do nothing', () => {
      const spy = spyOn(component.selection, 'emit');
      const idx = component.focusIndex;
      component.onOptionKeyDown(event);
      expect(spy).not.toHaveBeenCalled();
      expect(idx).toEqual(component.focusIndex);
    });
  });

  describe('onAddClicked', () => {
    let event: any;

    beforeEach(() => {
      event = {
        preventDefault: () => undefined,
        stopPropagation: () => undefined,
        key: '',
        target: { value: '' }
      };
    });

    it('should select element and close', () => {
      const selectSpy = spyOn(component.selection, 'emit');
      const closeSpy = spyOn(component.close, 'emit');
      component.onAddClicked(event, '');
      expect(selectSpy).toHaveBeenCalled();
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('groupBy', () => {
    beforeEach(() => {
      component.options = [
        selectDropdownOptionMock({
          value: { value: faker.random.word(), group: '1' }
        }),
        selectDropdownOptionMock({
          value: { value: faker.random.word(), group: '1' }
        }),
        selectDropdownOptionMock({
          value: { value: faker.random.word(), group: '2' }
        })
      ];

      fixture.detectChanges();
    });

    it('should group by value', () => {
      component.groupBy = 'group';
      expect(component.groups.length).toEqual(2);
    });

    it('should not filter options', () => {
      component.filterQuery = component.options[0].value;
      component.groupBy = 'group';
      expect(component.groups).toBeDefined();
    });

    it('should filter options', () => {
      component.groupBy = 'group';
      component.filterQuery = 'test';
      expect(component.groups).toBeDefined();
    });
  });
});
