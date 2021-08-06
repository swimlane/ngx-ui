import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScrollbarsPageComponent } from './scrollbars-page.component';

const routes: Routes = [
  {
    path: '',
    component: ScrollbarsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrollbarsPageRoutingModule {}
