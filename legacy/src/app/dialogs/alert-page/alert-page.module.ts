import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { AlertPageRoutingModule } from './alert-page-routing.module';
import { AlertPageComponent } from './alert-page.component';

@NgModule({
  declarations: [AlertPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, DialogModule, TabsModule, AlertPageRoutingModule]
})
export class AlertPageModule {}
