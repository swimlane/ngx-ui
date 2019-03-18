import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { SelectDropdownComponent } from './select-dropdown.component';

describe('SelectDropdownComponent', () => {
  let component: SelectDropdownComponent;
  let fixture: ComponentFixture<SelectDropdownComponent>;
  beforeEach(() => {
    const elementRefStub = { nativeElement: {} };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectDropdownComponent],
      providers: [{ provide: ElementRef, useValue: elementRefStub }]
    });
    fixture = TestBed.createComponent(SelectDropdownComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('allowAdditionsText defaults to: Add Value', () => {
    expect(component.allowAdditionsText).toEqual('Add Value');
  });
  it('filterCaseSensitive defaults to: false', () => {
    expect(component.filterCaseSensitive).toEqual(false);
  });
});
