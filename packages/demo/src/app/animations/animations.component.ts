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
  ]
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

  bounceMd = `
    \`\`\`html
    <div [@bounce]='count'>
      Bounce
    </div>
    \`\`\`
  `;

  fadeInMd = `
    \`\`\`html
    <div *ngIf='fadeInFlag' @fadeIn>
      Fade In
    </div>
    \`\`\`
  `;

  fadeOutMd = `
    \`\`\`html
    <div *ngIf='fadeOutFlag' @fadeOut>
      Fade Out
    </div>
    \`\`\`
  `;

  slideDownFadeOutMd = `
    \`\`\`html
    <div *ngIf='slideDownFadeOutFlag' @slideDownFadeOut>
      Slide Down Fade Out
    </div>
    \`\`\`
  `;

  slideUpFadeOutMd = `
    \`\`\`html
    <div *ngIf='slideUpFadeOutFlag' @slideUpFadeOut>
      Slide Up Fade Out
    </div>
    \`\`\`
  `;

  slideLeftMd = `
    \`\`\`html
    <div *ngIf='slideLeftFlag' @slideLeft>
      Slide Left
    </div>
    \`\`\`
  `;

  slideRightMd = `
    \`\`\`html
    <div *ngIf='slideRightFlag' @slideRight>
      Slide Right
    </div>
    \`\`\`
  `;

  slideTopMd = `
    \`\`\`html
    <div *ngIf='slideTopFlag' @slideTop>
      Slide Top
    </div>
    \`\`\`
  `;

  slideBottomMd = `
    \`\`\`html
    <div *ngIf='slideBottomFlag' @slideBottom>
      Slide Bottom
    </div>
    \`\`\`
  `;
}
