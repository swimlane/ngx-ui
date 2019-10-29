/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonEditorV2NodeComponent } from './json-editor-v2-node.component';

describe('JsonEditorV2NodeComponent', () => {
  let component: JsonEditorV2NodeComponent;
  let fixture: ComponentFixture<JsonEditorV2NodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEditorV2NodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorV2NodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
