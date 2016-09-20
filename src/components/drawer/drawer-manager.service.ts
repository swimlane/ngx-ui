import { Injectable } from '@angular/core';

@Injectable()
export class DrawerManagerService {

  /**
   * Collection of drawers
   * @type {Array}
   */
  drawers = [];

  /**much bet
   * Close all stacks when escape or backdrop is clicked
   * Default set by container.
   * @type {boolean}
   */
  closeAllOnExit: boolean;

  /**
   * Default zindex that stacks will start with.
   * Default set by container.
   * @type {number}
   */
  zIndex: number;

  /**
   * Default size the stacks will start with
   * Default set by container.
   * @type {number}
   */
  size: number;

  /**
   * Default direction for drawers
   * @type {string}
   */
  direction: string;

  /**
   * Gets the z-index for the backdrop which
   * is equal to the current - 1;
   * @return {number} index
   */
  get backdropZIndex() {
    return this.zIndex - 1;
  }

  container: any;

  /**
   * Opens a new drawer.
   */
  open(template, options) {
    if(!this.container) {
      console.error('No container registered!');
      return;
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
