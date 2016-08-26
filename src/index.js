import { NgModule } from '@angular/core';

import { DblClickCopy } from './directives/DblClickCopy.js';
import { Toolbar } from './components/toolbar/Toolbar.js';
import { Drawer, DrawerContainer, DrawerOverlay } from './components/drawer/Drawer.js';
import { DropdownMenu, DropdownToggle, Dropdown } from './components/dropdown/Dropdown.js';

import './styles/index.scss';

export const components = [
  DblClickCopy,
  Toolbar,

  DrawerContainer,
  DrawerOverlay,

  Dropdown,
  DropdownMenu,
  DropdownToggle
];

export const providers = [
  Drawer
];

@NgModule({
  declarations: components,
  exports: [...components, ...Drawer],
  providers: [Drawer]
})
export class CommonModule { }
