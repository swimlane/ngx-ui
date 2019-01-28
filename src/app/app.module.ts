import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';
import { MomentModule } from 'ngx-moment';
import { NgxUIModule } from '../../projects/swimlane/ngx-ui/src/public_api';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    NgxUIModule,
    FormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FlexLayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
