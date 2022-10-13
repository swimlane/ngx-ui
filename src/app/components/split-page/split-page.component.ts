import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-split-page',
  templateUrl: './split-page.component.html',
  styleUrls: ['./split-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitPageComponent {
  hideAlertArea = false;
  hideFixedSidebar = false;

  direction = 'row';

  constructor() {
    this.getPanelState();
  }

  panelStateChanged() {
    localStorage.setItem('hideAlertArea', this.hideAlertArea.toString());
    localStorage.setItem('hideFixedSidebar', this.hideFixedSidebar.toString());
  }

  getPanelState() {
    this.hideAlertArea = localStorage.getItem('hideAlertArea') === 'true';
    this.hideFixedSidebar = localStorage.getItem('hideFixedSidebar') === 'true';
  }

  toggleDirection() {
    if (this.direction === 'row') {
      this.direction = 'column';
    } else {
      this.direction = 'row';
    }
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
