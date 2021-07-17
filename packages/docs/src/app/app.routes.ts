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
];
