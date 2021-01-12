import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overlay-page',
  templateUrl: './overlay-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayPageComponent {}
