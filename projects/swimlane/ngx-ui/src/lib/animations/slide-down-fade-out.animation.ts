import { animate, style, transition } from '@angular/animations';

export function slideDownFadeOutAnimation(ms = 250) {
  return [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-10px)'
      }),
      animate(
        ms,
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        })
      )
    ]),
    transition(':leave', [
      animate(
        ms,
        style({
          opacity: 0
        })
      )
    ])
  ];
}
