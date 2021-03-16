import { state, style, trigger } from '@angular/animations';
import { NavbarAnimationStates } from './enums';

const BAR_THICKNESS = 2;

export const navbarAnimations = {
  horizontalBarTransition: trigger('navbarBarHorizontalTransition', [
    state(
      NavbarAnimationStates.Animated,
      style({
        transition: '300ms cubic-bezier(0.35, 0, 0.25, 1)',
        transform: 'translateX({{ width }}px)',
        height: `${BAR_THICKNESS}px`,
        width: '{{ barSize }}px',
      }),
      { params: { width: 0, barSize: 0 } }
    ),
  ]),
};
