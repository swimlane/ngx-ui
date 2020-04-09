import { Injectable, ComponentRef, Renderer2, RendererFactory2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { InjectionService } from '../../services/injection/injection.service';
import { InjectionRegistryService } from '../../services/injection-registry/injection-registry.service';
import { DrawerComponent } from './drawer.component';
import { OverlayService } from '../overlay/overlay.service';
import { DrawerDirection } from './drawer-direction.enum';
import { DrawerOptions } from './drawer-options.interface';

@Injectable()
export class DrawerService extends InjectionRegistryService<DrawerComponent> {
  type: any = DrawerComponent;

  readonly defaults: DrawerOptions = {
    inputs: {
      direction: DrawerDirection.Left,
    },
  };

  readonly renderer: Renderer2;
  private zIndex: number = 995;
  private size: number = 80;
  private parentListenerFunc: () => void;

  constructor(
    readonly injectionService: InjectionService,
    private readonly overlayService: OverlayService,
    private readonly rendererFactory: RendererFactory2
  ) {
    super(injectionService);
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  create(options: DrawerOptions) {
    const component = super.create(options);
    this.createSubscriptions(component, options.isRoot, options.parentContainer);
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

  createSubscriptions(component: ComponentRef<DrawerComponent>, isRoot = true, parentContainer?) {
    if (isRoot) {
      this.overlayService.show({
        triggerComponent: component,
        zIndex: this.zIndex,
      });
    }

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
      if (this.parentListenerFunc && this.components.get(this.type).length === 1) {
        this.parentListenerFunc();
      }
      this.destroy(component);
    };

    closeSub = component.instance.close.subscribe(kill.bind(this, component));
    if (component.instance.closeOnOutsideClick) {
      if (isRoot) {
        overlaySub = this.overlayService.click.subscribe(kill);
      } else {
        const components = this.components.get(this.type);

        this.parentListenerFunc = this.renderer.listen(parentContainer, 'click', (evt) => {
          /* istanbul ignore else */
          if (evt.target === parentContainer) {
            kill(components[components.length - 1]);
          }
        });
      }
    }
  }
}
