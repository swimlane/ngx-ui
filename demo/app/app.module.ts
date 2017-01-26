import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { NgxUIModule } from '../../src/index';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxUIModule, FormsModule, NgxDatatableModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
