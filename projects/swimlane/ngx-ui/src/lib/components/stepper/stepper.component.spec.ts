import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StepperModule } from './stepper.module';
import { StepperComponentFixture } from './stepper.component.fixture';
import { StepperPosition } from './stepper-position.enum';
import { StepperAnimationStates } from './stepper-animation-states.enum';

describe('StepperComponent', () => {
  let component: StepperComponentFixture;
  let fixture: ComponentFixture<StepperComponentFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperComponentFixture],
      imports: [StepperModule, BrowserAnimationsModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponentFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.stepper.onResize();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should update completeIcon and set steps', () => {
    component.stepper.completeIcon = 'ngx-icon test';
    expect(component.stepper.steps.first.completeIcon).toEqual(component.stepper.completeIcon);
  });

  it('should set active when step active changed', done => {
    const spy = spyOn(component.stepper.steps.first.activeChange, 'emit');
    const step: HTMLButtonElement = document.querySelector('ngx-step:first-child');
    step.click();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('next', () => {
    beforeEach(() => {
      component.stepper.active = 0;
    });

    it('should go to next step', () => {
      component.stepper.next();
      expect(component.stepper.active).toEqual(1);
    });

    it('should do nothing', () => {
      component.stepper.last();
      component.stepper.next();
      expect(component.stepper.active).toEqual(2);
    });
  });

  describe('previous', () => {
    beforeEach(() => {
      component.stepper.active = 0;
    });

    it('should go to previous step', () => {
      component.stepper.next();
      component.stepper.previous();
      expect(component.stepper.active).toEqual(0);
    });

    it('should do nothing', () => {
      component.stepper.previous();
      expect(component.stepper.active).toEqual(0);
    });
  });

  describe('last', () => {
    it('should go to last step', () => {
      component.stepper.last();
      expect(component.stepper.active).toEqual(2);
    });
  });

  describe('first', () => {
    it('should go to first step', () => {
      component.stepper.first();
      expect(component.stepper.active).toEqual(0);
    });
  });

  describe('getStepState', () => {
    beforeEach(() => {
      component.stepper.active = 1;
    });

    it('should be up', () => {
      component.stepper.position = StepperPosition.Left;
      expect(component.stepper.getStepState(0)).toEqual(StepperAnimationStates.Up);
    });

    it('should be left', () => {
      component.stepper.position = StepperPosition.Top;
      expect(component.stepper.getStepState(0)).toEqual(StepperAnimationStates.Left);
    });

    it('should be down', () => {
      component.stepper.position = StepperPosition.Left;
      expect(component.stepper.getStepState(2)).toEqual(StepperAnimationStates.Down);
    });

    it('should be right', () => {
      component.stepper.position = StepperPosition.Bottom;
      expect(component.stepper.getStepState(2)).toEqual(StepperAnimationStates.Right);
    });
  });
});
