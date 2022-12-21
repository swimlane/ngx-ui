import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule, NagModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { NagPageRoutingModule } from './nag-page-routing.module';
import { NagPageComponent } from './nag-page.component';

@NgModule({
  declarations: [NagPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, NagModule, IconModule, NagPageRoutingModule, TabsModule]
})
export class NagPageModule {}
