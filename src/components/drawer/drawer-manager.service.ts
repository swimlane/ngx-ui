import { Injectable } from '@angular/core';
import { InjectionService } from '../../utils/injection.service';

@Injectable()
export class DrawerManagerService {

  /**
   * Collection of drawers
   * @type {Array}
   */
  drawers: any[] = [];

  /**
   * Close all stacks when escape or backdrop is clicked
   * @type {boolean}
   */
  closeAllOnExit: boolean = false;

  /**
   * Default zindex that stacks will start with.
   * @type {number}
   */
  zIndex: number = 995;

  /**
   * Default size the stacks will start with
   * @type {number}
   */
  size: number = 80;

  /**
   * Default direction for drawers
   * @type {string}
   */
  direction: string = 'left';

  /**
   * Gets the z-index for the backdrop which
   * is equal to the current - 1;
   * @return {number} index
   */
  get backdropZIndex(): number {
    return this.zIndex - 1;
  }

  /**
   * Parent container element
   * @type {any}
   */
  container: any;

  /**
   * Drawer manager service
   * @param  {InjectionService} privateinjectionService
   */
  constructor(private injectionService: InjectionService) { }

  /**
   * Opens a new drawer.
   */
  open(template, options) {
    if(!this.container) {
      /* tslint:disable */
      // this is a hack because of circular depedency resolution
      const { DrawerContainerComponent } = require('./drawer-container.component');
      /* tslint:enable */

      this.container = this.injectionService.appendNextToRoot(
        DrawerContainerComponent);
    }

    this.transposeDefaults(options);
    this.drawers.push({ template, options });
  }

  /**
   * Close drawer(s)
   */
  close() {
    const length = this.drawers.length;

    if(this.closeAllOnExit) {
      this.zIndex = 990;
      this.size = 90;
      this.drawers.splice(0, length);
    } else {
      this.zIndex = this.zIndex - 1;
      this.size = this.size + 10;
      this.drawers.splice(length - 1, length);
    }
  }

  /**
   * Register the container for manipulation
   * by the manager
   */
  registerContainer(container) {
    Object.assign(this, container);
  }

  /**
   * Transpose the default options
   * and update the calculations based
   * on active drawers.
   */
  transposeDefaults(options) {
    if(!options.zIndex) {
      this.zIndex = this.zIndex + 1;
      options.zIndex = this.zIndex;
    }

    if(!options.size) {
      this.size = this.size - 10;
      options.size = this.size;
    }

    if(!options.direction) {
      options.direction = this.direction;
    }
  }

}
