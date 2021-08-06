import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgressSpinnerPageComponent } from './progress-spinner-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProgressSpinnerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressSpinnerPageRoutingModule {}
