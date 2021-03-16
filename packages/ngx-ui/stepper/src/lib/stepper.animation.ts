import { animate, state, style, transition, trigger } from '@angular/animations';
import { StepperAnimationStates, StepperBarAnimationStates } from './enums';

const BAR_THICKNESS = 2;
const BAR_STEP_RATIO = 1.4;

export const stepperAnimations = {
  horizontalStepTransition: trigger('stepHorizontalTransition', [
    state(StepperAnimationStates.Left, style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' })),
    state(StepperAnimationStates.Right, style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' })),
    state(StepperAnimationStates.Current, style({ transform: 'none', visibility: 'visible' })),
    transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
  ]),

  verticalStepTransition: trigger('stepVerticalTransition', [
    state(StepperAnimationStates.Up, style({ transform: 'translate3d(0, -100%, 0)', visibility: 'hidden' })),
    state(StepperAnimationStates.Down, style({ transform: 'translate3d(0, 100%, 0)', visibility: 'hidden' })),
    state(StepperAnimationStates.Current, style({ transform: 'none', visibility: 'visible' })),
    transition(`* <=> ${StepperAnimationStates.Current}`, animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]),

  horizontalBarTransition: trigger('stepperBarHorizontalTransition', [
    state(
      StepperBarAnimationStates.Stay,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateX({{ xOffset }}px)',
        height: `${BAR_THICKNESS}px`,
        width: `calc(${BAR_STEP_RATIO} * {{ width }}px)`
      }),
      { params: { xOffset: 0, width: 0 } }
    ),
    state(
      StepperBarAnimationStates.Move,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateX({{ xOffset }}px)',
        height: `${BAR_THICKNESS}px`,
        width: `calc({{ width }}px * ${BAR_STEP_RATIO} / 2)`,
        'margin-left': `calc(${BAR_STEP_RATIO} * {{ width }}px / 4)`
      }),
      { params: { xOffset: 0, width: 0 } }
    )
  ]),

  verticalBarTransition: trigger('stepperBarVerticalTransition', [
    state(
      StepperBarAnimationStates.Stay,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateY({{ yOffset }}px)',
        width: `${BAR_THICKNESS}px`,
        height: `calc(${BAR_STEP_RATIO} * {{ height }}px)`
      }),
      { params: { yOffset: 0, height: 0 } }
    ),
    state(
      StepperBarAnimationStates.Move,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateY({{ yOffset }}px)',
        width: `${BAR_THICKNESS}px`,
        height: `calc({{ height }}px * ${BAR_STEP_RATIO} / 2)`,
        'margin-top': `calc(${BAR_STEP_RATIO} * {{ height }}px / 4)`
      }),
      { params: { yOffset: 0, height: 0 } }
    )
  ])
};
