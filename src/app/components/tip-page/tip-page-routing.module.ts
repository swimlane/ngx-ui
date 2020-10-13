import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipPageComponent } from './tip-page.component';

const routes: Routes = [
  {
    path: '',
    component: TipPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipPageRoutingModule {}
