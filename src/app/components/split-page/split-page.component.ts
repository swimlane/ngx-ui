import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-split-page',
  templateUrl: './split-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPageComponent {
  hideAlertArea = false;
  hideFixedSidebar = false;

  direction: string = 'row';

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
}
