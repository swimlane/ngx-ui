import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { CopyToClipboardModule } from '@swimlane/ngx-ui/copy-to-clipboard';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { IconBlockComponent } from './components/icon-block.component';
import { IconsSectionContainerComponent } from './components/icons-section-container.component';
import { IconsComponent } from './icons.component';

@NgModule({
  declarations: [
    IconsComponent,
    IconsSectionContainerComponent,
    IconBlockComponent,
  ],
  imports: [
    CommonModule,
    CopyToClipboardModule,
    IconModule,
    DocPageModule,
    DocExampleModule,
    DocMarkdownModule,
    RouterModule.forChild(generateRoutes(IconsComponent)),
  ],
})
export class IconsModule {}
