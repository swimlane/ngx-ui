import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FiltersButtonPageComponent } from './filters-button-page.component';

const routes: Routes = [
  {
    path: '',
    component: FiltersButtonPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterButtonPageRoutingModule {}
