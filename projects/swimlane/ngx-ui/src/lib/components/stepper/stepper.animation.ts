import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { StepperAnimationStates } from './stepper-animation-states.enum';
import { StepperBarAnimationStates } from './stepper-bar-animation-states.enum';

const BAR_SIZE = 28;
const BAR_THICKNESS = 2;

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
    transition(`* <=> ${ StepperAnimationStates.Current }`, animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]),

  horizontalBarTransition: trigger('stepperBarHorizontalTransition', [
    state(StepperBarAnimationStates.Stay,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateX({{ width }}px)',
        height: `${ BAR_THICKNESS }px`,
        width: `${ BAR_SIZE }px`,
        margin: '0'
      }),
      { params: { width: 0 } }
    ),
    state(StepperBarAnimationStates.Move,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateX({{ width }}px)',
        height: `${ BAR_THICKNESS }px`,
        width: `${ BAR_SIZE / 2 }px`,
        margin: `0 ${ BAR_SIZE / 4 }px`
      }),
      { params: { width: 0 } },
    ),
  ]),

  verticalBarTransition: trigger('stepperBarVerticalTransition', [
    state(StepperBarAnimationStates.Stay,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateY({{ height }}px)',
        width: `${ BAR_THICKNESS }px`,
        height: `${ BAR_SIZE }px`,
        margin: '0'
      }),
      { params: { height: 0 } }
    ),
    state(StepperBarAnimationStates.Move,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateY({{ height }}px)',
        width: `${ BAR_THICKNESS }px`,
        height: `${ BAR_SIZE / 2 }px`,
        margin: `${ BAR_SIZE / 4 }px 0`
      }),
      { params: { height: 0 } },
    ),
  ])
};
