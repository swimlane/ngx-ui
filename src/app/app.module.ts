import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';
import { NgxUIModule } from '@swimlane/ngx-ui';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from '@swimlane/ng2-file-upload';

// Components
import { AlertPageComponent } from './dialogs/alert-page/alert-page.component';
import { AppComponent } from './app.component';
import { ButtonsPageComponent } from './forms/buttons-page/buttons-page.component';
import { CalendarPageComponent } from './forms/calendar-page/calendar-page.component';
import { CheckboxPageComponent } from './forms/checkbox-page/checkbox-page.component';
import { CodeEditorPageComponent } from './forms/code-editor-page/code-editor-page.component';
import { ColorsPageComponent } from './colors-page/colors-page.component';
import { ControlsPageComponent } from './controls-page/controls-page.component';
import { CounterComponent } from './components/tabs-page/counter.component';
import { DatetimePageComponent } from './forms/datetime-page/datetime-page.component';
import { DialogPageComponent } from './dialogs/dialog-page/dialog-page.component';
import { DrawerPageComponent } from './dialogs/drawer-page/drawer-page.component';
import { DropdownPageComponent } from './components/dropdown-page/dropdown-page.component';
import { HotkeysPageComponent } from './components/hotkeys-page/hotkeys-page.component';
import { IconsPageComponent } from './icons-page/icons-page.component';
import { InputsPageComponent } from './forms/inputs-page/inputs-page.component';
import { JsonEditorPageComponent } from './components/json-editor-page/json-editor-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListsPageComponent } from './elements/lists-page/lists-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { NagPageComponent } from './dialogs/nag-page/nag-page.component';
import { NavbarPageComponent } from './components/navbar-page/navbar-page.component';
import { NgxIconPageComponent } from './components/ngx-icon-page/ngx-icon-page.component';
import { NotificationPageComponent } from './dialogs/notification-page/notification-page.component';
import { OverlayPageComponent } from './components/overlay-page/overlay-page.component';
import { PipesPageComponent } from './pipes-page/pipes-page.component';
import { ProgressSpinnerPageComponent } from './components/progress-spinner-page/progress-spinner-page.component';
import { RadioPageComponent } from './forms/radio-page/radio-page.component';
import { ScrollbarsPageComponent } from './elements/scrollbars-page/scrollbars-page.component';
import { SectionsPageComponent } from './components/sections-page/sections-page.component';
import { SelectsPageComponent } from './forms/selects-page/selects-page.component';
import { SliderPageComponent } from './forms/slider-page/slider-page.component';
import { SplitPageComponent } from './components/split-page/split-page.component';
import { StepperPageComponent } from './components/stepper-page/stepper-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { TablePageComponent } from './elements/table-page/table-page.component';
import { TabsPageComponent } from './components/tabs-page/tabs-page.component';
import { TagsPageComponent } from './elements/tags-page/tags-page.component';
import { TipPageComponent } from './components/tip-page/tip-page.component';
import { TogglePageComponent } from './forms/toggle-page/toggle-page.component';
import { ToolbarPageComponent } from './components/toolbar-page/toolbar-page.component';
import { TooltipPageComponent } from './dialogs/tooltip-page/tooltip-page.component';
import { TreePageComponent } from './components/tree-page/tree-page.component';
import { TypographyPageComponent } from './typography-page/typography-page.component';
import { DrawerContainerExampleComponent } from './dialogs/drawer-page/drawer-container-example/drawer-container-example.component';
import { AppRoutingModule } from './app.routing.module';
import { PrismModule } from './common/prism/prism.module';

@NgModule({
  declarations: [
    AlertPageComponent,
    AppComponent,
    ButtonsPageComponent,
    CalendarPageComponent,
    CheckboxPageComponent,
    CodeEditorPageComponent,
    ColorsPageComponent,
    ControlsPageComponent,
    CounterComponent,
    DatetimePageComponent,
    DialogPageComponent,
    DrawerPageComponent,
    DropdownPageComponent,
    HotkeysPageComponent,
    IconsPageComponent,
    InputsPageComponent,
    JsonEditorPageComponent,
    LandingPageComponent,
    ListsPageComponent,
    LoadingPageComponent,
    LayoutPageComponent,
    NagPageComponent,
    NavbarPageComponent,
    NgxIconPageComponent,
    NotificationPageComponent,
    OverlayPageComponent,
    PipesPageComponent,
    ProgressSpinnerPageComponent,
    RadioPageComponent,
    ScrollbarsPageComponent,
    SectionsPageComponent,
    SelectsPageComponent,
    SliderPageComponent,
    SplitPageComponent,
    StepperPageComponent,
    TablePageComponent,
    TabsPageComponent,
    TagsPageComponent,
    TipPageComponent,
    TogglePageComponent,
    ToolbarPageComponent,
    TooltipPageComponent,
    TreePageComponent,
    TypographyPageComponent,
    DrawerContainerExampleComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    PrismModule,
    BrowserAnimationsModule,
    FileUploadModule,
    NgxUIModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
