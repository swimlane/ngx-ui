import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  CodeEditorModule,
  DateTimeModule,
  DialogModule,
  DialogService,
  DrawerModule,
  DrawerService,
  DropdownModule,
  HotkeysModule,
  IconModule,
  InputModule,
  LoadingModule,
  LoadingService,
  LongPressButtonModule,
  NagModule,
  NotificationModule,
  NotificationService,
  OverlayModule,
  OverlayService,
  RadioButtonModule,
  SectionModule,
  SelectModule,
  SliderModule,
  SplitModule,
  TabsModule,
  ToggleModule,
  ToolbarModule,
  TooltipModule,
  TooltipService,
  TreeModule,
  NavMenuModule
} from './components';
import { DirectivesModule } from './directives';
import { PipesModule } from './pipes';
import { IconRegisteryService, InjectionService } from './services';
import { JsonEditorModule } from './components/json-editor';

/**
 * Exported Modules
 */
const modules = [
  CalendarModule,
  CodeEditorModule,
  DirectivesModule,
  DrawerModule,
  DropdownModule,
  ButtonModule,
  FlexLayoutModule,
  InputModule,
  SectionModule,
  SliderModule,
  TabsModule,
  ToolbarModule,
  TooltipModule,
  CommonModule,
  FormsModule,
  OverlayModule,
  DialogModule,
  ToggleModule,
  DateTimeModule,
  CheckboxModule,
  NotificationModule,
  PipesModule,
  SelectModule,
  IconModule,
  LoadingModule,
  TreeModule,
  SplitModule,
  HotkeysModule,
  NagModule,
  LongPressButtonModule,
  RadioButtonModule,
  NavMenuModule,
  JsonEditorModule
];

@NgModule({
  providers: [
    DrawerService,
    InjectionService,
    IconRegisteryService,
    TooltipService,
    LoadingService,
    DialogService,
    OverlayService,
    NotificationService
  ],
  exports: [...modules],
  imports: [...modules]
})
export class NgxUIModule {}
