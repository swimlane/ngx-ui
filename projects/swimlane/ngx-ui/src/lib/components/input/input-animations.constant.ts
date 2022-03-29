import { trigger, state, style, transition, animate } from '@angular/animations';

export const INPUT_ANIMATIONS = [
  trigger('underlineState', [
    state(
      'collapsed',
      style({
        width: '0%'
      })
    ),
    state(
      'expanded',
      style({
        width: '100%'
      })
    ),
    transition('collapsed => expanded', animate('150ms ease-out')),
    transition('expanded => collapsed', animate('150ms ease-out'))
  ])
];
