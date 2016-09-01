import { Component } from '@angular/core';
import { DrawerManager } from './DrawerManager.js';

@Component({
  selector: 'drawer-container',
  template: `
    <div>
    </div>
  `
})
export class DrawerContainer {

  constructor(mngr: DrawerManager) {
    mngr.registerContainer(this);
  }

}
