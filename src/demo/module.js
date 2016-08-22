import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './App.js';
import { CommonModule } from '../index.js';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, CommonModule],
  bootstrap: [App]
})
export class AppModule { }
