import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InjectionService } from './utils';
import { DblClickCopyDirective } from './directives';

import {
  CalendarModule, CodemirrorModule, CodeHighlightModule,
  ComplexityMeterModule, DrawerModule, DropdownModule,
  InputModule, SectionModule, SliderModule, TabsModule,
  ToolbarModule, TooltipModule, DrawerService,
  TooltipService, OverlayModule, DialogModule, DialogService
} from './components';

/**
 * Exported Modules
 * @type {Array}
 */
const modules = [
  CalendarModule, CodemirrorModule, CodeHighlightModule,
  ComplexityMeterModule, DrawerModule, DropdownModule,
  InputModule, SectionModule, SliderModule, TabsModule,
  ToolbarModule, TooltipModule, CommonModule, FormsModule,
  OverlayModule, DialogModule
];

/**
 * Exported Providers
 * @type {Array}
 */
const providers = [
  DrawerService, InjectionService, TooltipService, DialogService
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
