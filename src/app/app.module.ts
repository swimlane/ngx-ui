import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MomentModule } from 'ngx-moment';
import { NgxUIModule } from '../../projects/swimlane/ngx-ui/src/public_api';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { ColorsPageComponent } from './colors-page/colors-page.component';
import { TypographyPageComponent } from './typography-page/typography-page.component';
import { IconsPageComponent } from './icons-page/icons-page.component';
import { AnimationsPageComponent } from './animations-page/animations-page.component';
import { InputsPageComponent } from './forms/inputs-page/inputs-page.component';
import { ButtonsPageComponent } from './forms/buttons-page/buttons-page.component';
import { SelectsPageComponent } from './forms/selects-page/selects-page.component';
import { DatetimePageComponent } from './forms/datetime-page/datetime-page.component';
import { SliderPageComponent } from './forms/slider-page/slider-page.component';
import { TogglePageComponent } from './forms/toggle-page/toggle-page.component';
import { CheckboxPageComponent } from './forms/checkbox-page/checkbox-page.component';
import { RadioPageComponent } from './forms/radio-page/radio-page.component';
import { CalendarPageComponent } from './forms/calendar-page/calendar-page.component';
import { CodeEditorPageComponent } from './forms/code-editor-page/code-editor-page.component';
import { TablePageComponent } from './elements/table-page/table-page.component';
import { TagsPageComponent } from './elements/tags-page/tags-page.component';
import { ListsPageComponent } from './elements/lists-page/lists-page.component';
import { ScrollbarsPageComponent } from './elements/scrollbars-page/scrollbars-page.component';
import { DrawerPageComponent } from './dialogs/drawer-page/drawer-page.component';
import { NagPageComponent } from './dialogs/nag-page/nag-page.component';
import { DialogPageComponent } from './dialogs/dialog-page/dialog-page.component';
import { AlertPageComponent } from './dialogs/alert-page/alert-page.component';
import { TooltipPageComponent } from './dialogs/tooltip-page/tooltip-page.component';
import { NotificationPageComponent } from './dialogs/notification-page/notification-page.component';
import { ControlsPageComponent } from './controls-page/controls-page.component';
import { SectionsPageComponent } from './components/sections-page/sections-page.component';
import { ToolbarPageComponent } from './components/toolbar-page/toolbar-page.component';
import { TabsPageComponent } from './components/tabs-page/tabs-page.component';
import { CounterComponent } from './components/tabs-page/counter.component';
import { DropdownPageComponent } from './components/dropdown-page/dropdown-page.component';
import { DatatablePageComponent } from './components/datatable-page/datatable-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { ProgressSpinnerPageComponent } from './components/progress-spinner-page/progress-spinner-page.component';
import { TreePageComponent } from './components/tree-page/tree-page.component';
import { JsonEditorPageComponent } from './components/json-editor-page/json-editor-page.component';
import { NgxIconPageComponent } from './components/ngx-icon-page/ngx-icon-page.component';
import { SplitPageComponent } from './components/split-page/split-page.component';
import { OverlayPageComponent } from './components/overlay-page/overlay-page.component';
import { HotkeysPageComponent } from './components/hotkeys-page/hotkeys-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PipesPageComponent } from './pipes-page/pipes-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'colors', component: ColorsPageComponent },
  { path: 'typography', component: TypographyPageComponent },
  { path: 'icons', component: IconsPageComponent },
  { path: 'animations', component: AnimationsPageComponent },
  { path: 'inputs', component: InputsPageComponent },
  { path: 'buttons', component: ButtonsPageComponent },
  { path: 'selects', component: SelectsPageComponent },
  { path: 'datetime', component: DatetimePageComponent },
  { path: 'slider', component: SliderPageComponent },
  { path: 'toggle', component: TogglePageComponent },
  { path: 'checkbox', component: CheckboxPageComponent },
  { path: 'radio', component: RadioPageComponent },
  { path: 'calendar', component: CalendarPageComponent },
  { path: 'code-editor', component: CodeEditorPageComponent },
  { path: 'table', component: TablePageComponent },
  { path: 'tags', component: TagsPageComponent },
  { path: 'lists', component: ListsPageComponent },
  { path: 'scrollbars', component: ScrollbarsPageComponent },
  { path: 'drawer', component: DrawerPageComponent },
  { path: 'nag', component: NagPageComponent },
  { path: 'dialog', component: DialogPageComponent },
  { path: 'alert', component: AlertPageComponent },
  { path: 'tooltip', component: TooltipPageComponent },
  { path: 'notification', component: NotificationPageComponent },
  { path: 'controls', component: ControlsPageComponent },
  { path: 'sections', component: SectionsPageComponent },
  { path: 'toolbar', component: ToolbarPageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: 'dropdown', component: DropdownPageComponent },
  { path: 'datatable', component: DatatablePageComponent },
  { path: 'loading', component: LoadingPageComponent },
  { path: 'progress-spinner', component: ProgressSpinnerPageComponent },
  { path: 'tree', component: TreePageComponent },
  { path: 'json-editor', component: JsonEditorPageComponent },
  { path: 'ngx-icon', component: NgxIconPageComponent },
  { path: 'split', component: SplitPageComponent },
  { path: 'overlay', component: OverlayPageComponent },
  { path: 'hotkeys', component: HotkeysPageComponent },
  { path: 'pipes', component: PipesPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ColorsPageComponent,
    TypographyPageComponent,
    IconsPageComponent,
    AnimationsPageComponent,
    InputsPageComponent,
    ButtonsPageComponent,
    SelectsPageComponent,
    DatetimePageComponent,
    SliderPageComponent,
    TogglePageComponent,
    CheckboxPageComponent,
    RadioPageComponent,
    CalendarPageComponent,
    CodeEditorPageComponent,
    TablePageComponent,
    TagsPageComponent,
    ListsPageComponent,
    ScrollbarsPageComponent,
    DrawerPageComponent,
    NagPageComponent,
    DialogPageComponent,
    AlertPageComponent,
    TooltipPageComponent,
    NotificationPageComponent,
    ControlsPageComponent,
    SectionsPageComponent,
    ToolbarPageComponent,
    TabsPageComponent,
    DropdownPageComponent,
    DatatablePageComponent,
    LoadingPageComponent,
    ProgressSpinnerPageComponent,
    TreePageComponent,
    JsonEditorPageComponent,
    NgxIconPageComponent,
    SplitPageComponent,
    OverlayPageComponent,
    HotkeysPageComponent,
    LandingPageComponent,
    PipesPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    NgxUIModule,
    FormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
