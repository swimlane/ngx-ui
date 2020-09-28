import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DrawerModule, HotkeysModule, IconModule, LoadingModule, NavMenuModule, ToolbarModule } from '@swimlane/ngx-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToolbarModule,
    HotkeysModule,
    IconModule,
    DrawerModule,
    LoadingModule,
    HttpClientModule,
    NavMenuModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
