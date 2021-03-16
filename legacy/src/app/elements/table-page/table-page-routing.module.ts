import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablePageComponent } from './table-page.component';

const routes: Routes = [
  {
    path: '',
    component: TablePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablePageRoutingModule {}
