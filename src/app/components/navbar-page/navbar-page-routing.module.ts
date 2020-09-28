import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarPageComponent } from './navbar-page.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarPageRoutingModule {}
