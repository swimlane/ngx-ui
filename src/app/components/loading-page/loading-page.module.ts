import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingPageRoutingModule } from './loading-page-routing.module';
import { SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { LoadingPageComponent } from './loading-page.component';

@NgModule({
  declarations: [LoadingPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TabsModule, LoadingPageRoutingModule]
})
export class LoadingPageModule {}
