import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconRegisteryService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-ngx-icon-page',
  templateUrl: './ngx-icon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxIconPageComponent {
  constructor(public iconRegisteryService: IconRegisteryService) {
    iconRegisteryService.add('frown-upside-down', 'smiley-frown :icon-fx-flip-y');
    iconRegisteryService.add('x-spinning', 'x :icon-fx-spinning');
    iconRegisteryService.add('x-spinning-red', 'x-spinning :text-red');
    iconRegisteryService.add('turbine', ['square-filled', 'x-spinning-red']);

    iconRegisteryService.add('app:create', 'new-app');
    iconRegisteryService.add('app:edit', 'edit-app');
    iconRegisteryService.add('app:copy', 'copy-app');
  }
}
