import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectsPageComponent } from './selects-page.component';

const routes: Routes = [
  {
    path: '',
    component: SelectsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectsPageRoutingModule {}
