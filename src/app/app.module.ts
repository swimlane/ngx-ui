import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';
import { NgxUIModule } from '../../dist/swimlane/ngx-ui/esm5/public_api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [BrowserModule, HttpClientModule, NgxUIModule, FormsModule, NgxDatatableModule, BrowserAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
