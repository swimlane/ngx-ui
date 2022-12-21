import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogMediumFormatDialogPageComponent } from './dialog-medium-format-dialog-page.component';

const routes: Routes = [
  {
    path: '',
    component: DialogMediumFormatDialogPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogMediumFormatPageRoutingModule {}
