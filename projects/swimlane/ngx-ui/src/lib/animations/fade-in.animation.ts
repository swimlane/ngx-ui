import { animate, style, transition } from '@angular/animations';

export const FADE_IN_ANIMATION = [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(
      250,
      style({
        opacity: 1
      })
    )
  ])
];
