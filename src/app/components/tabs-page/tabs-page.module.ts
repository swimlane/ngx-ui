import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { TabsPageComponent } from './tabs-page.component';
import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [TabsPageComponent, CounterComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, TabsModule, TabsPageRoutingModule]
})
export class TabsPageModule {}
