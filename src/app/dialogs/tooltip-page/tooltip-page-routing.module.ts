import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TooltipPageComponent } from './tooltip-page.component';

const routes: Routes = [
  {
    path: '',
    component: TooltipPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TooltipPageRoutingModule {}
