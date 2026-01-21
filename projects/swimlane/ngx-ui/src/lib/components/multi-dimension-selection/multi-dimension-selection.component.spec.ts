import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDimensionSelectionComponent } from './multi-dimension-selection.component';
import { mockParentMap, mockSelectionList, mockSelectionMap } from './testing/mocks';

describe('MultiDimensionSelectionComponent', () => {
  let component: MultiDimensionSelectionComponent;
  let fixture: ComponentFixture<MultiDimensionSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MultiDimensionSelectionComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDimensionSelectionComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectionList', structuredClone(mockSelectionList));
    component.selectionLists = [];
    component.selectedSet = new Set<string>();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initSelectionLists', () => {
    it('should set selectionLists to an empty array if the selectionList input is null or undefined', () => {
      fixture.componentRef.setInput('selectionList', undefined);

      component['initSelectionLists']();

      expect(component.selectionLists).toEqual([]);
    });

    it('should generate the selectionLists array from the selectionList input', () => {
      const buildParentMapSpy = vi.spyOn(component as any, 'buildParentMap');
      const buildSelectionMapSpy = vi.spyOn(component as any, 'buildSelectionMap');
      const generateSelectionListsSpy = vi.spyOn(component as any, 'generateSelectionLists');
      component['initSelectionLists']();

      expect(component.selectionLists).toEqual([
        {
          active: true,
          children: mockSelectionList.children,
          id: mockSelectionList.id,
          title: mockSelectionList.title
        }
      ]);
      expect(component.parentMap).toEqual(mockParentMap);
      expect(component.selectionMap).toEqual(mockSelectionMap);
      expect(buildParentMapSpy).toHaveBeenCalled();
      expect(buildSelectionMapSpy).toHaveBeenCalled();
      expect(generateSelectionListsSpy).toHaveBeenCalled();
    });
  });

  describe('handleSelectedChange', () => {
    it('should handle the selection change and emit the event', () => {
      const onSelectedChangeSpy = vi.spyOn(component.onSelectedChange, 'emit');
      component.selectedSet = new Set(['1', '1-1', '1-1-1']);
      component.selectionMap = mockSelectionMap;

      component.handleSelectedChange();

      expect(onSelectedChangeSpy).toHaveBeenCalledWith([
        {
          name: 'Selection List 1',
          value: '1',
          model: undefined
        },
        {
          name: 'Child Selection List 1-1',
          value: '1-1',
          model: undefined
        },
        {
          name: 'Child Selection List 1-1-1',
          value: '1-1-1',
          model: undefined
        }
      ]);
    });

    it('should emit the close event when multiple is set to false', () => {
      const onSelectedChangeSpy = vi.spyOn(component.onSelectedChange, 'emit');
      const onCloseSpy = vi.spyOn(component.onClose, 'emit');
      fixture.componentRef.setInput('multiple', false);
      component.selectedSet = new Set(['1']);
      component.selectionMap = mockSelectionMap;

      component.handleSelectedChange();

      expect(onSelectedChangeSpy).toHaveBeenCalledWith([
        {
          name: 'Selection List 1',
          value: '1',
          model: undefined
        }
      ]);
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });
});
