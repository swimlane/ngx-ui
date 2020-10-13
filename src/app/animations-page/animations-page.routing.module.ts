import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimationsPageComponent } from './animations-page.component';

const routes: Routes = [
  {
    path: '',
    component: AnimationsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimationsPageRoutingModule {}
