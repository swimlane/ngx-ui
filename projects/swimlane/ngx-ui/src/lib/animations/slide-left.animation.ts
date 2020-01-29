import { style, query, group, animate, animateChild } from '@angular/animations';

export const SLIDE_LEFT_ANIMATION = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }),
  ]),
  query(':enter', [
    style({ left: '100%'}),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '-100%'})),
    ]),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%'})),
    ]),
  ]),
  query(':enter', animateChild()),
];
