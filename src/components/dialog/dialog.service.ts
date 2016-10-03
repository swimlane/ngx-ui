import { Injectable, ComponentRef } from '@angular/core';

import { InjectionService, RegistryService } from '../../utils';

import { DialogComponent } from './dialog.component';
import { DialogOptions } from './dialog-options';

@Injectable()
export class DialogService extends RegistryService {

  constructor(private injectionService: InjectionService) {
    super();
  }

  open(options: any) {
    let component = this.injectComponent(options);
    this.register(options.id, component);
    return component;
  }

  injectComponent(options: any): ComponentRef<any> {
    return this.injectionService.appendNextToRoot(
      DialogComponent,
      DialogOptions,
      new DialogOptions(options));
  }

}
