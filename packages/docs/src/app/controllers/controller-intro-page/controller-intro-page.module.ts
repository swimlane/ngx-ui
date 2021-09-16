import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { ControllerIntroComponent } from './controller-intro.component';

@NgModule({
  declarations: [ControllerIntroComponent],
  imports: [
    CommonModule,
    DocPageModule,
    RouterModule.forChild(generateRoutes(ControllerIntroComponent)),
    DocMarkdownModule,
  ],
})
export class ControllerIntroPageModule {}
