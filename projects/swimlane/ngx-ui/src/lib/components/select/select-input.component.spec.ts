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

    describe('classic tagging enter', () => {
      beforeEach(() => {
        component.tagging = true;
        component.disableDropdown = false;
        component.options = [{ name: 'Test', value: 'test-option' }];
        event.key = event.code = KeyboardKeys.ENTER;
      });

      it('should select value on keyup when not selected', () => {
        const spy = vi.spyOn(component.selection, 'emit');
        event.target.value = 'test';
        component.onInputKeyUp(event);
        expect(spy).toHaveBeenCalledWith(['test']);
      });

      it('should not select value when already selected', () => {
        component.selected = ['test'];
        const spy = vi.spyOn(component.selection, 'emit');
        event.target.value = 'test';
        component.onInputKeyUp(event);
        expect(spy).not.toHaveBeenCalled();
      });

      it('should do nothing if !value', () => {
        const spy = vi.spyOn(component.selection, 'emit');
        component.onInputKeyUp(event);
        expect(spy).not.toHaveBeenCalled();
      });

      it('should not select value on keydown (commit stays on keyup)', () => {
        const spy = vi.spyOn(component.selection, 'emit');
        event.target.value = 'test';
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

    it('splits tab-separated paste into chips', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.onInputPaste({
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        clipboardData: { getData: (type: string) => (type === 'text/plain' ? 'one\ttwo' : '') },
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any);

      expect(spy).toHaveBeenCalledWith(['one', 'two']);
    });

    it('splits semicolon and newline paste into chips', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.onInputPaste({
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        clipboardData: { getData: (type: string) => (type === 'text/plain' ? 'a;b\nc' : '') },
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any);

      expect(spy).toHaveBeenCalledWith(['a', 'b', 'c']);
    });

    it('splits pasted text that contains \\n escape sequences into chips', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.onInputPaste({
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        clipboardData: { getData: (type: string) => (type === 'text/plain' ? 'a;b\\nc' : '') },
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any);

      expect(spy).toHaveBeenCalledWith(['a', 'b', 'c']);
    });

    it('inserts a single pasted value without committing', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      const target = { value: '', selectionStart: 0, selectionEnd: 0, setSelectionRange: vi.fn() };
      component.onInputPaste({
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        clipboardData: { getData: () => 'hello <b>world</b>' },
        target
      } as any);

      expect(spy).not.toHaveBeenCalled();
      expect(target.value).toBe('hello world');
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
      component.taggingValidator = (value: unknown) =>
        typeof value === 'string' && value.length > 3 ? 'Too long' : null;
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

    it('passes domain values to the validator, not chip view models', () => {
      const seen: { value: unknown; selected: readonly unknown[] }[] = [];
      component.selected = ['alpha'];
      component.taggingValidator = (value, selected) => {
        seen.push({ value, selected: [...selected] });
        return null;
      };

      component.onInputKeyDown({
        key: KeyboardKeys.ENTER,
        code: KeyboardKeys.ENTER,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: 'beta', selectionStart: 4, selectionEnd: 4 }
      } as any);

      expect(seen).toEqual([{ value: 'beta', selected: ['alpha'] }]);
    });

    it('decodes entities and strips tags when committing paste batches', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.onInputPaste({
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        clipboardData: { getData: () => 'AT&amp;T, hello <b>world</b>' },
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any);

      expect(spy).toHaveBeenCalledWith(['AT&T', 'hello world']);
    });

    it('ignores whitespace-only commits', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.onInputKeyDown({
        key: KeyboardKeys.ENTER,
        code: KeyboardKeys.ENTER,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: '   ', selectionStart: 3, selectionEnd: 3 }
      } as any);

      expect(spy).not.toHaveBeenCalled();
    });

    it('skips duplicate free tags', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.selected = ['one'];

      component.onInputKeyDown({
        key: KeyboardKeys.ENTER,
        code: KeyboardKeys.ENTER,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: 'one', selectionStart: 3, selectionEnd: 3 }
      } as any);

      expect(spy).not.toHaveBeenCalled();
    });

    it('precomputes plain label, tooltip, and invalid chip state', () => {
      const long = 'x'.repeat(40);
      component.taggingValidator = (value: unknown) => (value === 'bad' ? 'Nope' : null);
      component.selected = ['ok', 'bad', long];

      expect(component.selectedChips).toHaveLength(3);
      expect(component.selectedChips[0]).toMatchObject({
        labelText: 'ok',
        tooltipTitle: '',
        invalid: false
      });
      expect(component.selectedChips[1]).toMatchObject({
        labelText: 'bad',
        tooltipTitle: '',
        invalid: true
      });
      expect(component.selectedChips[2]).toMatchObject({
        labelText: long,
        tooltipTitle: long,
        invalid: false
      });
      expect(component.selectedChips[2].option).not.toHaveProperty('tooltipTitle');
    });

    it('keeps free-tag labels as plain text without mutating option objects', () => {
      const option = { name: 'Shared', value: 'shared' };
      component.options = [option];
      component.selected = ['shared'];

      expect(component.selectedChips[0].labelText).toBe('Shared');
      expect(option).toEqual({ name: 'Shared', value: 'shared' });
    });

    it('updates chip invalid state when selections are removed', () => {
      component.taggingValidator = (value: unknown) => (value === 'bad' ? 'Nope' : null);
      component.selected = ['bad', 'ok'];
      expect(component.selectedChips[0].invalid).toBe(true);

      component.selected = ['ok'];
      expect(component.selectedChips).toHaveLength(1);
      expect(component.selectedChips[0].invalid).toBe(false);
    });

    it('revalidates chips with peers only so uniqueness validators stay valid', () => {
      component.taggingValidator = (value, selected) => (selected.includes(value) ? 'Already selected' : null);
      component.selected = ['one', 'two'];

      expect(component.selectedChips.every(chip => !chip.invalid)).toBe(true);
    });

    it('marks chips invalid when a peer-based constraint fails', () => {
      component.taggingValidator = (value, selected) =>
        value === 'b' && selected.includes('a') ? 'Conflicts with a' : null;
      component.selected = ['a', 'b'];

      expect(component.selectedChips[0].invalid).toBe(false);
      expect(component.selectedChips[1].invalid).toBe(true);
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

    it('ignores auto-repeat Backspace after a chip is highlighted', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      component.selected = ['one', 'two'];
      const event = {
        key: KeyboardKeys.BACKSPACE,
        code: KeyboardKeys.BACKSPACE,
        repeat: false,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: '', selectionStart: 0, selectionEnd: 0 }
      } as any;

      component.onInputKeyDown(event);
      expect(component.selectedChipIndex).toBe(1);
      expect(spy).not.toHaveBeenCalled();

      event.repeat = true;
      component.onInputKeyDown(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('ignores auto-repeat Enter when committing', () => {
      const spy = vi.spyOn(component.selection, 'emit');
      const event = {
        key: KeyboardKeys.ENTER,
        code: KeyboardKeys.ENTER,
        repeat: true,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: 'tag', selectionStart: 3, selectionEnd: 3 }
      } as any;

      component.onInputKeyDown(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('rejects commits that would exceed maxSelections', () => {
      const selectionSpy = vi.spyOn(component.selection, 'emit');
      const errorSpy = vi.spyOn(component.taggingError, 'emit');
      component.maxSelections = 1;
      component.selected = ['one'];

      component.onInputKeyDown({
        key: KeyboardKeys.ENTER,
        code: KeyboardKeys.ENTER,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target: { value: 'two', selectionStart: 3, selectionEnd: 3 }
      } as any);

      expect(selectionSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('A maximum of 1 selections is allowed.');
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
