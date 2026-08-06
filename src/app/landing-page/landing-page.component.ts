import { Component, ChangeDetectionStrategy } from '@angular/core';
import pkg from '../../../projects/swimlane/ngx-ui/package.json';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class LandingPageComponent {
  deps: any;
  constructor() {
    this.deps = pkg.dependencies;
  }
}
