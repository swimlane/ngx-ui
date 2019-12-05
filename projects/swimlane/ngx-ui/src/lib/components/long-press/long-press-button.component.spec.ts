import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LongPressButtonComponent } from './long-press-button.component';

describe('LongPressButtonComponent', () => {
  let component: LongPressButtonComponent;
  let fixture: ComponentFixture<LongPressButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LongPressButtonComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongPressButtonComponent);
    component = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });
});
