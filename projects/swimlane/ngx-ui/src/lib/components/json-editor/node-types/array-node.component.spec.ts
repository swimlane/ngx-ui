import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { jsonSchemaDataTypes, dataTypeMap } from '../json-editor.helper';
import { ArrayNodeComponent } from './array-node.component';
describe('ArrayNodeComponent', () => {
  let component: ArrayNodeComponent;
  let fixture: ComponentFixture<ArrayNodeComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ArrayNodeComponent]
    });
    fixture = TestBed.createComponent(ArrayNodeComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('required defaults to: false', () => {
    expect(component.required).toEqual(false);
  });
  it('schemas defaults to: []', () => {
    expect(component.schemas).toEqual([]);
  });
  it('dataTypes defaults to: jsonSchemaDataTypes', () => {
    expect(component.dataTypes).toEqual(jsonSchemaDataTypes);
  });
  it('dataTypeMap defaults to: dataTypeMap', () => {
    expect(component.dataTypeMap).toEqual(dataTypeMap);
  });
  it('_array defaults to: Array', () => {
    expect(component._array).toEqual(Array);
  });
});
