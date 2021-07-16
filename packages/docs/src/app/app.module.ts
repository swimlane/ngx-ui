import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  DocMainModule,
  DocNavigationLogoCollapsedModule,
  DocNavigationLogoModule,
  NGX_DOC_TITLE_PREFIX,
} from '@swimlane/ngx-doc';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { ButtonModule } from '@swimlane/ngx-ui/button';
import { CalendarModule } from '@swimlane/ngx-ui/calendar';
import { CardModule } from '@swimlane/ngx-ui/card';
import { CheckboxModule } from '@swimlane/ngx-ui/checkbox';
import { FileButtonModule } from '@swimlane/ngx-ui/file-button';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { MarginlessModule } from '@swimlane/ngx-ui/marginless';
import { SizeModule } from '@swimlane/ngx-ui/size';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    ButtonModule,
    FileButtonModule,
    CalendarModule,
    FormsModule,
    CheckboxModule,
    CardModule,
    InputModule,
    InputAttributeModule,
    AutofocusModule,
    AppearanceModule,
    SizeModule,
    MarginlessModule,
    DocMainModule,
    DocNavigationLogoModule,
    DocNavigationLogoCollapsedModule,
    IconModule,
  ],
  providers: [
    {
      provide: NGX_DOC_TITLE_PREFIX,
      useValue: 'ngx-ui | ',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
