import { Component } from '@angular/core';
import { trigger } from '@angular/animations';
import { BOUNCE_ANIMATION } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-animations-page',
  templateUrl: './animations-page.component.html',
  animations: [trigger('bounce', BOUNCE_ANIMATION)]
})
export class AnimationsPageComponent {
  count: number = 0;

  increaseCount() {
    this.count += 1;
  }
}
