import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule, DialogModule, DrawerModule, SectionModule, StepperModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { DialogMediumFormatDialogPageComponent } from './dialog-medium-format-dialog-page.component';
import { DialogMediumFormatPageRoutingModule } from './dialog-medium-format-page-routing.module';

@NgModule({
  declarations: [DialogMediumFormatDialogPageComponent],
  imports: [
    CommonModule,
    DialogMediumFormatPageRoutingModule,
    StepperModule,
    DrawerModule,
    TabsModule,
    DialogModule,
    SectionModule,
    PrismModule,
    CardModule
  ]
})
export class DialogMediumFormatPageModule {}
