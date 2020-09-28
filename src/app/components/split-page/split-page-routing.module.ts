import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitPageComponent } from './split-page.component';

const routes: Routes = [
  {
    path: '',
    component: SplitPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplitPageRoutingModule {}
