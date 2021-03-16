import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { DialogPageRoutingModule } from './dialog-page-routing.module';
import { DialogPageComponent } from './dialog-page.component';

@NgModule({
  declarations: [DialogPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, DialogModule, TabsModule, DialogPageRoutingModule]
})
export class DialogPageModule {}
