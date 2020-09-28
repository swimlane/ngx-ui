import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsPageComponent } from './lists-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsPageRoutingModule {}
