import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const INPUT_ANIMATIONS = [
  trigger('labelState', [
    state(
      'inside',
      style({
        'font-size': '1em',
        top: '0',
      })
    ),
    state(
      'outside',
      style({
        'font-size': '.7rem',
        top: '-15px',
      })
    ),
    transition('inside => outside', animate('150ms ease-out')),
    transition('outside => inside', animate('150ms ease-out')),
  ]),
  trigger('underlineState', [
    state(
      'collapsed',
      style({
        width: '0%',
      })
    ),
    state(
      'expanded',
      style({
        width: '100%',
      })
    ),
    transition('collapsed => expanded', animate('150ms ease-out')),
    transition('expanded => collapsed', animate('150ms ease-out')),
  ]),
];
