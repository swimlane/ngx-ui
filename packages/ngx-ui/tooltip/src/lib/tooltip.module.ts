import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { TooltipDirective } from './directives';
import { TooltipService } from './services';
import { TooltipContentComponent } from './tooltip-content.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective, TooltipContentComponent],
  providers: [InjectionService, TooltipService],
  exports: [TooltipDirective, TooltipContentComponent],
})
export class TooltipModule {}
