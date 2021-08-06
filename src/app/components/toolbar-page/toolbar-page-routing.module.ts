import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToolbarPageComponent } from './toolbar-page.component';

const routes: Routes = [
  {
    path: '',
    component: ToolbarPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolbarPageRoutingModule {}
