/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonEditorFlatComponent } from './json-editor-flat.component';

describe('JsonEditorFlatComponent', () => {
  let component: JsonEditorFlatComponent;
  let fixture: ComponentFixture<JsonEditorFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonEditorFlatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
