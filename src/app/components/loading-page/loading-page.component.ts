import { Component } from '@angular/core';
import { LoadingService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html'
})
export class LoadingPageComponent {
  constructor(public loadingService: LoadingService) {}
}
