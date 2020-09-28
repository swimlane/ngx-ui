import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotkeysModule, IconModule, NavMenuModule, ToolbarModule } from '../../projects/swimlane/ngx-ui/src/public_api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToolbarModule, HotkeysModule, IconModule, NavMenuModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
