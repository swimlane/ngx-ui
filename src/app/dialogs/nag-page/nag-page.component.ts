import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nag-page',
  templateUrl: './nag-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NagPageComponent {
  nags = [];

  addNag() {
    this.nags.push({
      type: 'Alert',
      id: Math.trunc(Math.random() * 10000)
    });
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
