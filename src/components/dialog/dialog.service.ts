import { Injectable, ComponentRef } from '@angular/core';

import { InjectionService, RegistryService } from '../../utils';

import { OverlayService } from '../overlay';
import { DialogComponent } from './dialog.component';
import { DialogOptions } from './dialog-options';

@Injectable()
export class DialogService extends RegistryService {

  constructor(
    private injectionService: InjectionService,
    private overlayService: OverlayService) {
    super();
  }

  open(options: any) {
    const dialogOpts = new DialogOptions(options);

    let component = this.injectComponent(dialogOpts);
    this.register(dialogOpts.id, component);
    this.injectOverlay(dialogOpts);

    return component;
  }

  destroy(id: string) {
    super.destroy(id);

    if(!this.components.size) {
      this.overlayService.destroy();
    }
  }

  injectOverlay(options) {
    if(!options.showOverlay) return;

    this.overlayService.show();

    if(options.closeOnBlur) {
      const instance = this.overlayService.component.instance;

      let sub = instance.onClick.subscribe(() => {
        this.destroy(options.id);
      });
    }
  }

  injectComponent(options: any): ComponentRef<any> {
    return this.injectionService.appendNextToRoot(
      DialogComponent,
      DialogOptions,
      options);
  }

}
