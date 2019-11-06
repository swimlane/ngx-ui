/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArrayNodeFlatComponent } from './array-node-flat.component';

describe('ArrayNodeFlatComponent', () => {
  let component: ArrayNodeFlatComponent;
  let fixture: ComponentFixture<ArrayNodeFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArrayNodeFlatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayNodeFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
