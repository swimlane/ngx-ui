import { Injectable, EventEmitter } from '@angular/core';

import { InjectionService, InjectionRegisteryService } from '../../services';

import { OverlayService } from '../overlay';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService extends InjectionRegisteryService {

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

  zIndex: number = 995;
  type: any = DialogComponent;

  constructor(
    injectionService: InjectionService,
    private overlayService: OverlayService) {
    super(injectionService);
  }

  create(bindings): any {
    const component = super.create(bindings);
    this.createSubscriptions(component);
    return component;
  }

  destroy(component): void {
    const hasOverlay = component.instance.showOverlay;

    setTimeout(() => {
      if(hasOverlay) {
        this.overlayService.removeTriggerComponent(component);
      }

      super.destroy(component);
      this.zIndex = this.zIndex - 2;
    });
  }

  createSubscriptions(component): any {
    let closeSub;
    let overlaySub;

    const kill = (c) => {
      if (c !== component) {
        return;
      }

      closeSub.unsubscribe();
      if(overlaySub) overlaySub.unsubscribe();
      this.destroy(component);
    };

    closeSub = component.instance.close.subscribe(kill.bind(this, component));

    if(component.instance.showOverlay) {
      const overlay = this.overlayService.show({
        triggerComponent: component,
        zIndex: this.zIndex
      });
      if(component.instance.closeOnBlur) {
        overlaySub = this.overlayService.click.subscribe(kill);
      }
    }
  }

  assignDefaults(bindings): any {
    bindings = super.assignDefaults(bindings);

    if(!bindings.zIndex) {
      this.zIndex = (this.overlayService.instance) ?
        this.overlayService.instance.zIndex + 3 :
        this.zIndex + 2;

      bindings.inputs.zIndex = this.zIndex;
    }

    return bindings;
  }

}
