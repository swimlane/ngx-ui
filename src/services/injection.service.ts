import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
  Injector, ViewContainerRef, EmbeddedViewRef, Type
} from '@angular/core';

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
@Injectable()
export class InjectionService {

  private _container: ComponentRef<any>;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  /**
   * Gets the root view container to inject the component to.
   *
   * @returns {ComponentRef<any>}
   *
   * @memberOf InjectionService
   */
  getRootViewContainer(): ComponentRef<any> {
    if(this._container) return this._container;

    if (this.applicationRef.components.length) return this.applicationRef.components[0];

    throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
  }

  /**
   * Overrides the default root view container. This is useful for
   * things like ngUpgrade that doesn't have a ApplicationRef root.
   *
   * @param {any} container
   *
   * @memberOf InjectionService
   */
  setRootViewContainer(container): void {
    this._container = container;
  }

  /**
   * Gets the html element for a component ref.
   *
   * @param {ComponentRef<any>} componentRef
   * @returns {HTMLElement}
   *
   * @memberOf InjectionService
   */
  getComponentRootNode(componentRef: any): HTMLElement {
    // the top most component root node has no `hostView`
    if(!componentRef.hostView) return componentRef.element.nativeElement;

    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * Gets the root component container html element.
   *
   * @returns {HTMLElement}
   *
   * @memberOf InjectionService
   */
  getRootViewContainerNode(componentRef): HTMLElement {
    return this.getComponentRootNode(componentRef);
  }

  /**
   * Projects the bindings onto the component
   *
   * @param {ComponentRef<any>} component
   * @param {*} options
   * @returns {ComponentRef<any>}
   *
   * @memberOf InjectionService
   */
  projectComponentBindings(component: ComponentRef<any>, bindings: any): ComponentRef<any> {
    if(bindings) {
      if (bindings.inputs !== undefined) {
        const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
        for (const bindingName of bindingKeys) {
          component.instance[bindingName] = bindings.inputs[bindingName];
        }
      }

      if (bindings.outputs !== undefined) {
        const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
        for (const eventName of eventKeys) {
          component.instance[eventName] = bindings.outputs[eventName];
        }
      }
    }

    return component;
  }

  /**
   * Appends a component to a adjacent location
   *
   * @template T
   * @param {Type<T>} componentClass
   * @param {*} [options={}]
   * @param {Element} [location]
   * @returns {ComponentRef<any>}
   *
   * @memberOf InjectionService
   */
  appendComponent<T>(
    componentClass: Type<T>,
    bindings: any = {},
    location?: any): ComponentRef<any> {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const componentRef = componentFactory.create(this.injector);
    const appRef: any = this.applicationRef;
    const componentRootNode = this.getComponentRootNode(componentRef);

    // project the options passed to the component instance
    this.projectComponentBindings(componentRef, bindings);

    appRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      appRef.detachView(componentRef.hostView);
    });

    // location override not passed, get `this._container`
    if(!location) location = this.getRootViewContainer();

    const appendLocation = this.getComponentRootNode(location);
    appendLocation.appendChild(componentRootNode);

    return componentRef;
  }

}
