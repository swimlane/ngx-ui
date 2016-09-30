import {
  Component,
  Input,
  trigger,
  transition,
  animate,
  style,
  state
} from '@angular/core';

import { DrawerManagerService } from './drawer-manager.service';

@Component({
  selector: 'swui-drawer-container',
  template: `
    <div class="drawer-container">
      <div class="drawers">
        <swui-drawer
          *ngFor="let drawer of drawerManager.drawers"
          [@drawerTransition]="drawer.options.direction"
          [direction]="drawer.options.direction"
          [zIndex]="drawer.options.zIndex"
          [size]="drawer.options.size"
          [template]="drawer.template"
          (onExit)="drawerManager.close()">
        </swui-drawer>
      </div>
      <swui-drawer-overlay
        [@overlayTransition]="overlayActive"
        [zIndex]="drawerManager.backdropZIndex"
        (onClick)="drawerManager.close()">
      </swui-drawer-overlay>
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
      state('active', style({
        opacity: 0.8,
        visibility: 'visible'
      })),
      state('inactive', style({
        visibility: 'hidden',
        opacity: 0
      })),
      transition('* => active', [
        animate('100ms ease-in')
      ]),
      transition('* => inactive', [
        animate('100ms ease-out')
      ])
    ])
  ]
})
export class DrawerContainerComponent {

  /**
   * Get if the overlay should be active or not.
   * @return {Boolean} active
   */
  get overlayActive() {
    return this.drawerManager.drawers.length ? 'active' : 'inactive';
  }

  constructor(private drawerManager: DrawerManagerService) { }

}
