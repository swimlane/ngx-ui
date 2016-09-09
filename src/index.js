import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// directives
import {
  TemplateWrapper,
  DblClickCopy
} from './directives/index.js';

import {
  PasswordStrength,
  CodeHighlight,
  Slider,

  DropdownMenu,
  DropdownToggle,
  Dropdown,

  Tabs,
  Tab,

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
  Slider,

  ToolbarTitle,
  ToolbarContent,
  Toolbar,

  Tabs,
  Tab,

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
