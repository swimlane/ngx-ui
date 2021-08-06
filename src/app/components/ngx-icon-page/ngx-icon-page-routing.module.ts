import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxIconPageComponent } from './ngx-icon-page.component';

const routes: Routes = [
  {
    path: '',
    component: NgxIconPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxIconPageRoutingModule {}
