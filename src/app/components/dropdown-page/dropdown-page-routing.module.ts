import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DropdownPageComponent } from './dropdown-page.component';

const routes: Routes = [
  {
    path: '',
    component: DropdownPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownPageRoutingModule {}
