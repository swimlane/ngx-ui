import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CopyToClipboardModule } from '@swimlane/ngx-ui/directives/copy-to-clipboard';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { MarkdownModule } from '../../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../../shared/ui/section-header/section-header.module';
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
    RouterModule.forChild([
      {
        path: '',
        component: IconsComponent,
      },
    ]),
    SectionHeaderModule,
    IconModule,
    CopyToClipboardModule,
    MarkdownModule,
  ],
  exports: [IconsComponent],
})
export class IconsModule {}
