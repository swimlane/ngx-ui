import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sections-page',
  templateUrl: './sections-page.component.html',
  styleUrls: ['./sections-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionsPageComponent {
  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
