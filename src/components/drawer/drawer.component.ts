import {
  Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewEncapsulation, OnDestroy
} from '@angular/core';
import { trigger } from '@angular/animations';
import { DrawerService } from './drawer.service';
import { drawerTransition } from '../../animations';

@Component({
  selector: 'ngx-drawer',
  template: `
    <div class="ngx-drawer-content">
      <ng-template
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ manager: drawerManager, context: context }">
      </ng-template>
    </div>
  `,
  host: {
    role: 'dialog',
    tabindex: '-1'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./drawer.component.scss'],
  animations: [
    trigger('drawerTransition', drawerTransition)
  ]
})
export class DrawerComponent implements OnDestroy {

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
  @HostBinding('@drawerTransition')
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
   * Context to passed to the drawer instance
   *
   * @memberOf DrawerComponent
   */
  @Input() context: any;

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
  widthSize: any;

  /**
   * Drawer height calculation
   *
   * @type {string}
   * @memberOf DrawerComponent
   */
  @HostBinding('style.height')
  heightSize: any;

  /**
   * Is the drawer a left opening drawer
   *
   * @readonly
   * @type {boolean}
   * @memberOf DrawerComponent
   */
  get isLeft(): boolean {
    return this.direction === 'left';
  }

  /**
   * Gets the css classes for host
   *
   * @readonly
   * @type {string}
   * @memberOf DrawerComponent
   */
  @HostBinding('class')
  get cssClasses(): string {
    let clz = 'ngx-drawer';
    clz += ` ${this.cssClass}`;
    if(this.isLeft) clz += ' left-drawer';
    if(this.isBottom) clz += ' bottom-drawer';
    return clz;
  }

  /**
   * Is the drawer a bottom of top drawer
   *
   * @readonly
   * @type {boolean}
   * @memberOf DrawerComponent
   */
  // @HostBinding('class.bottom-drawer')
  get isBottom(): boolean {
    return this.direction === 'bottom';
  }

  private _size: number;

  constructor(public drawerManager: DrawerService) { }

  /**
   * Sets the dimensions
   *
   * @param {number} size
   *
   * @memberOf DrawerComponent
   */
  setDimensions(size: number): void {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    let height;
    let width;
    let transform;

    if(this.isLeft) {
      if(size) {
        const innerWidth = size || winWidth;
        const widthPercent = (innerWidth / 100) * winWidth;
        const newWidth = Math.ceil(widthPercent);

        height = '100%';
        width = `${newWidth}px`;
        transform = `translate(-${width}, 0px)`;
      } else {
        transform = 'translate(100%, 0)';
      }
    } else if(this.isBottom) {
      if(size) {
        const innerHeight = size || winHeight;
        const heightPercent = (innerHeight / 100) * winHeight;
        const newHeight = Math.ceil(heightPercent);

        width = '100%';
        height = `${newHeight}px`;
        transform = `translate(0px, -${height})`;
      } else {
        transform = 'translate(0, 100%)';
      }
    }

    setTimeout(() => {
      this.heightSize = height;
      this.widthSize = width;
      this.transform = transform;
    }, 10);
  }

  /**
   * On destroy callback
   *
   * @memberOf DrawerComponent
   */
  ngOnDestroy() {
    this.close.emit(true);
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
