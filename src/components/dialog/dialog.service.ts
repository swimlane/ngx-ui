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

    if(dialogOpts.showOverlay) {
      this.overlayService.show();
    }

    const component = this.injectComponent(dialogOpts);
    const listeners = this.setupListeners(dialogOpts, component);

    this.register(dialogOpts.id, component, () => {
      listeners.forEach(l => l.unsubscribe());
    });

    return component;
  }

  destroy(id: string) {
    let comp = this.get(id);
    comp.instance.visible = false;
    if(this.components.size <= 1) {
      this.overlayService.destroy();
    }

    // destroy is called like this to trigger
    // proper lifecycle events like animations
    setTimeout(() => super.destroy(id), 200);
  }

  injectComponent(options: any): ComponentRef<any> {
    return this.injectionService.appendNextToRoot(
      DialogComponent,
      DialogOptions,
      options);
  }

  setupListeners(options, component) {
    // return listeners for cleanup
    let listeners = [];

    // mouse clicked outside
    if(options.closeOnBlur) {
      const overlayInstance = this.overlayService.component.instance;
      let overlayListener = overlayInstance.onClick.subscribe(() => {
        this.destroy(options.id);
      });

      listeners.push(overlayListener);
    }

    const dialogListener = component.instance.onClose.subscribe(() => {
      this.destroy(options.id);
    });

    listeners.push(dialogListener);

    return listeners;
  }

}
