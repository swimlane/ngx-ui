import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColorsPageComponent } from './colors-page/colors-page.component';
import { DropdownPageComponent } from './components/dropdown-page/dropdown-page.component';
import { HotkeysPageComponent } from './components/hotkeys-page/hotkeys-page.component';
import { JsonEditorPageComponent } from './components/json-editor-page/json-editor-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { NavbarPageComponent } from './components/navbar-page/navbar-page.component';
import { navbarRoutes } from './components/navbar-page/navbar-page.routes';
import { NgxIconPageComponent } from './components/ngx-icon-page/ngx-icon-page.component';
import { OverlayPageComponent } from './components/overlay-page/overlay-page.component';
import { ProgressSpinnerPageComponent } from './components/progress-spinner-page/progress-spinner-page.component';
import { SectionsPageComponent } from './components/sections-page/sections-page.component';
import { SplitPageComponent } from './components/split-page/split-page.component';
import { StepperPageComponent } from './components/stepper-page/stepper-page.component';
import { TabsPageComponent } from './components/tabs-page/tabs-page.component';
import { TipPageComponent } from './components/tip-page/tip-page.component';
import { ToolbarPageComponent } from './components/toolbar-page/toolbar-page.component';
import { TreePageComponent } from './components/tree-page/tree-page.component';
import { ControlsPageComponent } from './controls-page/controls-page.component';
import { AlertPageComponent } from './dialogs/alert-page/alert-page.component';
import { DialogPageComponent } from './dialogs/dialog-page/dialog-page.component';
import { DrawerPageComponent } from './dialogs/drawer-page/drawer-page.component';
import { NagPageComponent } from './dialogs/nag-page/nag-page.component';
import { NotificationPageComponent } from './dialogs/notification-page/notification-page.component';
import { TooltipPageComponent } from './dialogs/tooltip-page/tooltip-page.component';
import { ListsPageComponent } from './elements/lists-page/lists-page.component';
import { ScrollbarsPageComponent } from './elements/scrollbars-page/scrollbars-page.component';
import { TablePageComponent } from './elements/table-page/table-page.component';
import { TagsPageComponent } from './elements/tags-page/tags-page.component';
import { ButtonsPageComponent } from './forms/buttons-page/buttons-page.component';
import { CalendarPageComponent } from './forms/calendar-page/calendar-page.component';
import { CheckboxPageComponent } from './forms/checkbox-page/checkbox-page.component';
import { CodeEditorPageComponent } from './forms/code-editor-page/code-editor-page.component';
import { DatetimePageComponent } from './forms/datetime-page/datetime-page.component';
import { InputsPageComponent } from './forms/inputs-page/inputs-page.component';
import { RadioPageComponent } from './forms/radio-page/radio-page.component';
import { SelectsPageComponent } from './forms/selects-page/selects-page.component';
import { SliderPageComponent } from './forms/slider-page/slider-page.component';
import { TogglePageComponent } from './forms/toggle-page/toggle-page.component';
import { IconsPageComponent } from './icons-page/icons-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { PipesPageComponent } from './pipes-page/pipes-page.component';
import { TypographyPageComponent } from './typography-page/typography-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'alert', component: AlertPageComponent },
  {
    path: 'animations',
    loadChildren: () => import('./animations-page/animations-page.module').then(m => m.AnimationsPageModule)
  },
  { path: 'buttons', component: ButtonsPageComponent },
  { path: 'calendar', component: CalendarPageComponent },
  { path: 'checkbox', component: CheckboxPageComponent },
  { path: 'code-editor', component: CodeEditorPageComponent },
  { path: 'colors', component: ColorsPageComponent },
  { path: 'controls', component: ControlsPageComponent },
  { path: 'datetime', component: DatetimePageComponent },
  { path: 'dialog', component: DialogPageComponent },
  { path: 'drawer', component: DrawerPageComponent },
  { path: 'dropdown', component: DropdownPageComponent },
  { path: 'hotkeys', component: HotkeysPageComponent },
  { path: 'icons', component: IconsPageComponent },
  { path: 'inputs', component: InputsPageComponent },
  { path: 'json-editor', component: JsonEditorPageComponent },
  { path: 'lists', component: ListsPageComponent },
  { path: 'loading', component: LoadingPageComponent },
  { path: 'layout', component: LayoutPageComponent },
  { path: 'nag', component: NagPageComponent },
  { path: 'navbar', component: NavbarPageComponent, children: navbarRoutes },
  { path: 'ngx-icon', component: NgxIconPageComponent },
  { path: 'notification', component: NotificationPageComponent },
  { path: 'overlay', component: OverlayPageComponent },
  { path: 'pipes', component: PipesPageComponent },
  { path: 'progress-spinner', component: ProgressSpinnerPageComponent },
  { path: 'radio', component: RadioPageComponent },
  { path: 'scrollbars', component: ScrollbarsPageComponent },
  { path: 'sections', component: SectionsPageComponent },
  { path: 'selects', component: SelectsPageComponent },
  { path: 'slider', component: SliderPageComponent },
  { path: 'split', component: SplitPageComponent },
  { path: 'stepper', component: StepperPageComponent },
  { path: 'table', component: TablePageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: 'tags', component: TagsPageComponent },
  { path: 'tip', component: TipPageComponent },
  { path: 'toggle', component: TogglePageComponent },
  { path: 'toolbar', component: ToolbarPageComponent },
  { path: 'tooltip', component: TooltipPageComponent },
  { path: 'tree', component: TreePageComponent },
  { path: 'typography', component: TypographyPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
