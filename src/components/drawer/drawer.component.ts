import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

import { DrawerManagerService } from './drawer-manager.service';

@Component({
  selector: 'swui-drawer',
  template: `
    <div class="drawer-inner">
      <swui-toolbar
        [title]="title">
      </swui-toolbar>
      <section class="drawer-content">
        <div
          templateWrapper
          [template]="template"
          [context]="drawerManager">
        </div>
      </section>
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
  @Input() direction = 'left';

  /**
   * Toolbar title
   * @type {String}
   */
  @Input() title = '';

  /**
   * Template for the drawer contents
   * @type {Object}
   */
  @Input() template;

  /**
   * Size of the drawer. A percentage.
   * @type {String}
   */
  @Input() size = '80%';

  /**
   * Zindex of the drawer
   * @type {Number}
   */
  @HostBinding('style.zIndex')
  @Input() zIndex = 995;

  /**
   * Drawer exit event
   * @type {EventEmitter}
   */
  @Output() onExit = new EventEmitter();

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
      const size = parseInt(this.size, 0);
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
      const size = parseInt(this.size, 0);
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

  constructor(private drawerManager: DrawerManagerService) {
  }

  /**
   * Escape keyboard event
   */
  @HostListener('keyup.esc')
  onEscapeKey() {
    this.onExit.emit(true);
  }

}
