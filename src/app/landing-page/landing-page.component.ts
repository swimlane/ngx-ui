import { Component } from '@angular/core';
import { dependencies } from '../../../projects/swimlane/ngx-ui/package.json';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
  deps: any;
  constructor() {
    this.deps = dependencies;
  }
}
