import { Component } from '@angular/core';
import { DrawerManager } from './DrawerManager.js';

@Component({
  selector: 'drawer-container',
  template: `
    <div class="drawer-container">
      <div
        class="drawers"
        *ngFor="let drawer of drawerManager.drawers">
        <drawer
          [title]="drawer.options.title"
          [template]="drawer.template">
        </drawer>
      </div>
      <drawer-overlay
        (onClick)="drawerManager.close($event)"
        [class.active]="drawerManager.drawers.length">
      </drawer-overlay>
    </div>
  `
})
export class DrawerContainer {

  drawerManager: DrawerManager;

  constructor(drawerManager: DrawerManager) {
    this.drawerManager = drawerManager;
    drawerManager.registerContainer(this);
  }

}
