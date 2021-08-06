import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsPageComponent } from './controls-page.component';

const routes: Routes = [
  {
    path: '',
    component: ControlsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlsPageRoutingModule {}
