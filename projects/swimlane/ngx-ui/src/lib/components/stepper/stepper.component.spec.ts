import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperModule } from './stepper.module';
import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperComponent],
      imports: [StepperModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;

    component.active = 5;
    component.clickable = false;

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component.steps).toEqual(10);
    expect(component.active).toEqual(5);
    expect(component.clickable).toEqual(false);
    expect(component).toBeDefined();
  });

  it('should not set invalid active index', () => {
    component.active = -5;
    expect(component.active).toEqual(5);
  });

  describe('previous', () => {
    it('should go to previous step', () => {
      component.previous();
      expect(component.active).toEqual(4);
    });

    it('should do nothing', () => {
      component.active = 0;
      component.previous();
      expect(component.active).toEqual(0);
    });
  });

  describe('next', () => {
    it('should go to next step', () => {
      component.next();
      expect(component.active).toEqual(6);
    });

    it('should do nothing', () => {
      component.active = 9;
      component.next();
      expect(component.active).toEqual(9);
    });
  });

  describe('first', () => {
    it('should go to first step', () => {
      component.first();
      expect(component.active).toEqual(0);
    });
  });

  describe('last', () => {
    it('should go to last step', () => {
      component.last();
      expect(component.active).toEqual(9);
    });
  });
});
