import { Injectable } from '@angular/core';
import {
  InjectionRegistryService,
  InjectionService,
} from '@swimlane/ngx-ui/injection';
import { TooltipContentComponent } from '../tooltip-content.component';

@Injectable()
export class TooltipService extends InjectionRegistryService<TooltipContentComponent> {
  type = TooltipContentComponent;

  constructor(injectionService: InjectionService) {
    super(injectionService);
  }
}
