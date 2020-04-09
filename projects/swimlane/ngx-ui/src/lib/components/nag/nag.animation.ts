import { animate, state, style, transition } from '@angular/animations';

export const NAG_DRAWER_ANIMATION = [
  state(
    'void',
    style({
      transform: 'translateY(0)',
    })
  ),
  state(
    'closed',
    style({
      transform: 'translateY(-50px)',
    })
  ),
  state(
    'peek',
    style({
      transform: 'translateY(-70px)',
    })
  ),
  state(
    'open',
    style({
      transform: 'translateY(-100%)',
    })
  ),
  transition('* => *', animate('300ms ease-out')),
];
