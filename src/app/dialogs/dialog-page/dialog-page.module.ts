import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DialogModule, SectionModule, TabsModule, InputModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { DialogPageRoutingModule } from './dialog-page-routing.module';
import { DialogPageComponent } from './dialog-page.component';

@NgModule({
  declarations: [DialogPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    InputModule,
    SectionModule,
    DialogModule,
    TabsModule,
    DialogPageRoutingModule
  ]
})
export class DialogPageModule {}
