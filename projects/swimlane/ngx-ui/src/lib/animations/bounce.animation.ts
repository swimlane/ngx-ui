import { animate, keyframes, style, transition } from '@angular/animations';

export const BOUNCE_ANIMATION = [
  transition('void => *', animate(300)),
  transition(
    '* => *',
    animate(
      300,
      keyframes([
        style({ transform: 'translateY(0)', offset: 0 }),
        style({ transform: 'translateY(-15px)', offset: 0.3 }),
        style({ transform: 'translateY(0)', offset: 1.0 })
      ])
    )
  )
];
