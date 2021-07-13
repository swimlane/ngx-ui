import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarPageComponent } from './navbar-page.component';
import { navbarRoutes } from './navbar-page.routes';

const routes: Routes = [
  {
    path: '',
    component: NavbarPageComponent,
    children: navbarRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarPageRoutingModule {}
