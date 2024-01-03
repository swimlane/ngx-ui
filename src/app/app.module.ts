import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  DrawerModule,
  HotkeysModule,
  IconModule,
  InputModule,
  LoadingModule,
  NavMenuModule,
  ToolbarModule
} from '@swimlane/ngx-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToolbarModule,
    HotkeysModule,
    IconModule,
    InputModule,
    DrawerModule,
    LoadingModule,
    HttpClientModule,
    NavMenuModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
