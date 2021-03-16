import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, LongPressButtonModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { ButtonsPageComponent } from './buttons-page.component';
import { ButtonsPageRoutingModule } from './buttons-page-routing.module';

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
