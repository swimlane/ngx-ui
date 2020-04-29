import { animate, state, style, transition, trigger } from '@angular/animations';

import { NavbarAnimationStates } from './navbar-animation-states.enum';
import { NavbarBarAnimationStates } from './navbar-bar-animation-states.enum';

const BAR_THICKNESS = 2;

export const navbarAnimations = {
  horizontalStepTransition: trigger('stepHorizontalTransition', [
    state(NavbarAnimationStates.Left, style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' })),
    state(NavbarAnimationStates.Right, style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' })),
    state(NavbarAnimationStates.Current, style({ transform: 'none', visibility: 'visible' })),
    transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
  ]),

  horizontalBarTransition: trigger('navbarBarHorizontalTransition', [
    state(
      NavbarBarAnimationStates.Stay,
      style({
        transition: '500ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateX({{ width }}px)',
        height: `${BAR_THICKNESS}px`,
        width: '{{ barSize }}px'
      }),
      { params: { width: 0, barSize: 0 } }
    )
  ])
};
