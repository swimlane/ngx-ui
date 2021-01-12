import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardPageComponent } from './card-page.component';

const routes: Routes = [
  {
    path: '',
    component: CardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPageRoutingModule {}
