import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { jsonSchemaDataTypes, dataTypeMap } from '../../../../json-editor.helper';
import { ObjectNodeComponent } from './object-node.component';
import { PipesModule } from '../../../../../../pipes/pipes.module';

describe('ObjectNodeComponent', () => {
  let component: ObjectNodeComponent;
  let fixture: ComponentFixture<ObjectNodeComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ObjectNodeComponent],
      imports: [PipesModule]
    });
    fixture = TestBed.createComponent(ObjectNodeComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('required defaults to: false', () => {
    expect(component.required).toEqual(false);
  });
  it('dataTypes defaults to: jsonSchemaDataTypes', () => {
    expect(component.dataTypes).toEqual(jsonSchemaDataTypes);
  });
  it('propertyCounter defaults to: 1', () => {
    expect(component.propertyCounter).toEqual(1);
  });
  it('propertyId defaults to: 1', () => {
    expect(component.propertyId).toEqual(1);
  });
  it('dataTypeMap defaults to: dataTypeMap', () => {
    expect(component.dataTypeMap).toEqual(dataTypeMap);
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      spyOn(component, 'update');
      component.ngOnChanges({ model: {}, schema: {} } as any);
      expect(component.update).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'update');
      component.ngOnInit();
      expect(component.update).toHaveBeenCalled();
    });
  });
});
