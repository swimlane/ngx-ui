import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  bounceAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  slideBottomAnimation,
  slideDownFadeOutAnimation,
  slideLeftAnimation,
  slideRightAnimation,
  slideTopAnimation,
  slideUpFadeOutAnimation
} from '@swimlane/ngx-ui/animations';

@Component({
  selector: 'demo-animations',
  templateUrl: './animations.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('bounce', bounceAnimation()),
    trigger('fadeIn', fadeInAnimation()),
    trigger('fadeOut', fadeOutAnimation()),
    trigger('slideDownFadeOut', slideDownFadeOutAnimation()),
    trigger('slideUpFadeOut', slideUpFadeOutAnimation()),
    trigger('slideLeft', slideLeftAnimation()),
    trigger('slideRight', slideRightAnimation()),
    trigger('slideTop', slideTopAnimation(250)),
    trigger('slideBottom', slideBottomAnimation(250))
  ],
  preserveWhitespaces: true
})
export class AnimationsComponent {
  count = 0;
  visible = {
    fadeIn: true,
    fadeOut: true,
    slideDownFadeOut: true,
    slideUpFadeOut: true,
    slideLeft: true,
    slideRight: true,
    slideTop: true,
    slideBottom: true
  };
}
