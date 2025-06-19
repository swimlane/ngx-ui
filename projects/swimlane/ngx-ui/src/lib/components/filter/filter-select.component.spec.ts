import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterSelectComponent } from './filter-select.component';
import { SelectDropdownOption } from '../select/select-dropdown-option.interface';

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
  });
});
