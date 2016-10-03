import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import './styles/index.scss';
import { InjectionService } from './utils';
import { DblClickCopyDirective } from './directives';

import {
  CalendarModule, CodemirrorModule, CodeHighlightModule,
  ComplexityMeterModule, DrawerModule, DropdownModule,
  InputModule, SectionModule, SliderModule, TabsModule,
  ToolbarModule, TooltipModule, DrawerManagerService,
  TooltipService, OverlayModule
} from './components';

/**
 * Export these for individual usage
 * such as downgrading in ng1 apps
 */
export * from './components';
export * from './utils';
export * from './directives';

/**
 * Exported Modules
 * @type {Array}
 */
const modules = [
  CalendarModule, CodemirrorModule, CodeHighlightModule,
  ComplexityMeterModule, DrawerModule, DropdownModule,
  InputModule, SectionModule, SliderModule, TabsModule,
  ToolbarModule, TooltipModule, CommonModule, FormsModule,
  OverlayModule
];

/**
 * Exported Providers
 * @type {Array}
 */
const providers = [
  DrawerManagerService, InjectionService, TooltipService
];

/**
 * Exported Declarations
 * @type {Array}
 */
const declarations = [ DblClickCopyDirective ];

@NgModule({
  declarations,
  providers,
  exports: [...declarations, ...modules],
  imports: modules
})
export class SWUIModule { }
