import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawerPageComponent } from './drawer-page.component';

const routes: Routes = [
  {
    path: '',
    component: DrawerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawerPageRoutingModule {}
