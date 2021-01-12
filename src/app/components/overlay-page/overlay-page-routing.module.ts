import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverlayPageComponent } from './overlay-page.component';

const routes: Routes = [
  {
    path: '',
    component: OverlayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverlayPageRoutingModule {}
