import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';

import { StepperAnimationStates } from './stepper-animation-states.enum';

export const stepperAnimations: {
  readonly horizontalStepTransition: AnimationTriggerMetadata;
  readonly verticalStepTransition: AnimationTriggerMetadata;
} = {
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
  ])
};
