import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { TooltipDirective } from './directives';
import { TooltipContentComponent } from './tooltip-content.component';

@NgModule({
  imports: [CommonModule],
  providers: [InjectionService],
  declarations: [TooltipDirective, TooltipContentComponent],
  exports: [TooltipDirective, TooltipContentComponent],
})
export class TooltipModule {}
