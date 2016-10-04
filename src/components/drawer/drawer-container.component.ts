import {
  Component, Input, trigger, transition,
  animate, style, state, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'swui-drawer-container',
  template: `
    <div class="drawer-container">
      <div class="drawers">
        <swui-drawer
          *ngFor="let drawer of drawers"
          [@drawerTransition]="drawer.options.direction"
          [direction]="drawer.options.direction"
          [zIndex]="drawer.options.zIndex"
          [size]="drawer.options.size"
          [template]="drawer.template"
          (onExit)="onClose.emit($event)">
        </swui-drawer>
      </div>
      <swui-overlay
        [visible]="drawers.length"
        [zIndex]="backdropZIndex"
        (onClick)="onClose.emit($event)">
      </swui-overlay>
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
    ])
  ]
})
export class DrawerContainerComponent {

  @Input() drawers: any;
  @Input() backdropZIndex: number;
  @Output() onClose = new EventEmitter();

  get overlayActive() {
    return this.drawers.length ? 'active' : 'inactive';
  }

}
