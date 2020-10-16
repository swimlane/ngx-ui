import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LoadingService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingPageComponent {
  constructor(public loadingService: LoadingService) {}
}
