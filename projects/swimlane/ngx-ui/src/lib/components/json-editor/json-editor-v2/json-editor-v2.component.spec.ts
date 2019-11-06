/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonEditorV2Component } from './json-editor-v2.component';

describe('JsonEditorV2Component', () => {
  let component: JsonEditorV2Component;
  let fixture: ComponentFixture<JsonEditorV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEditorV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
