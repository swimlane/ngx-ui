import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './App.js';
// import { CommonModule } from '../common.js';
import { DblClickCopy } from '../directives/DblClickCopy.js';

@NgModule({
  declarations: [App, DblClickCopy],
  imports: [BrowserModule],
  bootstrap: [App]
})
export class AppModule { }
