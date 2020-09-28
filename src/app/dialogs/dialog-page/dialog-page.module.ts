import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogPageRoutingModule } from './dialog-page-routing.module';
import { DialogModule, SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { DialogPageComponent } from './dialog-page.component';

@NgModule({
  declarations: [DialogPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, DialogModule, TabsModule, DialogPageRoutingModule]
})
export class DialogPageModule {}
