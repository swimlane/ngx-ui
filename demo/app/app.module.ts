import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';
import { NgxUIModule } from '../../src/index';

@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [BrowserModule, NgxUIModule, FormsModule, NgxDatatableModule, BrowserAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
