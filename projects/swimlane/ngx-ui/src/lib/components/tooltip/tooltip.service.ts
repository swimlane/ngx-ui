import { Injectable, Type } from '@angular/core';
import { InjectionService } from '../../services/injection.service';
import { InjectionRegisteryService } from '../../services/injection-registery.service';
import { TooltipContentComponent } from './tooltip.component';

@Injectable()
export class TooltipService extends InjectionRegisteryService<TooltipContentComponent> {
  type: Type<TooltipContentComponent> = TooltipContentComponent;

  constructor(injectionService: InjectionService) {
    super(injectionService);
  }
}
