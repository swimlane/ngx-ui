import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipPageRoutingModule } from './tip-page-routing.module';
import { SectionModule, TipModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { TipPageComponent } from './tip-page.component';

@NgModule({
  declarations: [TipPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TipModule, TipPageRoutingModule]
})
export class TipPageModule {}
