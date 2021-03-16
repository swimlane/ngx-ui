import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { InputModule } from '@swimlane/ngx-ui/input';
import { LongPressButtonModule } from '@swimlane/ngx-ui/long-press-button';
import { OverlayModule } from '@swimlane/ngx-ui/overlay';
import { AlertComponent } from './alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
  imports: [CommonModule, InputModule, FormsModule, LongPressButtonModule, OverlayModule],
  providers: [AlertService, InjectionService],
  declarations: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule {}
