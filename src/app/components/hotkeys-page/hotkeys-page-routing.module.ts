import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotkeysPageComponent } from './hotkeys-page.component';

const routes: Routes = [
  {
    path: '',
    component: HotkeysPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotkeysPageRoutingModule {}
