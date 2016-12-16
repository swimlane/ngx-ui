import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InjectionService } from './services';
import { DblClickCopyDirective } from './directives';
import { PipesModule } from './pipes';

import {
  CalendarModule, CodemirrorModule, CodeHighlightModule,
  DrawerModule, DropdownModule, ButtonModule,
  InputModule, SectionModule, SliderModule, TabsModule,
  ToolbarModule, TooltipModule, OverlayModule, DialogModule,
  OverlayService, DialogService, DrawerService, TooltipService,
  ToggleModule, DateTimeModule, CheckboxModule, NotificationModule,
  NotificationService
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
  CheckboxModule, NotificationModule, PipesModule
];

/**
 * Exported Providers
 * @type {Array}
 */
const providers = [
  DrawerService, InjectionService, TooltipService,
  DialogService, OverlayService, NotificationService
];

/**
 * Exported Declarations
 * @type {Array}
 */
const declarations = [ DblClickCopyDirective ];

@NgModule({
  declarations: [...declarations],
  providers: [...providers],
  exports: [...declarations, ...modules],
  imports: modules
})
export class NgxUIModule { }
