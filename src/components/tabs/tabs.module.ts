import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [TabComponent, TabsComponent],
  exports: [TabComponent, TabsComponent],
  imports: [BrowserModule]
})
export class TabsModule { }
