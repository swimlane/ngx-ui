import { animate, state, style, transition } from '@angular/animations';

export const DRAWER_ANIMATION = [
  state(
    'left',
    style({
      transform: 'translateX(0%)'
    })
  ),
  state(
    'bottom',
    style({
      transform: 'translateY(0%)'
    })
  ),

  transition('void => left', [style({ transform: 'translateX(100%)' }), animate('150ms ease-out')]),
  transition('left => void', [animate('150ms ease-out', style({ transform: 'translateX(100%)' }))]),
  transition('void => bottom', [style({ transform: 'translateY(100%)' }), animate('150ms ease-out')]),
  transition('bottom => void', [animate('150ms ease-out', style({ transform: 'translateY(100%)' }))])
];
