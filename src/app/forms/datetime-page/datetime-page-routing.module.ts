import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatetimePageComponent } from './datetime-page.component';

const routes: Routes = [
  {
    path: '',
    component: DatetimePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatetimePageRoutingModule {}
