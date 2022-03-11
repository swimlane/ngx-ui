import { Injectable, ComponentRef, Renderer2, RendererFactory2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { InjectionService } from '../../services/injection/injection.service';
import { InjectionRegistryService } from '../../services/injection-registry/injection-registry.service';
import { DrawerComponent } from './drawer.component';
import { OverlayService } from '../overlay/overlay.service';
import { DrawerDirection } from './drawer-direction.enum';
import { DrawerOptions } from './drawer-options.interface';

@Injectable({
  providedIn: 'root'
})
export class DrawerService extends InjectionRegistryService<DrawerComponent> {
  type: any = DrawerComponent;

  readonly defaults: DrawerOptions = {
    inputs: {
      direction: DrawerDirection.Left
    }
  };

  readonly renderer: Renderer2;
  private zIndex = 995;
  private size = 80;
  private parentListenerFunc: () => void;

  constructor(
    readonly injectionService: InjectionService,
    private readonly overlayService: OverlayService,
    private readonly rendererFactory: RendererFactory2
  ) {
    super(injectionService);
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  create(options: Partial<DrawerOptions>) {
    options.isRoot ??= !options.parentContainer;
    options.showOverlay ??= options.isRoot;

    const component = super.create(options);
    this.createSubscriptions(component, options);
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

  protected assignDefaults(options: Partial<DrawerOptions>): any {
    options = super.assignDefaults(options);

    options.isRoot ??= !options.parentContainer;
    options.showOverlay ??= options.isRoot;
    options.fullscreenOverlay ??= options.isRoot;

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

  private createSubscriptions(component: ComponentRef<DrawerComponent>, options: DrawerOptions) {
    if (options.showOverlay) {
      this.overlayService.show({
        location: options.isRoot ? undefined : options.parentContainer,
        fullscreen: options.fullscreenOverlay,
        triggerComponent: component,
        zIndex: this.zIndex
      });
    }

    // eslint-disable-next-line prefer-const
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
      if (options.showOverlay) {
        overlaySub = this.overlayService.click.subscribe(kill);
      } else if (options.parentContainer) {
        const components = this.components.get(this.type);

        this.parentListenerFunc = this.renderer.listen(options.parentContainer, 'click', evt => {
          /* istanbul ignore else */
          if (evt.target === options.parentContainer) {
            kill(components[components.length - 1]);
          }
        });
      }
    }
  }
}
