import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { TabsPageComponent } from './tabs-page.component';
import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [TabsPageComponent, CounterComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, TabsModule, TabsPageRoutingModule]
})
export class TabsPageModule {}
