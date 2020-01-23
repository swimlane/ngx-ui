import { Injectable, Type } from '@angular/core';

import { InjectionRegistryService, InjectionService } from '../../services';
import { TooltipContentComponent } from './tooltip.component';

@Injectable()
export class TooltipService extends InjectionRegistryService<TooltipContentComponent> {
  type: Type<TooltipContentComponent> = TooltipContentComponent;

  constructor(injectionService: InjectionService) {
    super(injectionService);
  }
}
