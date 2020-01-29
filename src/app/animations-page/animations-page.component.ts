import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger } from '@angular/animations';
import {
  bounceAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  slideLeftAnimation,
  slideRightAnimation,
  slideDownFadeOutAnimation,
  slideUpFadeOutAnimation,
  slideTopAnimation,
  slideBottomAnimation
} from '@swimlane/ngx-ui';

@Component({
  selector: 'app-animations-page',
  templateUrl: './animations-page.component.html',
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationsPageComponent {
  count: number = 0;
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

  increaseCount() {
    this.count++;
  }

  toggle(prop: string) {
    this.visible[prop] = !this.visible[prop];
  }
}
