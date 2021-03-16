import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropzonePageComponent } from './dropzone-page.component';

const routes: Routes = [
  {
    path: '',
    component: DropzonePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropzonePageRoutingModule {}
