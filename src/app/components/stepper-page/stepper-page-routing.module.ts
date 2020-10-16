import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepperPageComponent } from './stepper-page.component';

const routes: Routes = [
  {
    path: '',
    component: StepperPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepperPageRoutingModule {}
