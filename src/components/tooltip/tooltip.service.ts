import { Injectable } from '@angular/core';
import { InjectionRegisteryService, InjectionService } from '../../services';
import { TooltipContentComponent } from '.';

@Injectable()
export class TooltipService extends InjectionRegisteryService<TooltipContentComponent> {
  type: any = TooltipContentComponent;

  constructor(injectionService: InjectionService) {
    super(injectionService);
  }
}
