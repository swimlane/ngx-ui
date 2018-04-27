import { transition, animate, style, state, keyframes } from '@angular/animations';
export var bounce = [
    transition('void => *', animate(300)),
    transition('* => *', animate(300, keyframes([
        style({ transform: 'translateY(0)', offset: 0 }),
        style({ transform: 'translateY(-15px)', offset: 0.3 }),
        style({ transform: 'translateY(0)', offset: 1.0 })
    ])))
];
export var drawerTransition = [
    state('left', style({
        transform: 'translateX(0%)'
    })),
    state('bottom', style({
        transform: 'translateY(0%)'
    })),
    transition('void => left', [
        style({ transform: 'translateX(100%)' }),
        animate('150ms ease-out')
    ]),
    transition('left => void', [
        animate('150ms ease-out', style({ transform: 'translateX(100%)' }))
    ]),
    transition('void => bottom', [
        style({ transform: 'translateY(100%)' }),
        animate('150ms ease-out')
    ]),
    transition('bottom => void', [
        animate('150ms ease-out', style({ transform: 'translateY(100%)' }))
    ])
];
export var nagDrawerTransition = [
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
export var fadeIn = [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(250, style({
            opacity: 1
        }))
    ])
];
export var slideDown = [
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
//# sourceMappingURL=index.js.map