import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SplitDirection } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-split-page',
  templateUrl: './split-page.component.html',
  styleUrls: ['./split-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitPageComponent {
  hideAlertArea = false;
  hideFixedSidebar = false;

  direction = SplitDirection.Row;

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
    if (this.direction === SplitDirection.Row) {
      this.direction = SplitDirection.Column;
    } else {
      this.direction = SplitDirection.Row;
    }
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
