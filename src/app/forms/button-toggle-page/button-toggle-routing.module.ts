import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonTogglePageComponent } from './button-toggle-page.component';

const routes: Routes = [
  {
    path: '',
    component: ButtonTogglePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonTogglePageRoutingModule {}
