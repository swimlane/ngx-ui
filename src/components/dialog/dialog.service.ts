import { Injectable, EventEmitter } from '@angular/core';

import { InjectionService, InjectionRegistery } from '../../services';

import { OverlayService } from '../overlay';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService extends InjectionRegistery {

  type: any = DialogComponent;
  
  defaults: any = {
    inputs: {
      zIndex: 991,
      closeOnBlur: true,
      closeOnEscape: true,
      closeButton: true,
      showOverlay: true,
      visible: true
    }
  };

  private closeSubscription;

  constructor(
    injectionService: InjectionService,
    private overlayService: OverlayService) {
    super(injectionService);
  }

  create(bindings): any {
    const component = super.create(bindings);
    const { instance } = component;

    this.closeSubscription = instance.close.subscribe(() => {
      this.destroy(component);
    });

    if(instance.showOverlay) {
      this.overlayService.show();

      if(instance.closeOnBlur) {
        let overlayListener = this.overlayService.instance.click.subscribe(() => {
          this.destroy(component);
        });
      }
    }

    return component;
  }

  destroy(instance) {
    super.destroy(instance);
    this.overlayService.destroy();
  }

}
