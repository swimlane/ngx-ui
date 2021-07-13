import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NagPageComponent } from './nag-page.component';

const routes: Routes = [
  {
    path: '',
    component: NagPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NagPageRoutingModule {}
