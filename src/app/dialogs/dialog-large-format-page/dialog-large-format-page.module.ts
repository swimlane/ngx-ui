import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule, DrawerModule, SectionModule, StepperModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';
import { DialogLargeFormatDialogPageComponent } from './dialog-large-format-dialog-page.component';
import { DialogLargeFormatPageRoutingModule } from './dialog-large-format-page-routing.module';

@NgModule({
  declarations: [DialogLargeFormatDialogPageComponent],
  imports: [
    CommonModule,
    DialogLargeFormatPageRoutingModule,
    StepperModule,
    DrawerModule,
    TabsModule,
    DialogModule,
    SectionModule,
    PrismModule
  ]
})
export class DialogLargeFormatPageModule {}
