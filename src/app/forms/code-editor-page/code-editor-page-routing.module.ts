import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeEditorPageComponent } from './code-editor-page.component';

const routes: Routes = [
  {
    path: '',
    component: CodeEditorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeEditorPageRoutingModule {}
