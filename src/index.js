import { NgModule } from '@angular/core';

// components
import { DblClickCopy } from './directives/DblClickCopy.js';
import { Toolbar } from './components/toolbar/Toolbar.js';
import { DropdownMenu, DropdownToggle, Dropdown } from './components/dropdown/Dropdown.js';
import { CodeHighlight } from './components/codeHighlight/CodeHighlight.js';

import {
  Drawer,
  DrawerManager,
  DrawerContainer,
  DrawerOverlay
} from './components/drawer/DrawerModule.js';

import './styles/index.scss';

export const components = [
  DblClickCopy,
  Toolbar,
  CodeHighlight,

  Drawer,
  DrawerContainer,
  DrawerOverlay,

  Dropdown,
  DropdownMenu,
  DropdownToggle
];

export const providers = [
  DrawerManager
];

@NgModule({
  declarations: components,
  exports: components,
  providers: providers
})
export class CommonModule { }
