import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page.component';
import { ListPageRoutingModule } from './list-page-routing.module';
import { IconModule, ListModule, SectionModule, TabsModule, TooltipModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    ListPageRoutingModule,
    ListModule,
    TooltipModule,
    IconModule,
    TabsModule,
    SectionModule,
    PrismModule
  ],
  exports: [ListPageComponent, ListPageRoutingModule]
})
export class ListPageModule {}
