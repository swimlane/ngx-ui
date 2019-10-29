/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArrayNodeV2Component } from './array-node-v2.component';

describe('ArrayNodeV2Component', () => {
  let component: ArrayNodeV2Component;
  let fixture: ComponentFixture<ArrayNodeV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayNodeV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayNodeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
