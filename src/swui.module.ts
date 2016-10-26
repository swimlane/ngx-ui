import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InjectionService } from './utils';
import { DblClickCopyDirective } from './directives';
import { IterableMapPipe } from './pipes';

import {
  CalendarModule, CodemirrorModule, CodeHighlightModule,
  DrawerModule, DropdownModule, ButtonModule,
  InputModule, SectionModule, SliderModule, TabsModule,
  ToolbarModule, TooltipModule, OverlayModule, DialogModule,
  OverlayService, DialogService, DrawerService, TooltipService,
  ToggleModule, DateTimeModule, CheckboxModule
} from './components';

/**
 * Exported Modules
 * @type {Array}
 */
const modules = [
  CalendarModule, CodemirrorModule, CodeHighlightModule,
  DrawerModule, DropdownModule, ButtonModule,
  InputModule, SectionModule, SliderModule, TabsModule,
  ToolbarModule, TooltipModule, CommonModule, FormsModule,
  OverlayModule, DialogModule, ToggleModule, DateTimeModule,
  CheckboxModule
];

/**
 * Exported Providers
 * @type {Array}
 */
const providers = [
  DrawerService, InjectionService, TooltipService,
  DialogService, OverlayService
];

/**
 * Exported Declarations
 * @type {Array}
 */
const declarations = [ DblClickCopyDirective, IterableMapPipe ];

@NgModule({
  declarations,
  providers,
  exports: [...declarations, ...modules],
  imports: modules
})
export class SWUIModule { }
