import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RadioPageComponent } from './radio-page.component';

const routes: Routes = [
  {
    path: '',
    component: RadioPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioPageRoutingModule {}
