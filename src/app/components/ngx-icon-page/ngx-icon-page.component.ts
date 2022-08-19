import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconRegistryService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-ngx-icon-page',
  templateUrl: './ngx-icon-page.component.html',
  styleUrls: ['./ngx-icon-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxIconPageComponent {
  constructor(public iconRegistryService: IconRegistryService) {
    iconRegistryService.add('frown-upside-down', 'smiley-frown :icon-fx-flip-y');
    iconRegistryService.add('x-spinning', 'x :icon-fx-spinning');
    iconRegistryService.add('x-spinning-red', 'x-spinning :text-red');
    iconRegistryService.add('turbine', ['square-filled', 'x-spinning-red']);

    iconRegistryService.add('app:create', 'new-app');
    iconRegistryService.add('app:edit', 'edit-app');
    iconRegistryService.add('app:copy', 'copy-app');
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
