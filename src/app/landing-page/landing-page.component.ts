import { Component } from '@angular/core';
import pkg from '../../../projects/swimlane/ngx-ui/package.json';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  standalone: false
})
export class LandingPageComponent {
  deps: any;
  constructor() {
    this.deps = pkg.dependencies;
  }
}
