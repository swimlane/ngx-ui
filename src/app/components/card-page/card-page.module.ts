import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CardModule,
  DropdownModule,
  IconModule,
  ResizeObserverModule,
  SectionModule,
  TabsModule,
  ToggleModule
} from '@swimlane/ngx-ui';
import { CardPageComponent } from './card-page.component';
import { CardPageRoutingModule } from './card-page-routing.module';
import { PrismModule } from '../../common/prism/prism.module';

@NgModule({
  declarations: [CardPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    CardPageRoutingModule,
    SectionModule,
    IconModule,
    DropdownModule,
    ResizeObserverModule,
    ToggleModule,
    PrismModule,
    TabsModule
  ]
})
export class CardPageModule {}
