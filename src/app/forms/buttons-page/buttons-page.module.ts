import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsPageRoutingModule } from './buttons-page-routing.module';
import {
  ButtonModule,
  LongPressButtonModule,
  SectionModule,
  TabsModule
} from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { ButtonsPageComponent } from './buttons-page.component';

@NgModule({
  declarations: [ButtonsPageComponent],
  imports: [
    CommonModule,
    PrismModule,
    SectionModule,
    ButtonModule,
    LongPressButtonModule,
    TabsModule,
    ButtonsPageRoutingModule
  ]
})
export class ButtonsPageModule {}
