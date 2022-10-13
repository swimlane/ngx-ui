import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule, TabsModule, TipModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { TipPageRoutingModule } from './tip-page-routing.module';
import { TipPageComponent } from './tip-page.component';

@NgModule({
  declarations: [TipPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TipModule, TipPageRoutingModule, TabsModule]
})
export class TipPageModule {}
