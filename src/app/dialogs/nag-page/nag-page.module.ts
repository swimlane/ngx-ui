import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NagPageRoutingModule } from './nag-page-routing.module';
import { IconModule, NagModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { NagPageComponent } from './nag-page.component';

@NgModule({
  declarations: [NagPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, NagModule, IconModule, NagPageRoutingModule]
})
export class NagPageModule {}
