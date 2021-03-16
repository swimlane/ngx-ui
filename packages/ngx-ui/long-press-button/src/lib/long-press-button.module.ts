import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LongPressModule } from '@swimlane/ngx-ui/directives/long-press';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { LongPressButtonComponent } from './long-press-button.component';

@NgModule({
  imports: [CommonModule, LongPressModule, IconModule],
  declarations: [LongPressButtonComponent],
  exports: [LongPressButtonComponent],
})
export class LongPressButtonModule {}
