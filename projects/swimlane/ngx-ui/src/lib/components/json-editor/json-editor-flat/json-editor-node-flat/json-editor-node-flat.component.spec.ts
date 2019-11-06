/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonEditorNodeFlatComponent } from './json-editor-node-flat.component';

describe('JsonEditorNodeFlatComponent', () => {
  let component: JsonEditorNodeFlatComponent;
  let fixture: ComponentFixture<JsonEditorNodeFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonEditorNodeFlatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorNodeFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
