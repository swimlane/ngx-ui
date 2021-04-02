import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogLargeFormatDialogPageComponent } from './dialog-large-format-dialog-page.component';

const routes: Routes = [
  {
    path: '',
    component: DialogLargeFormatDialogPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogLargeFormatPageRoutingModule {}
