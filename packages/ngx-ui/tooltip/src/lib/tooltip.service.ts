import { Injectable, Type } from '@angular/core';
import {
  InjectionRegistryService,
  InjectionService,
} from '@swimlane/ngx-ui/common';
import { TooltipContentComponent } from './tooltip-content/tooltip-content.component';

@Injectable({ providedIn: 'root' })
export class TooltipService extends InjectionRegistryService<TooltipContentComponent> {
  type: Type<TooltipContentComponent> = TooltipContentComponent;

  constructor(injectionService: InjectionService) {
    super(injectionService);
  }
}
