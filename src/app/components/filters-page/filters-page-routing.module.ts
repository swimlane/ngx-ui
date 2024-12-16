import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FiltersPageComponent } from './filters-page.component';

const routes: Routes = [
  {
    path: '',
    component: FiltersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectsPageRoutingModule {}
