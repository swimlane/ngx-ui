import { NgModule } from '@angular/core';
import { ColumnPageComponent } from './column-page.component';
import { ColumnPageRoutingModule } from './column-page-routing.module';
import { IconModule, ColumnsModule, SectionModule, TabsModule, TooltipModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

@NgModule({
  declarations: [ColumnPageComponent],
  imports: [ColumnPageRoutingModule, ColumnsModule, TooltipModule, IconModule, TabsModule, SectionModule, PrismModule],
  exports: [ColumnPageComponent, ColumnPageRoutingModule]
})
export class ColumnPageModule {}
