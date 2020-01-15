import { Injectable, ComponentRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { InjectionRegistryService, InjectionService } from '../../services';
import { DrawerComponent } from './drawer.component';
import { OverlayService } from '../overlay/overlay.service';
import { DrawerDirection } from './drawer-direction.enum';
import { DrawerOptions } from './drawer-options.interface';

@Injectable()
export class DrawerService extends InjectionRegistryService<DrawerComponent> {
  type: any = DrawerComponent;

  readonly defaults: DrawerOptions = {
    inputs: {
      direction: DrawerDirection.Left
    }
  };

  private zIndex: number = 995;
  private size: number = 80;

  constructor(readonly injectionService: InjectionService, private readonly overlayService: OverlayService) {
    super(injectionService);
  }

  create(options: DrawerOptions) {
    const component = super.create(options);
    this.createSubscriptions(component);
    return component;
  }

  destroy(component: ComponentRef<DrawerComponent>): void {
    // race case clicking fast errors here
    if (component && component.instance) {
      component.instance.size = 0;
    }

    setTimeout(() => {
      this.zIndex = this.zIndex - 2;
      this.size = this.size + 10;
      this.overlayService.removeTriggerComponent(component);
      super.destroy(component);
    }, 10);
  }

  assignDefaults(options: DrawerOptions): any {
    options = super.assignDefaults(options);

    if (!options.inputs.zIndex) {
      this.zIndex = this.overlayService.instance
        ? this.overlayService.instance.zIndex + 3
        : /* istanbul ignore next */ this.zIndex + 2;
      options.inputs.zIndex = this.zIndex;
    }

    this.size = this.size - 10;
    if (!options.inputs.size) {
      options.inputs.size = this.size;
    }

    return options;
  }

  createSubscriptions(component: ComponentRef<DrawerComponent>) {
    this.overlayService.show({
      triggerComponent: component,
      zIndex: this.zIndex
    });

    let closeSub: Subscription;
    let overlaySub: Subscription;

    const kill = (c: ComponentRef<DrawerComponent>) => {
      /* istanbul ignore if */
      if (component !== c) {
        return;
      }

      closeSub.unsubscribe();
      if (overlaySub) {
        overlaySub.unsubscribe();
      }
      this.destroy(component);
    };

    closeSub = component.instance.close.subscribe(kill.bind(this, component));
    if (component.instance.closeOnOutsideClick) {
      overlaySub = this.overlayService.click.subscribe(kill);
    }
  }
}
