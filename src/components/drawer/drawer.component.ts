import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

import { DrawerService } from './drawer.service';
import './drawer.scss';

@Component({
  selector: 'swui-drawer',
  template: `
    <div class="swui-drawer-content {{cssClass}}">
      <template
        [ngTemplateOutlet]="template"
        [ngOutletContext]="drawerManager">
      </template>
    </div>
  `,
  host: {
    role: 'dialog',
    tabindex: '-1',
    class: 'swui-drawer'
  }
})
export class DrawerComponent {

  /**
   * CSS Class
   * 
   * @type {string}
   * @memberOf DrawerComponent
   */
  @Input() cssClass: string = '';

  /**
   * Direction of the drawer to open
   * 
   * @type {string}
   * @memberOf DrawerComponent
   */
  @Input() direction: string;

  /**
   * Template for the drawer contents
   * 
   * @type {*}
   * @memberOf DrawerComponent
   */
  @Input() template: any;

  /**
   * Size of the drawer. A percentage.
   * 
   * @memberOf DrawerComponent
   */
  @Input() 
  set size(val: number) {
    this._size = val;
    this.setDimensions(val);
  }

  /**
   * Gets the size of the drawer
   * 
   * @readonly
   * @type {number}
   * @memberOf DrawerComponent
   */
  get size(): number {
    return this._size;
  }

  /**
   * Zindex of the drawer
   * 
   * @type {number}
   * @memberOf DrawerComponent
   */
  @HostBinding('style.zIndex')
  @Input() zIndex: number;

  /**
   * Drawer close event
   * 
   * @memberOf DrawerComponent
   */
  @Output() close = new EventEmitter();

  /**
   * Tranform direction of the drawer
   * 
   * @type {string}
   * @memberOf DrawerComponent
   */
  @HostBinding('style.transform')
  transform: string;

  /**
   * Drawer width calculation
   * 
   * @type {string}
   * @memberOf DrawerComponent
   */
  @HostBinding('style.width')
  widthSize: string;

  /**
   * Drawer height calculation
   * 
   * @type {string}
   * @memberOf DrawerComponent
   */
   @HostBinding('style.height')
   heightSize: string;

  /**
   * Is the drawer a left opening drawer
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DrawerComponent
   */
  @HostBinding('class.left-drawer')
  get isLeft(): boolean {
    return this.direction === 'left';
  }

  /**
   * Is the drawer a bottom of top drawer
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DrawerComponent
   */
  @HostBinding('class.bottom-drawer')
  get isBottom(): boolean {
    return this.direction === 'bottom';
  }

  private _size: number;

  constructor(private drawerManager: DrawerService) { }

  /**
   * Sets the dimensions
   * 
   * @param {number} size
   * 
   * @memberOf DrawerComponent
   */
  setDimensions(size: number): void {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    if(this.isLeft) {
      const innerWidth = size || winWidth;
      const widthPercent = (innerWidth / 100) * winWidth;
      const newWidth = Math.ceil(widthPercent);

      this.heightSize = '100%';
      this.widthSize = `${newWidth}px`;
      this.transform = `translateX(-${this.widthSize})`;

    } else if(this.isBottom) {
      const innerHeight = size || winHeight;
      const heightPercent = (innerHeight / 100) * winHeight;
      const newHeight = Math.ceil(heightPercent);

      this.widthSize = '100%';
      this.heightSize = `${newHeight}px`;
      this.transform = `translateY(-${this.heightSize})`;
    }
  }

  /**
   * Exit listener
   * 
   * @memberOf DrawerComponent
   */
  @HostListener('keyup.esc')
  onEscapeKey(): void {
    this.close.emit(true);
  }

}
