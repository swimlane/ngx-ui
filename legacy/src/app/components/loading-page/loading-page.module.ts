import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { LoadingPageRoutingModule } from './loading-page-routing.module';
import { LoadingPageComponent } from './loading-page.component';

@NgModule({
  declarations: [LoadingPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TabsModule, LoadingPageRoutingModule]
})
export class LoadingPageModule {}
