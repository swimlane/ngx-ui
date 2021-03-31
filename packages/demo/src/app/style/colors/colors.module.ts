import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CopyToClipboardModule } from '@swimlane/ngx-ui/directives/copy-to-clipboard';
import { CopyToClipboardPatchModule } from '../../shared/directives/copy-to-clipboard/copy-to-clipboard-patch.module';
import { MarkdownModule } from '../../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../../shared/ui/section-header/section-header.module';
import { ColorsComponent } from './colors.component';
import { ColorBlockComponent } from './components/color-block/color-block.component';
import { ColorTitleComponent } from './components/color-title/color-title.component';
import { BgHexPipe } from './pipes/bg-hex.pipe';

@NgModule({
  declarations: [ColorsComponent, BgHexPipe, ColorBlockComponent, ColorTitleComponent],
  imports: [
    CommonModule,
    SectionHeaderModule,
    RouterModule.forChild([{ path: '', component: ColorsComponent }]),
    CopyToClipboardModule,
    MarkdownModule,
    CopyToClipboardPatchModule
  ],
  exports: [ColorsComponent]
})
export class ColorsModule {}
