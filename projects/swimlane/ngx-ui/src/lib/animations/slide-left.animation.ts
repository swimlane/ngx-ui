import { style, animate, transition } from '@angular/animations';

export function slideLeftAnimation(ms = 500) {
  return [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate(
        ms,
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      )
    ]),
    transition(':leave', [
      animate(
        ms,
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        })
      )
    ])
  ];
}
