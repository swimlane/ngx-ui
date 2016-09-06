import {
  Component,
  Input,
  trigger,
  transition,
  animate,
  style,
  state
} from '@angular/core';
import { DrawerManager } from './DrawerManager.js';

@Component({
  selector: 'drawer-container',
  template: `
    <div class="drawer-container">
      <div class="drawers">
        <drawer
          *ngFor="let drawer of drawerManager.drawers"
          [@drawerTransition]="drawer.options.direction"
          [direction]="drawer.options.direction"
          [zIndex]="drawer.options.zIndex"
          [size]="drawer.options.size"
          [title]="drawer.options.title"
          [template]="drawer.template"
          (onExit)="drawerManager.close()">
        </drawer>
      </div>
      <drawer-overlay
        [@overlayTransition]="overlayActive"
        [zIndex]="drawerManager.backdropZIndex"
        (onClick)="drawerManager.close()">
      </drawer-overlay>
    </div>
  `,
  animations: [
    trigger('drawerTransition', [
      transition('left => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ]),
      transition('bottom => void', [
        animate(300, style({ transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('overlayTransition', [
      /*
      transition('inactive => active', [
        style({ display: 'block' }),
        animate(300, style({ opacity: '.8' }))
      ]),
      transition('active => inactive', [
        style({ display: 'none' }),
        animate(300, style({ opacity: '0' }))
      ])
      */
      state('active', style({
        opacity: 0.8,
        visibility: 'visible'
      })),
      state('inactive', style({
        opacity: 0,
        display: 'none'
      })),
      transition('* => active', [
        style({ opacity: 0 }),
        animate('200ms ease-out')
      ]),
      transition('* => inactive', [
        style({ opacity: 0.8 }),
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class DrawerContainer {

  /**
   * Close all drawers when a exit event is triggered.
   * @type {Boolean}
   */
  @Input() closeAllOnExit = false;

  /**
   * Default z-index for drawers to calculate on
   * @type {Number}
   */
  @Input() zIndex = 990;

  /**
   * Default size for drawers to start with
   * @type {Number}
   */
  @Input() size = 90;

  /**
   * Default direction for drawers to start
   * @type {String}
   */
  @Input() direction = 'left';

  /**
   * Get if the overlay should be active or not.
   * @return {Boolean} active
   */
  get overlayActive() {
    return this.drawerManager.drawers.length ? 'active' : 'inactive';
  }

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
