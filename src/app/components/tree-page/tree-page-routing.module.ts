import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreePageComponent } from './tree-page.component';

const routes: Routes = [
  {
    path: '',
    component: TreePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreePageRoutingModule {}
