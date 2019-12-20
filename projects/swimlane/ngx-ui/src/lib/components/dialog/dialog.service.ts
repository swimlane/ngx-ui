import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { InjectionService } from '../../services/injection.service';
import { InjectionRegisteryService } from '../../services/injection-registery.service';

import { OverlayService } from '../overlay/overlay.service';
import { DialogComponent } from './dialog.component';
import { DialogOptions } from './dialog-options.interface';

@Injectable()
export class DialogService<T = DialogComponent> extends InjectionRegisteryService<T> {
  defaults = {
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

  create(options: DialogOptions) {
    const component = super.create(options);
    this.createSubscriptions(component);
    return component;
  }

  destroy(component: any): void {
    const hasOverlay = component.instance.showOverlay;
    this.zIndex = this.zIndex - 2;

    if (hasOverlay) {
      this.overlayService.removeTriggerComponent(component);
    }

    setTimeout(() => {
      super.destroy(component);
    });
  }

  createSubscriptions(triggerComponent: any): void {
    let closeSub: Subscription;
    let overlaySub: Subscription;

    const kill = (c: any) => {
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

  assignDefaults(options: DialogOptions): DialogOptions {
    options = super.assignDefaults(options);

    if (!options.zIndex) {
      this.zIndex = this.overlayService.instance ? this.overlayService.instance.zIndex + 3 : this.zIndex + 2;

      options.inputs.zIndex = this.zIndex;
    }

    return options;
  }
}
