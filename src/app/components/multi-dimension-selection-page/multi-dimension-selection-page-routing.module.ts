import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MultiDimensionSelectionPageComponent } from './multi-dimension-selection-page.component';

const routes: Routes = [
  {
    path: '',
    component: MultiDimensionSelectionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiDimensionSelectionPageRoutingModule {}
