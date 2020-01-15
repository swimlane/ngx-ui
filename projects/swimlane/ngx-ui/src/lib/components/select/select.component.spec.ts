import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KeyboardKeys } from '../../enums';
import { SelectComponentFixture } from './select.component.fixture';
import { SelectComponent } from './select.component';
import { SelectOptionDirective } from './select-option.directive';
import { SelectInputComponent } from './select-input.component';
import { SelectDropdownComponent } from './select-dropdown.component';
import { selectDropdownOptionMock } from './select-dropdown-option.mock';

describe('SelectComponent', () => {
  let component: SelectComponentFixture;
  let fixture: ComponentFixture<SelectComponentFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule],
      declarations: [
        SelectComponent,
        SelectOptionDirective,
        SelectInputComponent,
        SelectDropdownComponent,
        SelectComponentFixture
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponentFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
    expect(component.select).toBeTruthy();
    expect(component.select.filterable).toBeFalsy();
    expect(component.select.filterCaseSensitive).toBeFalsy();
  });

  describe('value', () => {
    beforeEach(() => {
      component.selected = [component.select.options[0].value];
      fixture.detectChanges();
    });

    it('should update value', () => {
      component.select.value = [component.select.options[1].value];
      fixture.detectChanges();
      expect(component.selected.length).toBe(1);
    });

    it('should not update value if hasnt changed', () => {
      component.select.value = component.select.value;
      fixture.detectChanges();
      expect(component.selected.length).toBe(1);
    });
  });

  describe('dropdownVisible', () => {
    it('should be false when disableDropdown', () => {
      component.disableDropdown$.next(true);
      fixture.detectChanges();
      expect(component.select.dropdownVisible).toBeFalsy();
    });

    it('should be false when tagging and !options', () => {
      component.tagging$.next(true);
      component.options$.next([]);
      fixture.detectChanges();
      component.select.options = [];
      expect(component.select.dropdownVisible).toBeFalsy();
    });
  });

  describe('onDropdownSelection', () => {
    beforeEach(() => {
      component.select.value = [];
    });

    it('should do nothing if option disabled', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.onDropdownSelection(selectDropdownOptionMock({ disabled: true }));
      expect(spy).not.toHaveBeenCalled();
    });

    it('should do nothing if max selection reached', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.value = component.options$.value.map(o => o.value);
      component.select.onDropdownSelection(selectDropdownOptionMock());
      expect(spy).not.toHaveBeenCalled();
    });

    describe('closeOnSelect', () => {
      beforeEach(() => {
        component.select.closeOnSelect = true;
        component.select.multiple = false;
        component.select.value = [];
        fixture.detectChanges();
      });

      it('should close dropdown', () => {
        const spy = spyOn(component.select, 'toggleDropdown');
        component.select.onDropdownSelection(selectDropdownOptionMock());
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('tagging', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponentFixture);
        component = fixture.componentInstance;
        component.tagging$.next(true);
        fixture.detectChanges();
      });

      beforeEach(() => {
        component.select.value = [];
        fixture.detectChanges();
      });

      it('should reset input if tagging', () => {
        component.select.onDropdownSelection(selectDropdownOptionMock());
        expect(component.select.inputComponent.inputElement.nativeElement.value).toBe('');
      });
    });

    describe('value', () => {
      it('should set value if option found', () => {
        component.select.onDropdownSelection(component.select.options[0]);
        fixture.detectChanges();
        expect(component.selected.length).toBe(1);
      });

      it('should multi select if option found', () => {
        component.multiple$.next(true);
        component.select.value = [component.options$.value[0].value];
        fixture.detectChanges();
        component.select.onDropdownSelection(component.options$.value[1]);
        expect(component.selected.length).toBe(2);
      });

      it('should set value if option found with identifier', () => {
        component.select.identifier = 'value';
        component.select.value = [{ value: 'test1' }];
        component.select.options = [
          selectDropdownOptionMock({ value: { value: 'test' } }),
          selectDropdownOptionMock({ value: { value: 'test1' } }),
          selectDropdownOptionMock({ value: { value: 'test2' } })
        ];
        fixture.detectChanges();

        component.select.onDropdownSelection(component.select.options[0]);
        expect(component.selected.length).toBe(1);
      });

      it('should not set value if already selected', () => {
        component.select.value = ['test'];
        component.select.onDropdownSelection({ name: 'test', value: 'test' });
        fixture.detectChanges();
        expect(component.selected.length).toBe(1);
      });
    });
  });

  describe('onInputSelection', () => {
    beforeEach(() => {
      component.selected = [];
      fixture.detectChanges();
    });

    it('should set value', () => {
      component.select.onInputSelection([component.select.options[0].value]);
      fixture.detectChanges();
      expect(component.selected.length).toBe(1);
    });
  });

  describe('onFocus', () => {
    it('should do nothing if disabled', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.disabled = true;
      component.select.onFocus();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should toggle dropdown', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.disabled = false;
      component.select.onFocus();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onClear', () => {
    beforeEach(() => {
      component.selected = [component.select.options[0].value];
      fixture.detectChanges();
    });

    it('should clear selection', () => {
      component.select.onClear();
      fixture.detectChanges();
      expect(component.selected.length).toBe(0);
    });
  });

  describe('onBodyClick', () => {
    const event: any = {
      stopPropagation: () => undefined,
      target: document.createElement('div')
    };

    beforeEach(() => {
      component.select.dropdownActive = true;
      fixture.detectChanges();
    });

    it('should do nothing if not active', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.dropdownActive = false;
      component.select.onBodyClick(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should toggle dropdown', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.onBodyClick(event);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    it('should toggle dropdown', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.onClose();
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('onToggle', () => {
    it('should do nothing if disabled', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.disabled = true;
      component.select.onToggle();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should toggle dropdown', () => {
      const spy = spyOn(component.select, 'toggleDropdown');
      component.select.onToggle();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('toggleDropdown', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SelectComponentFixture);
      component = fixture.componentInstance;
      component.closeOnBodyClick$.next(true);
      fixture.detectChanges();
    });

    it('should call toggle listener', () => {
      component.select.toggleDropdown(!component.select.dropdownActive);
      const spy = spyOn(component.select, 'toggleListener');
      component.select.toggleDropdown(!component.select.dropdownActive);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyUp', () => {
    let event: any;

    beforeEach(() => {
      event = {
        stopPropagation: () => undefined,
        key: ''
      };

      component.select.focusIndex = 0;
      fixture.detectChanges();
    });

    it('should focus next element on arrow down', () => {
      const idx = component.select.focusIndex;
      event.key = KeyboardKeys.ARROW_DOWN;
      component.select.onKeyUp({ event, value: '' });
      expect(component.select.focusIndex).toEqual(idx + 1);
    });

    it('should set filter when not arrow down', () => {
      component.select.onKeyUp({ event, value: 'test' });
      expect(component.select.filterQuery).toEqual('test');
    });
  });

  describe('invalid', () => {
    it('should be true when required and value invalid', () => {
      component.select.required = true;
      component.select.value = undefined;
      expect(component.select.invalid).toBeTruthy();
      component.select.value = [];
      expect(component.select.invalid).toBeTruthy();
    });

    it('should be false when required and value valid', () => {
      component.select.required = true;
      component.select.value = ['test'];
      expect(component.select.invalid).toBeFalsy();
    });

    it('should be true when value.length > maxSelections', () => {
      component.select.maxSelections = 1;
      component.select.value = ['test', 'test1'];
      expect(component.select.invalid).toBeTruthy();
    });
  });

  describe('requiredIndicatorView', () => {
    it('should get indicator if required', () => {
      component.select.required = true;
      component.select.requiredIndicator = '*';
      expect(component.select.requiredIndicatorView).toEqual('*');
    });
  });

  describe('optionTemplates', () => {
    it('should get templates', () => {
      expect(component.select.optionTemplates.length).toBeGreaterThan(0);
    });

    it('should not set options if !value', () => {
      component.select.optionTemplates = { toArray: () => ['test'] } as any;
      component.select.optionTemplates = undefined;
      expect(component.select.optionTemplates).toBeUndefined();
      expect(component.select.options.length).toBe(1);
    });
  });
});
