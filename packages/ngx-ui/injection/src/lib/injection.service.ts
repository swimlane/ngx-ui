import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef
} from '@angular/core';
import type { PartialBindings } from './models';

export function isViewContainerRef(x: ViewContainerRef | ComponentRef<unknown>): x is ViewContainerRef {
  return 'element' in x;
}

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
@Injectable()
export class InjectionService {
  static globalRootViewContainer: ViewContainerRef | null = null;
  private _container?: ViewContainerRef;

  /**
   * Sets a default global root view container. This is useful for
   * things like ngUpgrade that doesn't have a ApplicationRef root.
   *
   * @param container
   * @dynamic
   */
  static setGlobalRootViewContainer(container: ViewContainerRef): void {
    InjectionService.globalRootViewContainer = container;
  }

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  /**
   * Gets the root view container to inject the component to.
   *
   * @memberOf InjectionService
   */
  getRootViewContainer(): ViewContainerRef | ComponentRef<unknown> {
    if (this._container) return this._container;
    if (InjectionService.globalRootViewContainer) return InjectionService.globalRootViewContainer;

    if (this.applicationRef.components.length) return this.applicationRef.components[0];

    throw new Error(
      'View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.'
    );
  }

  /**
   * Overrides the default root view container. This is useful for
   * things like ngUpgrade that doesn't have a ApplicationRef root.
   *
   * @param container
   *
   * @memberOf InjectionService
   */
  setRootViewContainer(container: ViewContainerRef): void {
    this._container = container;
  }

  /**
   * Gets the html element for a component ref.
   *
   *
   * @memberOf InjectionService
   * @param component
   */
  getComponentRootNode(component: ViewContainerRef | ComponentRef<unknown>): HTMLElement {
    if (isViewContainerRef(component)) {
      return component.element.nativeElement;
    }

    if (component.hostView && (component.hostView as EmbeddedViewRef<unknown>).rootNodes.length > 0) {
      return (component.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
    }

    // the top most component root node has no `hostView`
    return component.location.nativeElement;
  }

  /**
   * Gets the root component container html element.
   *
   * @memberOf InjectionService
   */
  getRootViewContainerNode(component: ViewContainerRef | ComponentRef<unknown>): HTMLElement {
    return this.getComponentRootNode(component);
  }

  /**
   * Projects the bindings onto the component
   *
   * @param component
   * @param bindings
   *
   * @memberOf InjectionService
   */
  projectComponentBindings(component: ComponentRef<unknown>, bindings: PartialBindings): ComponentRef<unknown> {
    if (bindings) {
      if (bindings.inputs !== undefined) {
        const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
        for (const bindingName of bindingKeys) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (component.instance as any)[bindingName] = bindings.inputs[bindingName];
        }
      }

      if (bindings.outputs !== undefined) {
        const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
        for (const eventName of eventKeys) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (component.instance as any)[eventName] = bindings.outputs[eventName];
        }
      }
    }

    return component;
  }

  /**
   * Appends a component to an adjacent location
   *
   * @param componentClass
   * @param bindings
   * @param [location]
   *
   * @memberOf InjectionService
   */
  appendComponent<T>(
    componentClass: Type<T>,
    bindings: PartialBindings = {},
    location?: HTMLElement | ViewContainerRef | ComponentRef<unknown>
  ): ComponentRef<T> {
    if (!location) location = this.getRootViewContainer();

    const appendLocation =
      bindings.inputs && bindings.inputs.isRoot === false
        ? location
        : this.getComponentRootNode(location as ViewContainerRef | ComponentRef<unknown>);

    const portalHost = new DomPortalOutlet(
      appendLocation as HTMLElement,
      this.componentFactoryResolver,
      this.applicationRef,
      this.injector
    );

    const portal = new ComponentPortal(componentClass);

    const componentRef = portalHost.attach(portal);
    this.projectComponentBindings(componentRef, bindings);
    return componentRef;
  }
}
