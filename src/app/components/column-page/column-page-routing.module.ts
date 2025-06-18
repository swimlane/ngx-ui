import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnPageComponent } from './column-page.component';

const routes: Routes = [{ path: '', component: ColumnPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColumnPageRoutingModule {}
