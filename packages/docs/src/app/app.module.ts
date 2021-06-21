import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@swimlane/ngx-ui/button';
import { FileButtonModule } from '@swimlane/ngx-ui/file-button';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ButtonModule,
    FileButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
