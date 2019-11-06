/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ObjectNodeFlatComponent } from './object-node-flat.component';

describe('ObjectNodeFlatComponent', () => {
  let component: ObjectNodeFlatComponent;
  let fixture: ComponentFixture<ObjectNodeFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectNodeFlatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectNodeFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
