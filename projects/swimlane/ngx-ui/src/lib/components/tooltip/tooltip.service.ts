import { Injectable, Type } from '@angular/core';

import { InjectionService } from '../../services/injection/injection.service';
import { InjectionRegistryService } from '../../services/injection-registry/injection-registry.service';
import { TooltipContentComponent } from './tooltip.component';

@Injectable()
export class TooltipService extends InjectionRegistryService<TooltipContentComponent> {
  type: Type<TooltipContentComponent> = TooltipContentComponent;

  constructor(injectionService: InjectionService) {
    super(injectionService);
  }
}
