import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DrawerModule } from '@swimlane/ngx-ui/drawer';
import { HotkeysModule } from '@swimlane/ngx-ui/hotkeys';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { InputModule } from '@swimlane/ngx-ui/input';
import { LoadingModule } from '@swimlane/ngx-ui/loading';
import { NavMenuModule } from '@swimlane/ngx-ui/nav-menu';
import { ToolbarModule } from '@swimlane/ngx-ui/toolbar';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HotkeysModule.forRoot(),
    NavMenuModule,
    IconModule,
    InputModule,
    FormsModule,
    TooltipModule,
    ToolbarModule,
    DrawerModule,
    LoadingModule,
    RouterModule.forRoot(appRoutes),
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
