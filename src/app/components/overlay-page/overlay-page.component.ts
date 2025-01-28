import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overlay-page',
  templateUrl: './overlay-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class OverlayPageComponent {
  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
