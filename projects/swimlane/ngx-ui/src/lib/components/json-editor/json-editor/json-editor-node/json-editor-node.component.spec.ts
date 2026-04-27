import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogService } from '../../../dialog/dialog.service';
import { JsonEditorNodeComponent } from './json-editor-node.component';

describe('JsonEditorNodeComponent', () => {
  let component: JsonEditorNodeComponent;
  let fixture: ComponentFixture<JsonEditorNodeComponent>;
  beforeEach(() => {
    const dialogServiceStub = { create: () => ({}), destroy: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [JsonEditorNodeComponent],
      providers: [{ provide: DialogService, useValue: dialogServiceStub }]
    });
    fixture = TestBed.createComponent(JsonEditorNodeComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('required defaults to: false', () => {
    expect(component.required).toEqual(false);
  });
  it('inline defaults to: false', () => {
    expect(component.inline).toEqual(false);
  });
  it('expanded defaults to: true', () => {
    expect(component.expanded).toEqual(true);
  });
  it('valid defaults to: true', () => {
    expect(component.valid).toEqual(true);
  });
  it('childrenValid defaults to: true', () => {
    expect(component.childrenValid).toEqual(true);
  });
  it('editorVisible defaults to: true', () => {
    expect(component.editorVisible).toEqual(true);
  });
  it('editorModes defaults to: [...]', () => {
    expect(component.editorModes.length).toEqual(5);
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      vi.spyOn(component, 'processErrors');
      component.ngOnChanges({ errors: {} } as any);
      expect(component.processErrors).toHaveBeenCalled();
    });
  });
  describe('openCodeEditor', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: any = fixture.debugElement.injector.get(DialogService);
      vi.spyOn(dialogServiceStub, 'create');
      component.openCodeEditor();
      expect(dialogServiceStub.create).toHaveBeenCalled();
    });
  });
  describe('closeCodeEditor', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: any = fixture.debugElement.injector.get(DialogService);
      vi.spyOn(dialogServiceStub, 'destroy');
      component.closeCodeEditor();
      expect(dialogServiceStub.destroy).toHaveBeenCalled();
    });
  });
});
