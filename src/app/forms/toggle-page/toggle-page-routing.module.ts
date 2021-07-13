import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TogglePageComponent } from './toggle-page.component';

const routes: Routes = [
  {
    path: '',
    component: TogglePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TogglePageRoutingModule {}
