import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificationPageComponent } from './notification-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationPageRoutingModule {}
