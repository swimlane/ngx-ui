import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InjectionRegistryService } from '../../services/injection-registry/injection-registry.service';

import { InjectionService } from '../../services/injection/injection.service';
import { OverlayService } from '../overlay/overlay.service';
import { DialogFormat } from './dialog-format.enum';
import { DialogOptions } from './dialog-options.interface';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService<T = DialogComponent> extends InjectionRegistryService<T> {
  readonly defaults: DialogOptions = {
    format: DialogFormat.Regular,
    inputs: {
      zIndex: 991,
      closeOnBlur: true,
      closeOnEscape: true,
      closeButton: true,
      showOverlay: true,
      visible: true
    }
  };

  protected type: any = DialogComponent;
  private zIndex = 995;

  constructor(readonly injectionService: InjectionService, readonly overlayService: OverlayService) {
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
    // eslint-disable-next-line prefer-const
    let closeSub: Subscription;
    let overlaySub: Subscription;

    const kill = (c: any) => {
      /* istanbul ignore if */
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
          overlaySub = this.overlayService.click.pipe(filter(() => triggerComponent.instance.canClose)).subscribe(kill);
        }
      });
    }
  }

  assignDefaults(options: DialogOptions): DialogOptions {
    options = super.assignDefaults(options);

    /* istanbul ignore else */
    if (!options.zIndex) {
      this.zIndex = this.overlayService.instance ? this.overlayService.instance.zIndex + 3 : this.zIndex + 2;

      options.inputs.zIndex = this.zIndex;
    }

    return options;
  }
}
