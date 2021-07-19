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
];
