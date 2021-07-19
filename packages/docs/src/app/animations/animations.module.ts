import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocExampleModule, DocMarkdownModule, DocPageModule, generateRoutes } from '@swimlane/ngx-doc';
import { AnimationsComponent } from './animations.component';

@NgModule({
  declarations: [AnimationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(AnimationsComponent)),
    DocPageModule,
    DocExampleModule,
    DocMarkdownModule,
  ],
})
export class AnimationsModule {}
