import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@swimlane/ngx-ui';

import { TipComponent } from './tip.component';

@NgModule({
  imports: [CommonModule, IconModule],
  exports: [TipComponent],
  declarations: [TipComponent]
})
export class TipModule {}
