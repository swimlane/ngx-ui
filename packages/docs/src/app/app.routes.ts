import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: {
      title: 'Home',
    },
  },
  {
    path: 'typography',
    loadChildren: () =>
      import('./typography/typography.module').then((m) => m.TypographyModule),
    data: {
      title: 'Typography',
    },
  },
  {
    path: 'colors',
    loadChildren: () =>
      import('./colors/colors.module').then((m) => m.ColorsModule),
    data: {
      title: 'Colors',
    },
  },
  {
    path: 'layout',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
    data: {
      title: 'Layout',
    },
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.module').then((m) => m.IconsModule),
    data: {
      title: 'Icons',
    },
  },
  {
    path: 'animations',
    loadChildren: () =>
      import('./animations/animations.module').then((m) => m.AnimationsModule),
    data: {
      title: 'Animations',
    },
  },
  {
    path: 'pipes',
    loadChildren: () =>
      import('./pipes/pipes.module').then((m) => m.PipesModule),
    data: {
      title: 'Pipes',
    },
  },
  {
    path: 'inputs',
    loadChildren: () =>
      import('./forms/input/input-page.module').then((m) => m.InputPageModule),
    data: {
      title: 'Inputs',
    },
  },
  {
    path: 'controllers',
    loadChildren: () =>
      import(
        './controllers/controller-intro-page/controller-intro-page.module'
      ).then((m) => m.ControllerIntroPageModule),
    data: {
      title: 'Controllers',
    },
  },
  {
    path: 'controller-forms',
    loadChildren: () =>
      import(
        './controllers/controller-form-page/controller-form-page.module'
      ).then((m) => m.ControllerFormPageModule),
    data: {
      title: 'Form Controllers',
    },
  },
  {
    path: 'buttons',
    loadChildren: () =>
      import('./forms/button/button-page.module').then(
        (m) => m.ButtonPageModule
      ),
    data: {
      title: 'Buttons',
    },
  },
  {
    path: 'selects',
    loadChildren: () =>
      import('./forms/select/select.module').then((m) => m.SelectModule),
    data: { title: 'Selects' },
  },
];
