import { NgModule } from '@angular/core';

import { Drawer } from './Drawer.js';
import { DrawerManager } from './DrawerManager.js';
import { DrawerOverlay  } from './DrawerOverlay.js';
import { DrawerContainer } from './DrawerContainer.js';
import './drawer.scss';

export const components = [
  Drawer,
  DrawerContainer,
  DrawerOverlay
];

export const providers = [
  DrawerManager
];

export {
  Drawer,
  DrawerManager,
  DrawerContainer,
  DrawerOverlay
};

@NgModule({
  declarations: components,
  exports: components,
  providers: providers
})
export class DrawerModule { }
