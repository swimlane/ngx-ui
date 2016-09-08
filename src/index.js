import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// directives
import {
  TemplateWrapper,
  DblClickCopy
} from './directives/index.js';

import {
  PasswordStrength,

  DropdownMenu,
  DropdownToggle,
  Dropdown,

  CodeHighlight,

  Drawer,
  DrawerManager,
  DrawerContainer,
  DrawerOverlay,

  Toolbar,
  ToolbarTitle,
  ToolbarContent
} from './components/index.js';

// styles
import './styles/index.scss';

// all components
export const components = [
  DblClickCopy,
  TemplateWrapper,
  CodeHighlight,
  PasswordStrength,

  ToolbarTitle,
  ToolbarContent,
  Toolbar,

  Drawer,
  DrawerContainer,
  DrawerOverlay,

  Dropdown,
  DropdownMenu,
  DropdownToggle
];

// all providers
export const providers = [
  DrawerManager
];

// module
@NgModule({
  declarations: components,
  exports: components,
  providers: providers,
  imports: [BrowserModule]
})
export class CommonModule { }
