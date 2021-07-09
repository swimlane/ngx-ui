import type { AnimationTransitionMetadata } from '@angular/animations';
import { animate, style, transition } from '@angular/animations';

export function fadeInAnimation(ms = 250): AnimationTransitionMetadata[] {
  return [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate(
        ms,
        style({
          opacity: 1,
        })
      ),
    ]),
  ];
}
