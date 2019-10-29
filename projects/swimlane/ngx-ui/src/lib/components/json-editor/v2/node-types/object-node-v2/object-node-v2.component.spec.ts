/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ObjectNodeV2Component } from './object-node-v2.component';

describe('ObjectNodeV2Component', () => {
  let component: ObjectNodeV2Component;
  let fixture: ComponentFixture<ObjectNodeV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectNodeV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectNodeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
