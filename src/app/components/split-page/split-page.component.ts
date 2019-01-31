import { Component } from '@angular/core';

@Component({
  selector: 'app-split-page',
  templateUrl: './split-page.component.html'
})
export class SplitPageComponent {
  hideAlertArea = false;
  hideFixedSidebar = false;

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

}
