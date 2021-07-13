import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
