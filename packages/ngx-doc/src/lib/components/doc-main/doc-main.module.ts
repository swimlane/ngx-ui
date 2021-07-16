import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HotkeysModule } from '@swimlane/ngx-ui/hotkeys';
import { LoadingModule } from '@swimlane/ngx-ui/loading';
import { ToolbarModule } from '@swimlane/ngx-ui/toolbar';
import { MarkdownModule } from 'ngx-markdown';
import { DocNavigationModule } from '../doc-navigation/doc-navigation.module';
import { DocMainComponent } from './doc-main.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToolbarModule,
    HotkeysModule.forRoot(),
    RouterModule,
    DocNavigationModule,
    MarkdownModule.forRoot(),
    LoadingModule,
  ],
  declarations: [DocMainComponent],
  exports: [DocMainComponent, MarkdownModule],
})
export class DocMainModule {}
