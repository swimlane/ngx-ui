import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'typography',
    loadChildren: () => import('./style/typography/typography.module').then(m => m.TypographyModule)
  },
  {
    path: 'colors',
    loadChildren: () => import('./style/colors/colors.module').then(m => m.ColorsModule)
  },
  {
    path: 'layout',
    loadChildren: () => import('./style/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'icons',
    loadChildren: () => import('./style/icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'animations',
    loadChildren: () => import('./animations/animations.module').then(m => m.AnimationsModule)
  },
  {
    path: 'pipes',
    loadChildren: () => import('./pipes/pipes.module').then(m => m.PipesModule)
  },
  {
    path: 'inputs',
    loadChildren: () => import('./forms/inputs/inputs.module').then(m => m.InputsModule)
  },
  {
    path: 'buttons',
    loadChildren: () => import('./forms/buttons/buttons.module').then(m => m.ButtonsModule)
  },
  {
    path: 'selects',
    loadChildren: () => import('./forms/selects/selects.module').then(m => m.SelectsModule)
  }
];
