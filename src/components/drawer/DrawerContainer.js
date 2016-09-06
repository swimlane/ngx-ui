import {
  Component,
  Input,
  trigger,
  transition,
  animate,
  style
} from '@angular/core';
import { DrawerManager } from './DrawerManager.js';

@Component({
  selector: 'drawer-container',
  template: `
    <div class="drawer-container">
      <div class="drawers">
        <drawer
          *ngFor="let drawer of drawerManager.drawers"
          [@exitTransition]="drawer.options.direction"
          [direction]="drawer.options.direction"
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
  `,
  animations: [
    trigger('exitTransition', [
      transition('left => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ]),
      transition('bottom => void', [
        animate(300, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class DrawerContainer {

  @Input() closeAllOnExit = false;
  @Input() zIndex = 990;
  @Input() size = 90;
  @Input() direction = 'left';

  drawerManager: DrawerManager;

  constructor(drawerManager: DrawerManager) {
    this.drawerManager = drawerManager;

    drawerManager.registerContainer({
      container: this,
      closeAllOnExit: this.closeAllOnExit,
      zIndex: this.zIndex,
      size: this.size,
      direction: this.direction
    });
  }

}
