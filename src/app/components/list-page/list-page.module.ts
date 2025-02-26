import { NgModule } from '@angular/core';
import { ListPageComponent } from './list-page.component';
import { ListPageRoutingModule } from './list-page-routing.module';
import { IconModule, ListModule, SectionModule, TabsModule, TooltipModule } from '@swimlane/ngx-ui';

@NgModule({
  declarations: [ListPageComponent],
  imports: [ListPageRoutingModule, ListModule, TooltipModule, IconModule, TabsModule, SectionModule],
  exports: [ListPageComponent, ListPageRoutingModule]
})
export class ListPageModule {}
