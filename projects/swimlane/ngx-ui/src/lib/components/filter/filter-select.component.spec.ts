import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterSelectComponent } from './filter-select.component';
import { SelectDropdownOption } from '../select/select-dropdown-option.interface';
import { FilterType } from './filter.type.enum';

describe('FilterSelectComponent', () => {
  let component: FilterSelectComponent;
  let fixture: ComponentFixture<FilterSelectComponent>;

  const options: SelectDropdownOption[] = [
    { name: 'Option1', value: '1' },
    { name: 'Option2', value: '2' },
    { name: 'Option3', value: '3' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterSelectComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectComponent);
    component = fixture.componentInstance;
    component.options = options;
  });

  describe('AutoSelectAll', () => {
    it('onDropdownSelection should call OnSelectAll', () => {
      component.autoSelectAll = true;
      component.multiple = true;
      component.showSelectAll = true;
      component.value = [options[0], options[1]];
      const spyOnSelectAll = spyOn(component, 'onSelectAll');
      component.onDropdownSelection(options[2] as SelectDropdownOption);
      expect(spyOnSelectAll).toHaveBeenCalled();
    });

    it('onDropdownSelection should not call OnSelectAll because not all options are selected', () => {
      component.autoSelectAll = true;
      component.multiple = true;
      component.showSelectAll = true;
      component.value = [options[0]];
      const spyOnSelectAll = spyOn(component, 'onSelectAll');
      component.onDropdownSelection(options[2] as SelectDropdownOption);
      expect(spyOnSelectAll).not.toHaveBeenCalled();
    });

    it('onDropdownSelection should not call OnSelectAll because autoSelectAll is false', () => {
      component.autoSelectAll = false;
      component.multiple = true;
      component.showSelectAll = true;
      component.value = [options[0], options[1]];
      const spyOnSelectAll = spyOn(component, 'onSelectAll');
      component.onDropdownSelection(options[2] as SelectDropdownOption);
      expect(spyOnSelectAll).not.toHaveBeenCalled();
    });

    it('should return true for isSingleSelect when not multiple and filterType equals to Dropdown', () => {
      component.type = FilterType.Dropdown;
      component.multiple = false;
      expect(component.isSingleSelect).toBeTruthy();
    });

    it('should return false for isSingleSelect when multiple and filterType equals to Dropdown', () => {
      component.type = FilterType.Dropdown;
      component.multiple = true;
      expect(component.isSingleSelect).toBeFalsy();
    });

    it('should return false for isSingleSelect when filterType is different from Dropdown', () => {
      component.type = FilterType.Button;
      expect(component.isSingleSelect).toBeFalsy();
    });

    it('should return filterCount for filterType Dropdown based-on values', () => {
      component.type = FilterType.Dropdown;
      component.value = ['a', 'b'];
      expect(component.filterCount).toBe(2);
      expect(component.hasFilters).toBeTruthy();
    });

    it('should return filterCount and hasFilters for filterType Button', () => {
      component.type = FilterType.Button;
      component.filterCount = 55;
      expect(component.filterCount).toBe(55);
      expect(component.hasFilters).toBeTruthy();
    });

    it('should emit click emitter when button is enabled', () => {
      const spyClickEmit = spyOn(component.click, 'emit');
      component.disabled = false;
      component.onButtonFilterClick({ stopPropagation: () => {} });
      expect(spyClickEmit).toHaveBeenCalledTimes(1);
    });

    it('should not emit click emitter when button is disabled', () => {
      const spyClickEmit = spyOn(component.click, 'emit');
      component.disabled = true;
      component.onButtonFilterClick({ stopPropagation: () => {} });
      expect(spyClickEmit).not.toHaveBeenCalled();
    });
  });
});
