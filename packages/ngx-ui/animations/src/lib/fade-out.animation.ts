import type { AnimationTransitionMetadata } from '@angular/animations';
import { animate, style, transition } from '@angular/animations';

export function fadeOutAnimation(ms = 250): AnimationTransitionMetadata[] {
  return [
    transition(':leave', [
      style({
        opacity: 1
      }),
      animate(
        ms,
        style({
          opacity: 0
        })
      )
    ])
  ];
}
