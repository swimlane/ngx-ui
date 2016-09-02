import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DrawerManager {

  drawers = [];

  // string | TemplateRef<any>
  open(template, options = {}) {
    if(!this.container) {
      console.error('No container registered!');
      return;
    }

    this.drawers.push({
      template,
      options
    });
  }

  close(all) {
    const start = all ? 0 : this.drawers.length - 1;
    this.drawers.splice(start, this.drawers.length);
  }

  registerContainer(container) {
    this.container = container;
  }

}
