import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DateDisplayPageComponent } from './date-display-page.component.component';

const routes: Routes = [
  {
    path: '',
    component: DateDisplayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarPageRoutingModule {}
