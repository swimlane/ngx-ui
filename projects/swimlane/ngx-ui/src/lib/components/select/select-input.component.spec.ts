import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';

import { KeyboardKeys } from '../../enums';
import { SelectInputComponent } from './select-input.component';
import { selectDropdownOptionMock } from './select-dropdown-option.mock';

describe('SelectInputComponent', () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectInputComponent],
      providers: [{ provide: ElementRef, useValue: { nativeElement: {} } }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.componentInstance;

    component.selected = [];
    component.autofocus = false;
    component.allowClear = false;
    component.multiple = false;
    component.tagging = false;
    component.allowAdditions = false;
    component.disableDropdown = false;

    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
    expect(component.multiple).toBeFalsy();
  });

  describe('ngAfterViewInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectInputComponent);
      component = fixture.componentInstance;

      component.autofocus = true;
      component.allowClear = false;
      component.multiple = false;
      component.tagging = true;
      component.allowAdditions = false;
      component.disableDropdown = false;

      fixture.detectChanges();
    });

    it('should focus input', done => {
      const spy = spyOn(component.inputElement.nativeElement, 'focus');
      component.ngAfterViewInit();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 5);
    });
  });

  describe('onKeyUp', () => {
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
      component.onKeyUp(event);
      expect(spy).toHaveBeenCalledWith({ event, value: '' });
    });

    describe('enter', () => {
      beforeEach(() => {
        event.key = KeyboardKeys.ENTER;
      });

      it('should select value when not selected', () => {
        const spy = spyOn(component.selection, 'emit');
        event.target.value = 'test';
        component.onKeyUp(event);
        expect(spy).toHaveBeenCalled();
      });

      it('should not select value when already selected', () => {
        component.selected = ['test'];
        const spy = spyOn(component.selection, 'emit');
        event.target.value = 'test';
        component.onKeyUp(event);
        expect(spy).not.toHaveBeenCalled();
      });

      it('should do nothing if !value', () => {
        const spy = spyOn(component.selection, 'emit');
        component.onKeyUp(event);
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('escape', () => {
      beforeEach(() => {
        event.key = KeyboardKeys.ESCAPE;
      });

      it('should toggle', () => {
        const spy = spyOn(component.toggle, 'emit');
        component.onKeyUp(event);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('onKeyDown', () => {
    let event: any;

    beforeEach(() => {
      event = {
        stopPropagation: () => undefined
      };
    });

    it('should do nothing if disableDropdown', () => {
      const spy = spyOn(event, 'stopPropagation');
      component.disableDropdown = true;
      component.onKeyDown(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit event if tagging', () => {
      const spy = spyOn(component.keyup, 'emit');
      component.tagging = true;
      component.onKeyDown(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit event if !tagging', () => {
      const spy = spyOn(component.keyup, 'emit');
      component.tagging = false;
      component.onKeyDown(event);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    const event: any = {};

    beforeEach(() => {
      fixture = TestBed.createComponent(SelectInputComponent);
      component = fixture.componentInstance;

      component.autofocus = true;
      component.allowClear = false;
      component.multiple = false;
      component.tagging = true;
      component.allowAdditions = false;
      component.disableDropdown = false;

      fixture.detectChanges();
    });

    it('should do nothing if disableDropdown', () => {
      const spy = spyOn(component.activate, 'emit');
      component.disableDropdown = true;
      component.onClick(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should focus input if tagging', done => {
      const spy = spyOn(component.inputElement.nativeElement, 'focus');
      component.onClick(event);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 5);
    });

    it('should emit activate but not focus is !tagging', done => {
      const spy = spyOn(component.inputElement.nativeElement, 'focus');
      component.tagging = false;
      component.onClick(event);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 5);
    });
  });

  describe('onOptionRemove', () => {
    let event: any;

    beforeEach(() => {
      event = {
        stopPropagation: () => undefined
      };
    });

    it('should remove value from selection', () => {
      const spy = spyOn(component.selection, 'emit');
      component.selected = ['test', 'test1', 'test2'];
      component.onOptionRemove(event, { name: 'test', value: 'test' });
      expect(spy).toHaveBeenCalledWith(['test1', 'test2']);
    });

    it('should remove value from selection with identifier', () => {
      const spy = spyOn(component.selection, 'emit');
      component.identifier = 'value';
      component.selected = [{ value: 'test' }, { value: 'test1' }, { value: 'test2' }];
      component.onOptionRemove(event, { name: 'test', value: { value: 'test' } });
      expect(spy).toHaveBeenCalledWith([{ value: 'test1' }, { value: 'test2' }]);
    });
  });

  describe('caretVisible', () => {
    beforeEach(() => {
      component.disableDropdown = false;
      component.tagging = false;
      component.options = [selectDropdownOptionMock(), selectDropdownOptionMock(), selectDropdownOptionMock()];
    });

    it('should be false when disableDropdown', () => {
      component.disableDropdown = true;
      expect(component.caretVisible).toBeFalsy();
    });

    it('should be false when tagging and no options', () => {
      component.tagging = true;
      component.options = [];
      expect(component.caretVisible).toBeFalsy();
    });

    it('should be true when tagging and options exist', () => {
      component.tagging = true;
      expect(component.caretVisible).toBeTruthy();
    });

    it('should be true when !tagging and !disableDropdown', () => {
      expect(component.caretVisible).toBeTruthy();
    });
  });

  describe('isNotTemplate', () => {
    it('should be true if string', () => {
      component.selectCaret = 'test';
      expect(component.isNotTemplate).toBeTruthy();
    });

    it('should be true if object', () => {
      component.selectCaret = {} as any;
      expect(component.isNotTemplate).toBeTruthy();
    });
  });

  describe('selected', () => {
    beforeEach(() => {
      component.tagging = false;
      component.options = [selectDropdownOptionMock(), selectDropdownOptionMock(), selectDropdownOptionMock()];
    });

    it('should return empty when no selected values', () => {
      component.selected = undefined;
      expect(component.selectedOptions.length).toBe(0);
    });

    it('should get selected options from selected values', () => {
      component.selected = component.options.map(o => o.value);
      expect(component.selectedOptions.length).toBe(component.selected.length);
    });

    it('should get selected options from selected values with identifier', () => {
      component.identifier = 'value';
      component.options = [
        selectDropdownOptionMock({ value: { value: 'test' } }),
        selectDropdownOptionMock({ value: { value: 'test1' } }),
        selectDropdownOptionMock({ value: { value: 'test2' } })
      ];

      component.selected = [{ value: 'test' }];

      expect(component.selectedOptions.length).toBe(1);
    });

    it('should create new option if tagging and it doesnt exist', () => {
      component.tagging = true;
      component.selected = ['xyz123'];
      expect(component.selectedOptions.length).toBe(1);
    });
  });
});
