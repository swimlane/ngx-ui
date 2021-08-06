import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPageComponent } from './tabs-page.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
