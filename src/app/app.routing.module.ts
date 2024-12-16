import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'alert', loadChildren: () => import('./dialogs/alert-page/alert-page.module').then(m => m.AlertPageModule) },
  {
    path: 'animations',
    loadChildren: () => import('./animations-page/animations-page.module').then(m => m.AnimationsPageModule)
  },
  {
    path: 'buttons',
    loadChildren: () => import('./forms/buttons-page/buttons-page.module').then(m => m.ButtonsPageModule)
  },
  {
    path: 'button-toggle',
    loadChildren: () =>
      import('./forms/button-toggle-page/button-toggle-page.module').then(m => m.ButtonTogglePageModule)
  },
  {
    path: 'button-group',
    loadChildren: () =>
      import('./components/button-group-page/button-group-page.module').then(m => m.ButtonGroupPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./forms/calendar-page/calendar-page.module').then(m => m.CalendarPageModule)
  },
  {
    path: 'time-display',
    loadChildren: () =>
      import('./components/time-display-page/time-display-page.component.module').then(m => m.DateDisplayPageModule)
  },
  { path: 'card', loadChildren: () => import('./components/card-page/card-page.module').then(m => m.CardPageModule) },
  {
    path: 'checkbox',
    loadChildren: () => import('./forms/checkbox-page/checkbox-page.module').then(m => m.CheckboxPageModule)
  },
  {
    path: 'code-editor',
    loadChildren: () => import('./forms/code-editor-page/code-editor-page.module').then(m => m.CodeEditorPageModule)
  },
  { path: 'colors', loadChildren: () => import('./colors-page/colors-page.module').then(m => m.ColorsPageModule) },
  {
    path: 'controls',
    loadChildren: () => import('./controls-page/controls-page.module').then(m => m.ControlsPageModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./testing-page/testing-page.module').then(m => m.TestingPageModule)
  },
  {
    path: 'datetime',
    loadChildren: () => import('./forms/datetime-page/datetime-page.module').then(m => m.DatetimePageModule)
  },
  {
    path: 'dialog',
    loadChildren: () => import('./dialogs/dialog-page/dialog-page.module').then(m => m.DialogPageModule)
  },
  {
    path: 'dialog-large-format',
    loadChildren: () =>
      import('./dialogs/dialog-large-format-page/dialog-large-format-page.module').then(
        m => m.DialogLargeFormatPageModule
      )
  },
  {
    path: 'dialog-medium-format',
    loadChildren: () =>
      import('./dialogs/dialog-medium-format-page/dialog-medium-format-page.module').then(
        m => m.DialogMediumFormatPageModule
      )
  },
  {
    path: 'drawer',
    loadChildren: () => import('./dialogs/drawer-page/drawer-page.module').then(m => m.DrawerPageModule)
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./components/dropdown-page/dropdown-page.module').then(m => m.DropdownPageModule)
  },
  {
    path: 'dropzone',
    loadChildren: () => import('./components/dropzone-page/dropzone-page.module').then(m => m.DropzonePageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./components/filters-page/filters-page.module').then(m => m.FiltersPageModule)
  },
  {
    path: 'hotkeys',
    loadChildren: () => import('./components/hotkeys-page/hotkeys-page.module').then(m => m.HotkeysPageModule)
  },
  { path: 'icons', loadChildren: () => import('./icons-page/icons-page.module').then(m => m.IconsPageModule) },
  {
    path: 'inputs',
    loadChildren: () => import('./forms/inputs-page/inputs-page.module').then(m => m.InputsPageModule)
  },
  {
    path: 'json-editor',
    loadChildren: () =>
      import('./components/json-editor-page/json-editor-page.module').then(m => m.JsonEditorPageModule)
  },
  { path: 'lists', loadChildren: () => import('./elements/lists-page/lists-page.module').then(m => m.ListsPageModule) },
  {
    path: 'loading',
    loadChildren: () => import('./components/loading-page/loading-page.module').then(m => m.LoadingPageModule)
  },
  { path: 'layout', loadChildren: () => import('./layout-page/layout-page.module').then(m => m.LayoutPageModule) },
  { path: 'nag', loadChildren: () => import('./dialogs/nag-page/nag-page.module').then(m => m.NagPageModule) },
  {
    path: 'navbar',
    loadChildren: () => import('./components/navbar-page/navbar-page.module').then(m => m.NavbarPageModule)
  },
  {
    path: 'ngx-icon',
    loadChildren: () => import('./components/ngx-icon-page/ngx-icon-page.module').then(m => m.NgxIconPageModule)
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./dialogs/notification-page/notification-page.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'overlay',
    loadChildren: () => import('./components/overlay-page/overlay-page.module').then(m => m.OverlayPageModule)
  },
  { path: 'pipes', loadChildren: () => import('./pipes-page/pipes-page.module').then(m => m.PipesPageModule) },
  {
    path: 'plus-menu',
    loadChildren: () => import('./components/plus-menu-page/plus-menu-page.module').then(m => m.PlusMenuPageModule)
  },
  {
    path: 'progress-spinner',
    loadChildren: () =>
      import('./components/progress-spinner-page/progress-spinner-page.module').then(m => m.ProgressSpinnerPageModule)
  },
  { path: 'radio', loadChildren: () => import('./forms/radio-page/radio-page.module').then(m => m.RadioPageModule) },
  {
    path: 'scrollbars',
    loadChildren: () => import('./elements/scrollbars-page/scrollbars-page.module').then(m => m.ScrollbarsPageModule)
  },
  {
    path: 'sections',
    loadChildren: () => import('./components/sections-page/sections-page.module').then(m => m.SectionsPageModule)
  },
  {
    path: 'selects',
    loadChildren: () => import('./forms/selects-page/selects-page.module').then(m => m.SelectsPageModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./forms/slider-page/slider-page.module').then(m => m.SliderPageModule)
  },
  {
    path: 'split',
    loadChildren: () => import('./components/split-page/split-page.module').then(m => m.SplitPageModule)
  },
  {
    path: 'stepper',
    loadChildren: () => import('./components/stepper-page/stepper-page.module').then(m => m.StepperPageModule)
  },
  { path: 'table', loadChildren: () => import('./elements/table-page/table-page.module').then(m => m.TablePageModule) },
  { path: 'tabs', loadChildren: () => import('./components/tabs-page/tabs-page.module').then(m => m.TabsPageModule) },
  { path: 'tags', loadChildren: () => import('./elements/tags-page/tags-page.module').then(m => m.TagsPageModule) },
  { path: 'tip', loadChildren: () => import('./components/tip-page/tip-page.module').then(m => m.TipPageModule) },
  {
    path: 'toggle',
    loadChildren: () => import('./forms/toggle-page/toggle-page.module').then(m => m.TogglePageModule)
  },
  {
    path: 'toolbar',
    loadChildren: () => import('./components/toolbar-page/toolbar-page.module').then(m => m.ToolbarPageModule)
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./dialogs/tooltip-page/tooltip-page.module').then(m => m.TooltipPageModule)
  },
  { path: 'tree', loadChildren: () => import('./components/tree-page/tree-page.module').then(m => m.TreePageModule) },
  {
    path: 'typography',
    loadChildren: () => import('./typography-page/typography-page.module').then(m => m.TypographyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
