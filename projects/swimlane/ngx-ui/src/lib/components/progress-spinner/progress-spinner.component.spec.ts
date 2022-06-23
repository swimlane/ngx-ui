import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressSpinnerComponent } from './progress-spinner.component';
import { ProgressSpinnerMode } from './progress-spinner-mode.enum';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressSpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;

    component.value = 30;
    component.total = 100;
    component.diameter = 100;
    component.strokeWidth = 5;
    component.mode = ProgressSpinnerMode.Determinate;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('percentage', () => {
    it('should be determinate value', () => {
      expect(component.percentage).toEqual(30);
    });

    it('should be indeterminate value', () => {
      component.mode = ProgressSpinnerMode.Indeterminate;
      expect(component.percentage).toEqual(50);
    });
  });
});
