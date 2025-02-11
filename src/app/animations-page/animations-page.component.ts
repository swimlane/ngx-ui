import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trigger } from '@angular/animations';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AnimationsPageComponent {
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

  increaseCount() {
    this.count++;
  }

  toggle(prop: string) {
    this.visible[prop] = !this.visible[prop];
  }
}
