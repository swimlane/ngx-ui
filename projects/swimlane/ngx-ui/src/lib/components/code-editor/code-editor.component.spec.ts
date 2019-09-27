import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';
describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CodeEditorComponent]
    });
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('theme defaults to: dracula', () => {
    expect(component.theme).toEqual('dracula');
  });
  it('readOnly defaults to: false', () => {
    expect(component.readOnly).toEqual(false);
  });
  it('autofocus defaults to: false', () => {
    expect(component.autofocus).toEqual(false);
  });
  it('allowDropFileTypes defaults to: []', () => {
    expect(component.allowDropFileTypes).toEqual([]);
  });
  it('gutters defaults to: []', () => {
    expect(component.gutters).toEqual([]);
  });
  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'cleanCode');
      component.ngAfterViewInit();
      expect(component.cleanCode).toHaveBeenCalled();
    });
  });
});
