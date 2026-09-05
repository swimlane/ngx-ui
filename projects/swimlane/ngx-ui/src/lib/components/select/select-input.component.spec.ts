import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';

import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
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

    it('should focus input', async () => {
      const spy = vi.spyOn(component.inputElement.nativeElement, 'focus');
      component.ngAfterViewInit();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
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
        code: '',
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      };
    });

    it('should emit event and value', () => {
      const spy = vi.spyOn(component.keyup, 'emit');
      component.onInputKeyUp(event);
      expect(spy).toHaveBeenCalledWith({ event, value: '' });
    });

    describe('enter', () => {
      beforeEach(() => {
        component.tagging = true;
        event.key = event.code = KeyboardKeys.ENTER;
      });

      it('should select value when not selected', () => {
        const spy = vi.spyOn(component.selection, 'emit');
        event.target.value = 'test';
        component.onInputKeyDown(event);
        expect(spy).toHaveBeenCalled();
      });

      it('should not select value when already selected', () => {
        component.selected = ['test'];
        const spy = vi.spyOn(component.selection, 'emit');
        event.target.value = 'test';
        component.onInputKeyDown(event);
        expect(spy).not.toHaveBeenCalled();
      });

      it('should do nothing if !value', () => {
        const spy = vi.spyOn(component.selection, 'emit');
        component.onInputKeyDown(event);
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('escape', () => {
      beforeEach(() => {
        event.key = event.code = KeyboardKeys.ESCAPE;
      });

      it('should toggle', () => {
        const spy = vi.spyOn(component.toggle, 'emit');
        component.onInputKeyUp(event);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('onKeyDown', () => {
    let event: any;

    beforeEach(() => {
      event = {
        stopPropagation: () => undefined,
        preventDefault: () => undefined
      };
    });

    it('should do nothing if disableDropdown', () => {
      const spy = vi.spyOn(event, 'stopPropagation');
      component.disableDropdown = true;
      component.onKeyDown(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit event if tagging', () => {
      const spy = vi.spyOn(component.keyup, 'emit');
      component.tagging = true;
      component.onKeyDown(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit event if !tagging', () => {
      const spy = vi.spyOn(component.keyup, 'emit');
      component.tagging = false;
      component.onKeyDown(event);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('tagging', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('tagging', true);
      // No-option / free tagging path under test.
      component.disableDropdown = true;
      component.options = [];
      component.selected = [];
      fixture.detectChanges();
    });

    it('splits and normalizes pasted values', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        clipboardData: { getData: () => ' <b>one</b>, two\u200B;three\nfour' },
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any;

      component.onInputPaste(event);

      expect(spy).toHaveBeenCalledWith(['one', 'two', 'three', 'four']);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('commits values with Tab', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      const event = {
        key: KeyboardKeys.TAB,
        code: KeyboardKeys.TAB,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: '42', selectionStart: 2, selectionEnd: 2 }
      } as any;

      component.onInputKeyDown(event);

      expect(spy).toHaveBeenCalledWith(['42']);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('rejects invalid values and surfaces the error', () => {
      const selectionSpy = vi.spyOn(component.selection, 'emit');
      const errorSpy = vi.spyOn(component.taggingError, 'emit');
      component.taggingValidator = value => (value.length > 3 ? 'Too long' : null);
      const event = {
        key: KeyboardKeys.ENTER,
        code: KeyboardKeys.ENTER,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: 'lengthy', selectionStart: 7, selectionEnd: 7 }
      } as any;

      component.onInputKeyDown(event);

      expect(selectionSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('Too long');
    });

    it('commits pending input on blur', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.inputElement.nativeElement.value = 'pending';

      component.onInputBlur({ relatedTarget: null } as FocusEvent);

      expect(spy).toHaveBeenCalledWith(['pending']);
    });

    it('does not commit filter text on blur when tagging has options', () => {
      component.disableDropdown = false;
      component.options = [{ name: 'DDOS', value: 'ddos' }];
      fixture.detectChanges();

      const spy = vi.spyOn(component.selection, 'emit');
      const clearSpy = vi.spyOn(component, 'clearInput');
      component.inputElement.nativeElement.value = 'dd';

      // Classic path uses clearInput on blur, not commit.
      component.clearInput();

      expect(spy).not.toHaveBeenCalled();
      expect(component.isFreeTagging).toBe(false);
      expect(clearSpy).toHaveBeenCalled();
    });

    it('selects and removes chips with the keyboard', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.selected = ['one', 'two'];
      const event = {
        key: KeyboardKeys.ARROW_LEFT,
        code: KeyboardKeys.ARROW_LEFT,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any;

      component.onInputKeyDown(event);
      expect(component.selectedChipIndex).toBe(1);

      event.key = event.code = KeyboardKeys.ARROW_LEFT;
      component.onInputKeyDown(event);
      expect(component.selectedChipIndex).toBe(0);

      event.key = event.code = KeyboardKeys.DELETE;
      component.onInputKeyDown(event);
      expect(spy).toHaveBeenCalledWith(['two']);
    });

    it('highlights the last chip on first Backspace before removing', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.selected = ['one', 'two'];
      const event = {
        key: KeyboardKeys.BACKSPACE,
        code: KeyboardKeys.BACKSPACE,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any;

      component.onInputKeyDown(event);
      expect(component.selectedChipIndex).toBe(1);
      expect(spy).not.toHaveBeenCalled();

      component.onInputKeyDown(event);
      expect(spy).toHaveBeenCalledWith(['one']);
    });

    it('moves a double-clicked chip into the editor', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.selected = ['one', 'two'];

      component.onChipDoubleClick({ preventDefault: vi.fn(), stopPropagation: vi.fn() } as any, 0);

      expect(spy).toHaveBeenCalledWith(['two']);
      expect(component.inputElement.nativeElement.value).toBe('one');
    });

    it('leaves an empty Tab available for native navigation', () => {
      const event = {
        key: KeyboardKeys.TAB,
        code: KeyboardKeys.TAB,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any;

      component.onInputKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
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
      const spy = vi.spyOn(component.activate, 'emit');
      component.disableDropdown = true;
      component.onClick();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should focus input if tagging', async () => {
      const spy = vi.spyOn(component.inputElement.nativeElement, 'focus');
      component.onClick();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
      }, 5);
    });

    it('should emit activate but not focus is !tagging', async () => {
      const spy = vi.spyOn(component.inputElement.nativeElement, 'focus');
      component.tagging = false;
      component.onClick();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
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
      const spy = vi.spyOn(component.selection, 'emit');
      component.selected = ['test', 'test1', 'test2'];
      component.onOptionRemove(event, { name: 'test', value: 'test' });
      expect(spy).toHaveBeenCalledWith(['test1', 'test2']);
    });

    it('should remove value from selection with identifier', () => {
      const spy = vi.spyOn(component.selection, 'emit');
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
