import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  LongPressButtonModule,
  SectionModule,
  TabsModule,
  ButtonGroupModule,
  DropdownModule,
  IconModule
} from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { ButtonGroupPageComponent } from './button-group-page.component';
import { ButtonGroupPageRoutingModule } from './button-group-page-routing.module';

@NgModule({
  declarations: [ButtonGroupPageComponent],
  imports: [
    CommonModule,
    PrismModule,
    SectionModule,
    ButtonModule,
    LongPressButtonModule,
    TabsModule,
    DropdownModule,
    IconModule,
    ButtonGroupModule,
    ButtonGroupPageRoutingModule
  ]
})
export class ButtonGroupPageModule {}
