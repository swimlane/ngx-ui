import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SliderPageComponent } from './slider-page.component';

const routes: Routes = [
  {
    path: '',
    component: SliderPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderPageRoutingModule {}
