import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionListComponent } from './selection-list.component';
import { mockParentMap, mockSelectionList, mockSelectionMap } from '../testing/mocks';
import { SelectionList } from '../types/selection-list';

describe('SelectionListComponent', () => {
  let component: SelectionListComponent;
  let fixture: ComponentFixture<SelectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectionListComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('parentMap', mockParentMap);
    fixture.componentRef.setInput('selected', new Set<string>());
    fixture.componentRef.setInput('selectionList', structuredClone(mockSelectionList));
    fixture.componentRef.setInput('selectionLists', [
      structuredClone(mockSelectionList.children![0]),
      structuredClone(mockSelectionList.children![0].children![0]),
      structuredClone(mockSelectionList.children![0].children![1])
    ]);
    fixture.componentRef.setInput('selectionMap', mockSelectionMap);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleListNavigation', () => {
    it('should return if the selection list is disabled', () => {
      const onListNavigationSpy = spyOn(component.onListNavigation, 'emit');
      const selectionList: SelectionList = {
        children: [{ id: '11', title: 'Child Selection List 1' }],
        disabled: true,
        id: '1',
        title: 'Selection List 1'
      };

      component.handleListNavigation(selectionList, true);

      expect(onListNavigationSpy).not.toHaveBeenCalled();
    });

    it('should emit the list navigation event', () => {
      const onListNavigationSpy = spyOn(component.onListNavigation, 'emit');
      const selectionList: SelectionList = {
        children: [{ id: '11', title: 'Child Selection List 1' }],
        id: '1',
        title: 'Selection List 1'
      };

      component.handleListNavigation(selectionList, true);

      expect(onListNavigationSpy).toHaveBeenCalledWith({
        active: true,
        listId: component.selectionList()?.id as string,
        selectionList
      });
    });
  });

  describe('handleSelectionChange', () => {
    it('should add the selected option and its ancestors to the selected set and emit the selection state change', () => {
      const selectAllAncestorsSpy = spyOn(component as any, 'selectAllAncestors').and.callThrough();
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');
      const mockEvent = { target: { checked: true } } as unknown as Event;
      const selectedOption = mockSelectionList.children![0].children![0].children![0] as SelectionList;

      component.handleSelectionChange(mockEvent, selectedOption);

      expect(component.selected()!.size).toBe(3);
      expect(component.selected()!.has('1')).toBe(true);
      expect(component.selected()!.has('1-1')).toBe(true);
      expect(component.selected()!.has('1-1-1')).toBe(true);
      expect(selectAllAncestorsSpy).toHaveBeenCalledWith(selectedOption.id);
      expect(onSelectedChangeSpy).toHaveBeenCalled();
    });

    it('should remove the selected option and its ancestors from the selected set and emit the selection state change', () => {
      const deselectAllAncestorsSpy = spyOn(
        component as any,
        'deselectAncestorsWithoutSelectedChildren'
      ).and.callThrough();
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');
      const mockEvent = { target: { checked: false } } as unknown as Event;
      const selectedOption = mockSelectionList.children![0].children![0].children![0] as SelectionList;
      component.selected()!.add('1');
      component.selected()!.add('1-1');
      component.selected()!.add('1-1-1');

      component.handleSelectionChange(mockEvent, selectedOption);

      expect(component.selected()!.size).toBe(0);
      expect(deselectAllAncestorsSpy).toHaveBeenCalledWith(selectedOption.id);
      expect(onSelectedChangeSpy).toHaveBeenCalled();
    });
  });

  describe('handleSelectDeselectAll', () => {
    it('should select all options and emit the selection change', () => {
      const selectDeselectAllChildrenSpy = spyOn(component as any, 'selectDeselectAllChildren').and.callThrough();
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');

      component.handleSelectDeselectAll();

      expect(component.selected()!.size).toBe(4);
      expect(component.selected()!.has('1')).toBe(true);
      expect(component.selected()!.has('1-1')).toBe(true);
      expect(component.selected()!.has('1-2')).toBe(true);
      expect(component.selected()!.has('1-1-1')).toBe(true);
      expect(selectDeselectAllChildrenSpy).toHaveBeenCalled();
      expect(onSelectedChangeSpy).toHaveBeenCalled();
    });

    it('should deselect all options and emit the selection change', () => {
      const selectDeselectAllChildrenSpy = spyOn(component as any, 'selectDeselectAllChildren').and.callThrough();
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');
      component.selected()!.add('1');
      component.selected()!.add('1-1');
      component.selected()!.add('1-2');
      component.selected()!.add('1-1-1');

      component.handleSelectDeselectAll();

      expect(component.selected()!.size).toBe(0);
      expect(selectDeselectAllChildrenSpy).toHaveBeenCalled();
      expect(onSelectedChangeSpy).toHaveBeenCalled();
    });
  });

  describe('handleSelectOption', () => {
    it('should call handleListNavigation if multiple selection is enabled', () => {
      const handleListNavigationSpy = spyOn(component, 'handleListNavigation');
      const selectionList: SelectionList = {
        id: 'randomId',
        title: 'Selection List 1'
      };

      component.handleSelectOption(selectionList);

      expect(handleListNavigationSpy).toHaveBeenCalledWith(selectionList, true);
    });

    it('should call handleListNavigation if the selection list has children', () => {
      const handleListNavigationSpy = spyOn(component, 'handleListNavigation');

      component.handleSelectOption(component.selectionList()!.children![0]);

      expect(handleListNavigationSpy).toHaveBeenCalledWith(component.selectionList()!.children![0], true);
    });

    it('should return if the selection list is disabled', () => {
      fixture.componentRef.setInput('multiple', false);
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');
      const selectionList: SelectionList = {
        disabled: true,
        id: 'randomId',
        title: 'Selection List 1'
      };

      component.handleSelectOption(selectionList);

      expect(component.selected()!.size).toBe(0);
      expect(onSelectedChangeSpy).not.toHaveBeenCalled();
    });

    it('should return if component is in single-select mode and the selection list is already selected', () => {
      fixture.componentRef.setInput('multiple', false);
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');

      // Add an initial selection
      component.selected()!.add(component.selectionList()!.children![0].children![0].id);

      component.handleSelectOption(component.selectionList()!.children![0].children![0]);

      expect(component.selected()!.size).toBe(1);
      expect(component.selected()!.has(component.selectionList()!.children![0].children![0].id)).toBe(true);
      expect(onSelectedChangeSpy).not.toHaveBeenCalled();
    });

    it('should add the selected list to the selected set and emit the selection change when the component is in single-select mode', () => {
      fixture.componentRef.setInput('multiple', false);
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');

      component.handleSelectOption(component.selectionList()!.children![0].children![0].children![0]);

      // Verify the selected set contains only one selected option
      expect(component.selected()!.size).toBe(1);
      expect(component.selected()!.has(component.selectionList()!.children![0].children![0].children![0].id)).toBe(
        true
      );
      expect(onSelectedChangeSpy).toHaveBeenCalled();
    });

    it('the selected set should contain only one entry after selecting a different option from the currently selected option when the component is in single-select mode', () => {
      fixture.componentRef.setInput('multiple', false);
      const onSelectedChangeSpy = spyOn(component.onSelectedChange, 'emit');

      // Add an initial selection different from the option that will be selected
      component.selected()!.add(component.selectionList()!.children![0].children![0].id);

      component.handleSelectOption(component.selectionList()!.children![0].children![1]);

      // Verify the selected set contains the only selected option
      expect(component.selected()!.size).toBe(1);
      expect(component.selected()!.has(component.selectionList()!.children![0].children![1].id)).toBe(true);
      expect(onSelectedChangeSpy).toHaveBeenCalled();
    });
  });
});
