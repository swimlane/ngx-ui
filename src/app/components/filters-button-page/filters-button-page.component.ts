import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-filters-button-page',
  templateUrl: './filters-button-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class FiltersButtonPageComponent {
  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
