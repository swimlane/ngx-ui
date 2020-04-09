import { style, animate, transition } from '@angular/animations';

export function slideBottomAnimation(ms = 500) {
  return [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(100%)',
      }),
      animate(
        ms,
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
    ]),
    transition(':leave', [
      animate(
        ms,
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
    ]),
  ];
}
