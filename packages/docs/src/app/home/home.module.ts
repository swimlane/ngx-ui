import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocPageModule, generateRoutes } from '@swimlane/ngx-doc';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(HomeComponent)),
    DocPageModule,
  ],
})
export class HomeModule {}
