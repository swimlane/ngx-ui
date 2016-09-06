import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DrawerManager {

  /**
   * Collection of drawers
   * @type {Array}
   */
  drawers = [];

  /**
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

  get backdropZIndex() {
    return this.zIndex - 1;
  }

  open(template, options = {}) {
    if(!this.container) {
      console.error('No container registered!');
      return;
    }

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

    this.drawers.push({
      template,
      options
    });
  }

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

  registerContainer(container) {
    Object.assign(this, container);
  }

}
