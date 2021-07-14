import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { DialogComponent } from './dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent],
  exports: [DialogComponent],
  providers: [InjectionService],
})
export class DialogModule {}
