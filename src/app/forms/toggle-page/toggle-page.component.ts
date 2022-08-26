import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toggle-page',
  templateUrl: './toggle-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TogglePageComponent {
  toggleChk = true;

  onToggleChange(event) {
    // eslint-disable-next-line no-console
    console.log('check?', event);
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
