import { animate, keyframes, style, transition } from '@angular/animations';

export function bounceAnimation(ms = 300) {
  return [
    transition('void => *', animate(300)),
    transition(
      '* => *',
      animate(
        ms,
        keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-15px)', offset: 0.3 }),
          style({ transform: 'translateY(0)', offset: 1.0 }),
        ])
      )
    ),
  ];
}
