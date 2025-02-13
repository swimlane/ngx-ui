import { NgModule } from '@angular/core';
import { ListPageComponent } from './list-page.component';
import { ListPageRoutingModule } from './list-page-routing.module';
import { ListModule, TooltipModule } from '@swimlane/ngx-ui';

@NgModule({
  declarations: [ListPageComponent],
  imports: [ListPageRoutingModule, ListModule, TooltipModule],
  exports: [ListPageComponent, ListPageRoutingModule]
})
export class ListPageModule {}
