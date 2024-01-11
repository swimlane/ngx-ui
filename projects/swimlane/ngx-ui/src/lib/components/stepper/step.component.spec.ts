import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepComponent } from './step.component';

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepComponent],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;

    component.step = 0;
    component.total = 1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(isNaN(component.height)).toBeFalsy();
    expect(isNaN(component.width)).toBeFalsy();
    expect(component.total).toEqual(1);
    expect(component.step).toEqual(0);
    expect(component).toBeTruthy();
  });
});
