import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JsonEditorPageComponent } from './json-editor-page.component';

const routes: Routes = [
  {
    path: '',
    component: JsonEditorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonEditorPageRoutingModule {}
