import { Injectable, EventEmitter, ComponentRef } from '@angular/core';

import { InjectionService } from '../../services/injection.service';
import { InjectionRegisteryService } from '../../services/injection-registery.service';

import { OverlayService } from '../overlay/overlay.service';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService<T = DialogComponent> extends InjectionRegisteryService<T> {
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

  constructor(injectionService: InjectionService, private overlayService: OverlayService) {
    super(injectionService);
  }

  create(bindings) {
    const component = super.create(bindings);
    this.createSubscriptions(component);
    return component;
  }

  destroy(component): void {
    const hasOverlay = component.instance.showOverlay;
    this.zIndex = this.zIndex - 2;
    if (hasOverlay) {
      this.overlayService.removeTriggerComponent(component);
    }
    setTimeout(() => {
      super.destroy(component);
    });
  }

  createSubscriptions(triggerComponent): any {
    let closeSub;
    let overlaySub;

    const kill = c => {
      if (c !== triggerComponent) {
        return;
      }

      closeSub.unsubscribe();
      if (overlaySub) overlaySub.unsubscribe();
      this.destroy(triggerComponent);
    };

    closeSub = triggerComponent.instance.close.subscribe(kill.bind(this, triggerComponent));
    const zIndex = this.zIndex;

    if (triggerComponent.instance.showOverlay) {
      setTimeout(() => {
        this.overlayService.show({
          triggerComponent,
          zIndex
        });
        if (triggerComponent.instance.closeOnBlur) {
          overlaySub = this.overlayService.click.subscribe(kill);
        }
      });
    }
  }

  assignDefaults(bindings): any {
    bindings = super.assignDefaults(bindings);

    if (!bindings.zIndex) {
      this.zIndex = this.overlayService.instance ? this.overlayService.instance.zIndex + 3 : this.zIndex + 2;

      bindings.inputs.zIndex = this.zIndex;
    }

    return bindings;
  }
}
