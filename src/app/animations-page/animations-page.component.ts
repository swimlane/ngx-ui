import { Component } from '@angular/core';
import { trigger } from '@angular/animations';
import { bounce } from '../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-animations-page',
  templateUrl: './animations-page.component.html',
  animations: [trigger('bounce', bounce)]
})
export class AnimationsPageComponent {
  count: number = 0;

  increaseCount() {
    this.count += 1;
  }
}
