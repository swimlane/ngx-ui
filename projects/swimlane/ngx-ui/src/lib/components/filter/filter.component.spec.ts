import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { SelectDropdownOption } from '../select/select-dropdown-option.interface';
import { FilterType } from './filter.type.enum';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  const options: SelectDropdownOption[] = [
    { name: 'Option1', value: '1' },
    { name: 'Option2', value: '2' },
    { name: 'Option3', value: '3' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.options = options;
  });

  describe('AutoSelectAll', () => {
    it('onDropdownSelection should call OnSelectAll', () => {
      component.autoSelectAll = true;
      component.multiple = true;
      component.showSelectAll = true;
      component.value = [options[0], options[1]];
      const spyOnSelectAll = vi.spyOn(component, 'onSelectAll');
      component.onDropdownSelection(options[2] as SelectDropdownOption);
      expect(spyOnSelectAll).toHaveBeenCalled();
    });

    it('onDropdownSelection should not call OnSelectAll because not all options are selected', () => {
      component.autoSelectAll = true;
      component.multiple = true;
      component.showSelectAll = true;
      component.value = [options[0]];
      const spyOnSelectAll = vi.spyOn(component, 'onSelectAll');
      component.onDropdownSelection(options[2] as SelectDropdownOption);
      expect(spyOnSelectAll).not.toHaveBeenCalled();
    });

    it('onDropdownSelection should not call OnSelectAll because autoSelectAll is false', () => {
      component.autoSelectAll = false;
      component.multiple = true;
      component.showSelectAll = true;
      component.value = [options[0], options[1]];
      const spyOnSelectAll = vi.spyOn(component, 'onSelectAll');
      component.onDropdownSelection(options[2] as SelectDropdownOption);
      expect(spyOnSelectAll).not.toHaveBeenCalled();
    });

    it('should return true for isSingleSelect when not multiple and filterType equals to Select', () => {
      component.type = FilterType.Select;
      component.multiple = false;
      expect(component.isSingleSelect).toBeTruthy();
    });

    it('should return false for isSingleSelect when multiple and filterType equals to Select', () => {
      component.type = FilterType.Select;
      component.multiple = true;
      expect(component.isSingleSelect).toBeFalsy();
    });

    it('should return false for isSingleSelect when filterType is different from Select', () => {
      component.type = FilterType.Button;
      expect(component.isSingleSelect).toBeFalsy();
    });

    it('should return filterCount for filterType Select based-on values', () => {
      component.type = FilterType.Select;
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
      const spyClickEmit = vi.spyOn(component.clicked, 'emit');
      component.disabled = false;
      component.onFilterButtonClick(new Event('click'));
      expect(spyClickEmit).toHaveBeenCalled();
    });

    it('should not emit click emitter when button is disabled', () => {
      const spyClickEmit = vi.spyOn(component.clicked, 'emit');
      component.disabled = true;
      component.onFilterButtonClick(new Event('click'));
      expect(spyClickEmit).not.toHaveBeenCalled();
    });
  });
});
