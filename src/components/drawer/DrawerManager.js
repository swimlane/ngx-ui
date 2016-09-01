import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DrawerManager {

  // string | TemplateRef<any>
  open(content, options = {}) {
    if(!this.container) {
      console.error('No container registered!');
      return;
    }

    console.log('here', this, arguments)
  }

  close() {

  }

  registerContainer(container) {
    this.container = container;
  }

}
