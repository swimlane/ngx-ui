import { Component, Input } from '@angular/core';
import { DrawerManager } from './DrawerManager.js';

@Component({
  selector: 'drawer-container',
  template: `
    <div class="drawer-container">
      <div class="drawers">
        <drawer
          *ngFor="let drawer of drawerManager.drawers"
          [zIndex]="drawer.options.zIndex"
          [size]="drawer.options.size"
          [title]="drawer.options.title"
          [template]="drawer.template">
        </drawer>
      </div>
      <drawer-overlay
        [zIndex]="drawerManager.backdropZIndex"
        (onClick)="drawerManager.close()"
        [class.active]="drawerManager.drawers.length">
      </drawer-overlay>
    </div>
  `
})
export class DrawerContainer {

  @Input() closeAllOnExit = false;
  @Input() zIndex = 990;
  @Input() size = 90;

  drawerManager: DrawerManager;

  constructor(drawerManager: DrawerManager) {
    this.drawerManager = drawerManager;

    drawerManager.registerContainer({
      container: this,
      closeAllOnExit: this.closeAllOnExit,
      zIndex: this.zIndex,
      size: this.size
    });
  }

}
