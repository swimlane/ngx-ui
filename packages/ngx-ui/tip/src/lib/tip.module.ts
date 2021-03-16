import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { TipComponent } from './tip.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [TipComponent],
  exports: [TipComponent],
})
export class TipModule {}
