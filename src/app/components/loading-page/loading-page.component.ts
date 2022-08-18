import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoadingService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingPageComponent {
  constructor(public loadingService: LoadingService) {}

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
