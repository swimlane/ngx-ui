import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertPageRoutingModule } from './alert-page-routing.module';
import { DialogModule, SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { AlertPageComponent } from './alert-page.component';

@NgModule({
  declarations: [AlertPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, DialogModule, TabsModule, AlertPageRoutingModule]
})
export class AlertPageModule {}
