import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DialogService } from './components/dialog/dialog.service';
import { DirectivesModule } from './directives/directives.module';
import { DrawerService } from './components/drawer/drawer.service';
import { IconRegistryService } from './services/icon-registry/icon-registry.service';
import { InjectionService } from './services/injection/injection.service';
import { LoadingService } from './components/loading/loading.service';
import { NotificationService } from './components/notification/notification.service';
import { OverlayService } from './components/overlay/overlay.service';
import { PipesModule } from './pipes/pipes.module';
import { TooltipService } from './components/tooltip/tooltip.service';

import { ButtonModule } from './components/button/button.module';
import { CalendarModule } from './components/calendar/calendar.module';
import { CardModule } from './components/card/card.module';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { CodeEditorModule } from './components/code-editor/code-editor.module';
import { DateTimeModule } from './components/date-time/date-time.module';
import { DialogModule } from './components/dialog/dialog.module';
import { DrawerModule } from './components/drawer/drawer.module';
import { DropdownModule } from './components/dropdown/dropdown.module';
import { HotkeysModule } from './components/hotkeys/hotkeys.module';
import { IconModule } from './components/icon/icon.module';
import { InputModule } from './components/input/input.module';
import { JsonEditorModule } from './components/json-editor/json-editor.module';
import { LoadingModule } from './components/loading/loading.module';
import { LongPressButtonModule } from './components/long-press/long-press-button.module';
import { NagModule } from './components/nag/nag.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { NavMenuModule } from './components/nav-menu/nav-menu.module';
import { NotificationModule } from './components/notification/notification.module';
import { OverlayModule } from './components/overlay/overlay.module';
import { PlusMenuModule } from './components/plus-menu/plus-menu.module';
import { ProgressSpinnerModule } from './components/progress-spinner/progress-spinner.module';
import { RadioButtonModule } from './components/radiobutton/radiobutton.module';
import { SectionModule } from './components/section/section.module';
import { SelectModule } from './components/select/select.module';
import { SliderModule } from './components/slider/slider.module';
import { SplitModule } from './components/split/split.module';
import { StepperModule } from './components/stepper/stepper.module';
import { TabsModule } from './components/tabs/tabs.module';
import { TipModule } from './components/tip/tip.module';
import { ToggleModule } from './components/toggle/toggle.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { TooltipModule } from './components/tooltip/tooltip.module';
import { TreeModule } from './components/tree/tree.module';

/**
 * Exported Modules
 */
const modules = [
  ButtonModule,
  CalendarModule,
  CardModule,
  CheckboxModule,
  CodeEditorModule,
  CommonModule,
  DateTimeModule,
  DialogModule,
  DirectivesModule,
  DrawerModule,
  DropdownModule,
  FormsModule,
  HotkeysModule,
  IconModule,
  InputModule,
  JsonEditorModule,
  LoadingModule,
  LongPressButtonModule,
  NagModule,
  NavbarModule,
  NavMenuModule,
  NotificationModule,
  OverlayModule,
  PipesModule,
  PlusMenuModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  SectionModule,
  SelectModule,
  SliderModule,
  SplitModule,
  StepperModule,
  TabsModule,
  TipModule,
  ToggleModule,
  ToolbarModule,
  TooltipModule,
  TreeModule
];

const services = [
  DialogService,
  DrawerService,
  IconRegistryService,
  InjectionService,
  LoadingService,
  NotificationService,
  OverlayService,
  TooltipService
];

@NgModule({
  providers: [...services],
  exports: [...modules],
  imports: [...modules]
})
export class NgxUIModule {}
