import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';

import { InjectionService } from '../../services/injection/injection.service';

@NgModule({
  declarations: [TooltipContentComponent, TooltipDirective],
  providers: [InjectionService],
  exports: [TooltipContentComponent, TooltipDirective],
  imports: [CommonModule]
})
export class TooltipModule {}
