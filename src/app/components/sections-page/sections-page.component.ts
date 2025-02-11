import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sections-page',
  templateUrl: './sections-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class SectionsPageComponent {
  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
