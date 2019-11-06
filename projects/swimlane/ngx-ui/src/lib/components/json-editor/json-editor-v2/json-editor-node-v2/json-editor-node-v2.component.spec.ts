/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonEditorNodeV2Component } from './json-editor-node-v2.component';

describe('JsonEditorNodeV2Component', () => {
  let component: JsonEditorNodeV2Component;
  let fixture: ComponentFixture<JsonEditorNodeV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonEditorNodeV2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorNodeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
