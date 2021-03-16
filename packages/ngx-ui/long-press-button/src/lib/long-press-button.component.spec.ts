import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongPressButtonComponent } from './long-press-button.component';

describe('LongPressButtonComponent', () => {
  let component: LongPressButtonComponent;
  let fixture: ComponentFixture<LongPressButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongPressButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongPressButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
