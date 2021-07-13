import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
