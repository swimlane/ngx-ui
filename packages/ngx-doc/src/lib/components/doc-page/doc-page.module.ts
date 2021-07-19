import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsModule } from '@swimlane/ngx-ui/tabs';
import { DocPageTabDirective } from './doc-page-tab.directive';
import { DocPageComponent } from './doc-page.component';

@NgModule({
  declarations: [DocPageComponent, DocPageTabDirective],
  imports: [CommonModule, TabsModule],
  exports: [DocPageComponent, DocPageTabDirective],
})
export class DocPageModule {}
