import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-page',
  templateUrl: './dropdown-page.component.html',
  styleUrls: ['./dropdown-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DropdownPageComponent {
  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
