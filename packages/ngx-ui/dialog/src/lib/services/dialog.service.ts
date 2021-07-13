import { ComponentRef, Injectable, Type } from '@angular/core';
import {
  InjectionRegistryService,
  InjectionService,
} from '@swimlane/ngx-ui/common';
import { OverlayService } from '@swimlane/ngx-ui/overlay';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../dialog.component';
import { DialogFormat } from '../enums';
import { DialogOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DialogService<
  TDialog extends DialogComponent = DialogComponent
> extends InjectionRegistryService<TDialog> {
  readonly defaults: DialogOptions = {
    format: DialogFormat.regular,
    inputs: {
      zIndex: 991,
      closeOnBlur: true,
      closeOnEscape: true,
      closeButton: true,
      showOverlay: true,
      visible: true,
    },
  };

  protected type = DialogComponent as unknown as Type<TDialog>;
  private zIndex = 995;

  constructor(
    readonly injectionService: InjectionService,
    private readonly overlayService: OverlayService
  ) {
    super(injectionService);
  }

  create(options: DialogOptions) {
    const component = super.create(options);
    this.createSubscriptions(component);
    return component;
  }

  destroy(component: ComponentRef<TDialog>): void {
    const hasOverlay = (component.instance as Record<string, unknown>)
      .showOverlay;
    this.zIndex = this.zIndex - 2;

    if (hasOverlay) {
      this.overlayService.removeTriggerComponent(component);
    }

    setTimeout(() => {
      super.destroy(component);
    });
  }

  createSubscriptions(triggerComponent: ComponentRef<TDialog>): void {
    let closeSub = null as Subscription | null;
    let overlaySub!: Subscription;

    const kill = (c: ComponentRef<unknown>) => {
      if (c !== triggerComponent) {
        return;
      }

      if (closeSub) closeSub.unsubscribe();
      if (overlaySub) overlaySub.unsubscribe();
      this.destroy(triggerComponent);
    };

    closeSub = triggerComponent.instance.dialogClose.subscribe(
      kill.bind(this, triggerComponent)
    );
    const zIndex = this.zIndex;

    if ((triggerComponent.instance as Record<string, unknown>).showOverlay) {
      queueForNextRender(() => {
        this.overlayService.show({
          triggerComponent,
          zIndex,
        });
        if (triggerComponent.instance.closeOnBlur) {
          overlaySub = this.overlayService.click$.subscribe(kill);
        }
      });
    }
  }

  assignDefaults(options: DialogOptions): DialogOptions {
    options = super.assignDefaults(options);

    if (!options.zIndex) {
      this.zIndex = this.overlayService.instance
        ? this.overlayService.instance.zIndex + 3
        : this.zIndex + 2;

      if (options.inputs) {
        options.inputs.zIndex = this.zIndex;
      }
    }

    return options;
  }
}
