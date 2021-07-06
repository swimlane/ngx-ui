import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { TooltipContentComponent } from './tooltip-content/tooltip-content.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule],
  providers: [InjectionService],
  declarations: [TooltipDirective, TooltipContentComponent],
  exports: [TooltipDirective, TooltipContentComponent],
})
export class TooltipModule {}
