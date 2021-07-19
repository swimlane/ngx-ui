import bounceHtml from '!!raw-loader!./docs/bounce.html';
import fadeInHtml from '!!raw-loader!./docs/fade-in.html';
import fadeOutHtml from '!!raw-loader!./docs/fade-out.html';
import slideBottomHtml from '!!raw-loader!./docs/slide-bottom.html';
import slideDownFadeOutHtml from '!!raw-loader!./docs/slide-down-fade-out.html';
import slideLeftHtml from '!!raw-loader!./docs/slide-left.html';
import slideRightHtml from '!!raw-loader!./docs/slide-right.html';
import slideTopHtml from '!!raw-loader!./docs/slide-top.html';
import slideUpFadeOutHtml from '!!raw-loader!./docs/slide-up-fade-out.html';

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
  slideUpFadeOutAnimation,
} from '@swimlane/ngx-ui/animations';

@Component({
  selector: 'docs-animations',
  template: `
    <ngx-doc-page header="Animations">
      <ngx-doc-example heading="Bounce" id="bounce">
        <button class="btn" (click)="count = count + 1">
          Click Me {{ count }}
        </button>
        <div class="animated" [@bounce]="count">Bounce</div>

        <ngx-doc-markdown [code]="bounceHtml" lang="markup"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Fade In" id="fade-in">
        <button class="btn" (click)="visible.fadeIn = !visible.fadeIn">
          Toggle Fade In {{ visible.fadeIn }}
        </button>
        <div class="animated" *ngIf="visible.fadeIn" @fadeIn>Fade In</div>

        <ngx-doc-markdown [code]="fadeInHtml" lang="markup"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Fade Out" id="fade-out">
        <button class="btn" (click)="visible.fadeOut = !visible.fadeOut">
          Toggle Fade Out {{ visible.fadeOut }}
        </button>
        <div class="animated" *ngIf="visible.fadeOut" @fadeOut>Fade Out</div>

        <ngx-doc-markdown [code]="fadeOutHtml" lang="markup"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Slide Down Fade Out" id="slide-down-fade-out">
        <button
          class="btn"
          (click)="visible.slideDownFadeOut = !visible.slideDownFadeOut"
        >
          Toggle Slide Down Fade Out {{ visible.slideDownFadeOut }}
        </button>
        <div
          class="animated"
          *ngIf="visible.slideDownFadeOut"
          @slideDownFadeOut
        >
          Slide Down Fade Out
        </div>

        <ngx-doc-markdown
          [code]="slideDownFadeOutHtml"
          lang="markup"
        ></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Slide Up Fade Out" id="slide-up-fade-out">
        <button
          class="btn"
          (click)="visible.slideUpFadeOut = !visible.slideUpFadeOut"
        >
          Toggle Slide Up Fade Out {{ visible.slideUpFadeOut }}
        </button>
        <div class="animated" *ngIf="visible.slideUpFadeOut" @slideUpFadeOut>
          Slide Up Fade Out
        </div>

        <ngx-doc-markdown
          [code]="slideUpFadeOutHtml"
          lang="markup"
        ></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Slide Left" id="slide-left">
        <button class="btn" (click)="visible.slideLeft = !visible.slideLeft">
          Toggle Slide Left {{ visible.slideLeft }}
        </button>
        <div class="animated" *ngIf="visible.slideLeft" @slideLeft>
          Slide Left
        </div>

        <ngx-doc-markdown
          [code]="slideLeftHtml"
          lang="markup"
        ></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Slide Right" id="slide-right">
        <button class="btn" (click)="visible.slideRight = !visible.slideRight">
          Toggle Slide Right {{ visible.slideRight }}
        </button>
        <div class="animated" *ngIf="visible.slideRight" @slideRight>
          Slide Right
        </div>

        <ngx-doc-markdown
          [code]="slideRightHtml"
          lang="markup"
        ></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Slide Top" id="slide-top">
        <button class="btn" (click)="visible.slideTop = !visible.slideTop">
          Toggle Slide Top {{ visible.slideTop }}
        </button>
        <div class="animated" *ngIf="visible.slideTop" @slideTop>Slide Top</div>

        <ngx-doc-markdown
          [code]="slideTopHtml"
          lang="markup"
        ></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Slide Bottom" id="slide-right">
        <button
          class="btn"
          (click)="visible.slideBottom = !visible.slideBottom"
        >
          Toggle Slide Bottom {{ visible.slideBottom }}
        </button>
        <div class="animated" *ngIf="visible.slideBottom" @slideBottom>
          Slide Bottom
        </div>

        <ngx-doc-markdown
          [code]="slideBottomHtml"
          lang="markup"
        ></ngx-doc-markdown>
      </ngx-doc-example>
    </ngx-doc-page>
  `,
  styles: [
    // language=scss
    `
      .animated {
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 0.25rem;
        background: var(--ngx-ui-color-blue-600);
        color: var(--ngx-ui-color-white);
      }
    `,
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
    trigger('slideBottom', slideBottomAnimation(250)),
  ],
})
export class AnimationsComponent {
  readonly bounceHtml = bounceHtml;
  readonly fadeInHtml = fadeInHtml;
  readonly fadeOutHtml = fadeOutHtml;
  readonly slideBottomHtml = slideBottomHtml;
  readonly slideDownFadeOutHtml = slideDownFadeOutHtml;
  readonly slideLeftHtml = slideLeftHtml;
  readonly slideRightHtml = slideRightHtml;
  readonly slideTopHtml = slideTopHtml;
  readonly slideUpFadeOutHtml = slideUpFadeOutHtml;

  count = 0;
  visible = {
    fadeIn: true,
    fadeOut: true,
    slideDownFadeOut: true,
    slideUpFadeOut: true,
    slideLeft: true,
    slideRight: true,
    slideTop: true,
    slideBottom: true,
  };
}
