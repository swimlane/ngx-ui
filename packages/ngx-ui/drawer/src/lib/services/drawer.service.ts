import {
  ComponentRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import {
  InjectionRegistryService,
  InjectionService,
} from '@swimlane/ngx-ui/common';
import { OverlayService } from '@swimlane/ngx-ui/overlay';
import { Subscription, timer } from 'rxjs';
import { DrawerComponent } from '../drawer.component';
import { DrawerDirection } from '../enums';
import { DrawerOptions } from '../models';

@Injectable({ providedIn: 'root' })
export class DrawerService extends InjectionRegistryService<DrawerComponent> {
  type = DrawerComponent;

  readonly defaults: DrawerOptions = {
    inputs: {
      direction: DrawerDirection.left,
    },
  };

  readonly renderer: Renderer2;
  private zIndex = 995;
  private size = 80;
  private parentListenerFunc?: () => void;

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
    this.createSubscriptions(
      component,
      options.isRoot,
      options.parentContainer
    );
    return component;
  }

  destroy(component: ComponentRef<DrawerComponent>): void {
    // race case clicking fast errors here
    if (component && component.instance) {
      component.instance.size = 0;
    }

    timer(10).subscribe(() => {
      this.zIndex = this.zIndex - 2;
      this.size = this.size + 10;
      this.overlayService.removeTriggerComponent(component);
      super.destroy(component);
    });
  }

  assignDefaults(options: DrawerOptions): DrawerOptions {
    options = super.assignDefaults(options);

    if (options.inputs) {
      if (!options.inputs.zIndex) {
        this.zIndex = this.overlayService.instance
          ? this.overlayService.instance.zIndex + 3
          : this.zIndex + 2;
        options.inputs.zIndex = this.zIndex;
      }

      this.size = this.size - 10;
      if (!options.inputs.size) {
        options.inputs.size = this.size;
      }
    }

    return options;
  }

  createSubscriptions(
    component: ComponentRef<DrawerComponent>,
    isRoot = true,
    parentContainer?: unknown
  ) {
    if (isRoot) {
      this.overlayService.show({
        triggerComponent: component,
        zIndex: this.zIndex,
      });
    }

    let closeSub: Subscription | null = null;
    let overlaySub: Subscription;

    const kill = (c: ComponentRef<unknown>) => {
      if (component !== c) {
        return;
      }

      if (closeSub) {
        closeSub.unsubscribe();
      }

      if (overlaySub) {
        overlaySub.unsubscribe();
      }
      if (
        this.parentListenerFunc &&
        this.components.get(this.type)?.length === 1
      ) {
        this.parentListenerFunc();
      }
      this.destroy(component);
    };

    closeSub = component.instance.drawerClose.subscribe(
      kill.bind(this, component)
    );
    if (component.instance.closeOnOutsideClick) {
      if (isRoot) {
        overlaySub = this.overlayService.click$.subscribe(kill);
      } else {
        const components = this.components.get(this.type);

        this.parentListenerFunc = this.renderer.listen(
          parentContainer,
          'click',
          (evt) => {
            if (evt.target === parentContainer && components?.length) {
              kill(components[components.length - 1]);
            }
          }
        );
      }
    }
  }
}
