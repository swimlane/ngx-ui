import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
import { SelectComponent } from './select.component';
describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  beforeEach(() => {
    const elementRefStub = { nativeElement: { contains: () => ({}) } };
    const rendererStub = { listen: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectComponent],
      providers: [{ provide: ElementRef, useValue: elementRefStub }, { provide: Renderer, useValue: rendererStub }]
    });
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('autofocus defaults to: false', () => {
    expect(component.autofocus).toEqual(false);
  });
  it('allowClear defaults to: true', () => {
    expect(component.allowClear).toEqual(true);
  });
  it('allowAdditions defaults to: false', () => {
    expect(component.allowAdditions).toEqual(false);
  });
  it('allowAdditionsText defaults to: Add Value', () => {
    expect(component.allowAdditionsText).toEqual('Add Value');
  });
  it('disableDropdown defaults to: false', () => {
    expect(component.disableDropdown).toEqual(false);
  });
  it('closeOnBodyClick defaults to: true', () => {
    expect(component.closeOnBodyClick).toEqual(true);
  });
  it('options defaults to: []', () => {
    expect(component.options).toEqual([]);
  });
  it('filterable defaults to: true', () => {
    expect(component.filterable).toEqual(true);
  });
  it('requiredIndicator defaults to: *', () => {
    expect(component.requiredIndicator).toEqual('*');
  });
  it('filterCaseSensitive defaults to: false', () => {
    expect(component.filterCaseSensitive).toEqual(false);
  });
  it('emptyPlaceholder defaults to: No options available', () => {
    expect(component.emptyPlaceholder).toEqual('No options available');
  });
  it('filterEmptyPlaceholder defaults to: No matches...', () => {
    expect(component.filterEmptyPlaceholder).toEqual('No matches...');
  });
  it('filterPlaceholder defaults to: Filter options...', () => {
    expect(component.filterPlaceholder).toEqual('Filter options...');
  });
  it('tagging defaults to: false', () => {
    expect(component.tagging).toEqual(false);
  });
  it('multiple defaults to: false', () => {
    expect(component.multiple).toEqual(false);
  });
  it('disabled defaults to: false', () => {
    expect(component.disabled).toEqual(false);
  });
  it('dropdownActive defaults to: false', () => {
    expect(component.dropdownActive).toEqual(false);
  });
  it('_value defaults to: []', () => {
    expect(component._value).toEqual([]);
  });
  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      spyOn(component, 'toggleDropdown');
      component.ngOnDestroy();
      expect(component.toggleDropdown).toHaveBeenCalled();
    });
  });
  describe('onFocus', () => {
    it('makes expected calls', () => {
      spyOn(component, 'toggleDropdown');
      component.onFocus();
      expect(component.toggleDropdown).toHaveBeenCalled();
    });
  });
  describe('onClose', () => {
    it('makes expected calls', () => {
      spyOn(component, 'toggleDropdown');
      component.onClose();
      expect(component.toggleDropdown).toHaveBeenCalled();
    });
  });
  describe('onToggle', () => {
    it('makes expected calls', () => {
      spyOn(component, 'toggleDropdown');
      component.onToggle();
      expect(component.toggleDropdown).toHaveBeenCalled();
    });
  });
});
