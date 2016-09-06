import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  HostBinding,
  HostListener
} from '@angular/core';
import { DrawerManager } from './DrawerManager.js';

@Component({
  selector: 'drawer',
  template: `
    <div class="drawer-inner">
      <toolbar
        [title]="title">
      </toolbar>
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
export class Drawer {

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
  @Input() template: TemplateRef;

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
      const size = parseInt(this.size);
      const innerWidth = size || width;
      const newWidth = Math.ceil(((innerWidth / 100) * width));
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
      const size = parseInt(this.size);
      const innerHeight = size || height;
      const newHeight = Math.ceil(((innerHeight / 100) * height));
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
      height: parseInt(window.innerHeight),
      width: parseInt(window.innerWidth)
    };
  }

  constructor(drawerManager: DrawerManager) {
    this.drawerManager = drawerManager;
  }

  /**
   * Escape keyboard event
   */
  @HostListener('keyup.esc')
  onEscapeKey() {
    this.onExit.emit(true);
  }

}
