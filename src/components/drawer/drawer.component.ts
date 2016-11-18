import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

import { DrawerService } from './drawer.service';
// import './drawer.scss';

@Component({
  selector: 'swui-drawer',
  template: `
    <div class="drawer-content">
      <template
        [ngTemplateOutlet]="template"
        [ngOutletContext]="drawerManager">
      </template>
    </div>
  `,
  host: {
    role: 'dialog',
    tabindex: '-1',
    class: 'drawer'
  }
})
export class DrawerComponent {

  /**
   * Direction of the drawer to open
   * @type {String}
   */
  @Input() direction: string;

  /**
   * Template for the drawer contents
   * @type {Object}
   */
  @Input() template: any;

  /**
   * Size of the drawer. A percentage.
   * @type {String}
   */
  @Input() size: number ;

  /**
   * Zindex of the drawer
   * @type {Number}
   */
  @HostBinding('style.zIndex')
  @Input() zIndex: number;

  /**
   * Drawer close event
   * @type {EventEmitter}
   */
  @Output() close = new EventEmitter();

  /**
   * Tranform direction of the drawer
   * @return {String} translate
   */
  @HostBinding('style.transform')
  get transform() {
    if(this.isLeft) {
      let width = this.widthSize;
      return `translate(-${width},0)`;
    } else {
      let height = this.heightSize;
      return `translate(0, -${height})`;
    }
  }

  /**
   * Drawer width calculation
   * @return {String} percentage width
   */
  @HostBinding('style.width')
  get widthSize() {
    if(this.isLeft) {
      const { width } = this.bounds;
      const size = this.size;
      const innerWidth = size || width;
      const widthPercent = (innerWidth / 100) * width;
      const newWidth = Math.ceil(widthPercent);
      return `${newWidth}px`;
    }

    return '100%';
  }

  /**
   * Drawer height calculation
   * @return {String} percentage height
   */
   @HostBinding('style.height')
   get heightSize() {
    if(this.isBottom) {
      const { height } = this.bounds;
      const size = this.size;
      const innerHeight = size || height;
      const heightPercent = (innerHeight / 100) * height;
      const newHeight = Math.ceil(heightPercent);
      return `${newHeight}px`;
    }

    return '100%';
  }

  /**
   * Is the drawer a left opening drawer
   * @return {Boolean} direction
   */
  @HostBinding('class.left-drawer')
  get isLeft() {
    return this.direction === 'left';
  }

  /**
   * Is the drawer a bottom of top drawer
   * @return {Boolean} direction
   */
  @HostBinding('class.bottom-drawer')
  get isBottom() {
    return this.direction === 'bottom';
  }

  /**
   * Gets the page bounds and caches it
   * @return {Object} page bounds
   */
  get bounds() {
    // HACK: Force a calculate
    document.body.getBoundingClientRect();

    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  constructor(private drawerManager: DrawerService) { }

  /**
   * Escape keyboard event
   */
  @HostListener('keyup.esc')
  onEscapeKey() {
    this.close.emit(true);
  }

}
