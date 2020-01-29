import { animate, style, transition } from '@angular/animations';

export const SLIDE_DOWN_ANIMATION = [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-10px)'
    }),
    animate(
      250,
      style({
        opacity: 1,
        transform: 'translateY(0px)'
      })
    )
  ]),
  transition(':leave', [
    animate(
      250,
      style({
        opacity: 0
      })
    )
  ])
];
