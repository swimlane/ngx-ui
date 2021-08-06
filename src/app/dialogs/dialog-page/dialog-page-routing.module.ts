import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DialogPageComponent } from './dialog-page.component';

const routes: Routes = [
  {
    path: '',
    component: DialogPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogPageRoutingModule {}
