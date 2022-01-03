import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimeDisplayPageComponent } from './time-display-page.component.component';

const routes: Routes = [
  {
    path: '',
    component: TimeDisplayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarPageRoutingModule {}
