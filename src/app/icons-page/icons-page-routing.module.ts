import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IconsPageComponent } from './icons-page.component';

const routes: Routes = [
  {
    path: '',
    component: IconsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsPageRoutingModule {}
