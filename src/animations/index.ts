import {
  trigger, transition, animate, style, state, keyframes
} from '@angular/animations';
import { AnimationMetadata } from '@angular/core';

export const bounce: any = [
  transition('void => *', animate(300)),
  transition('* => *', animate(300, keyframes([
    style({transform: 'translateY(0)', offset: 0}),
    style({transform: 'translateY(-15px)',  offset: 0.3}),
    style({transform: 'translateY(0)',     offset: 1.0})
  ])))
];

export const drawerTransition: any = [
  state('left', style({
    transform: 'translateX(0%)'
  })),
  state('bottom', style({
    transform: 'translateY(0%)'
  })),

  transition('void => left', [
    style({ transform: 'translateX(100%)'}),
    animate('150ms ease-out')
  ]),
  transition('left => void', [
    animate('150ms ease-out', style({ transform: 'translateX(100%)' }))
  ]),
  transition('void => bottom', [
    style({ transform: 'translateY(100%)'}),
    animate('150ms ease-out')
  ]),
  transition('bottom => void', [
    animate('150ms ease-out', style({ transform: 'translateY(100%)' }))
  ])
];

export const nagDrawerTransition: any =  [
  state('void', style({
    transform: 'translateY(0)'
  })),
  state('closed', style({
    transform: 'translateY(-50px)'
  })),
  state('peek', style({
    transform: 'translateY(-70px)'
  })),
  state('open', style({
    transform: 'translateY(-100%)'
  })),
  transition('* => *', animate('300ms ease-out')),
];

export const fadeIn: any = [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(250, style({
      opacity: 1
    }))
  ])
];

export const slideDown: any = [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-10px)'
    }),
    animate(250, style({
      opacity: 1,
      transform: 'translateY(0px)'
    }))
  ]),
  transition(':leave', [
    animate(250, style({
      opacity: 0
    }))
  ])
];
