import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef, EmbeddedViewRef, Type } from '@angular/core';
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
var /**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
InjectionService = /** @class */ (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    /**
       * Gets the root view container to inject the component to.
       *
       * @returns {ComponentRef<any>}
       *
       * @memberOf InjectionService
       */
    InjectionService.prototype.getRootViewContainer = /**
       * Gets the root view container to inject the component to.
       *
       * @returns {ComponentRef<any>}
       *
       * @memberOf InjectionService
       */
    function () {
        if (this._container)
            return this._container;
        if (this.applicationRef.components.length)
            return this.applicationRef.components[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param {any} container
     *
     * @memberOf InjectionService
     */
    /**
       * Overrides the default root view container. This is useful for
       * things like ngUpgrade that doesn't have a ApplicationRef root.
       *
       * @param {any} container
       *
       * @memberOf InjectionService
       */
    InjectionService.prototype.setRootViewContainer = /**
       * Overrides the default root view container. This is useful for
       * things like ngUpgrade that doesn't have a ApplicationRef root.
       *
       * @param {any} container
       *
       * @memberOf InjectionService
       */
    function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    /**
       * Gets the html element for a component ref.
       *
       * @param {ComponentRef<any>} componentRef
       * @returns {HTMLElement}
       *
       * @memberOf InjectionService
       */
    InjectionService.prototype.getComponentRootNode = /**
       * Gets the html element for a component ref.
       *
       * @param {ComponentRef<any>} componentRef
       * @returns {HTMLElement}
       *
       * @memberOf InjectionService
       */
    function (componentRef) {
        // the top most component root node has no `hostView`
        if (!componentRef.hostView)
            return componentRef.element.nativeElement;
        return componentRef.hostView.rootNodes[0];
    };
    /**
     * Gets the root component container html element.
     *
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    /**
       * Gets the root component container html element.
       *
       * @returns {HTMLElement}
       *
       * @memberOf InjectionService
       */
    InjectionService.prototype.getRootViewContainerNode = /**
       * Gets the root component container html element.
       *
       * @returns {HTMLElement}
       *
       * @memberOf InjectionService
       */
    function (componentRef) {
        return this.getComponentRootNode(componentRef);
    };
    /**
     * Projects the bindings onto the component
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    /**
       * Projects the bindings onto the component
       *
       * @param {ComponentRef<any>} component
       * @param {*} options
       * @returns {ComponentRef<any>}
       *
       * @memberOf InjectionService
       */
    InjectionService.prototype.projectComponentBindings = /**
       * Projects the bindings onto the component
       *
       * @param {ComponentRef<any>} component
       * @param {*} options
       * @returns {ComponentRef<any>}
       *
       * @memberOf InjectionService
       */
    function (component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (var _i = 0, bindingKeys_1 = bindingKeys; _i < bindingKeys_1.length; _i++) {
                    var bindingName = bindingKeys_1[_i];
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (var _a = 0, eventKeys_1 = eventKeys; _a < eventKeys_1.length; _a++) {
                    var eventName = eventKeys_1[_a];
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    };
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
    InjectionService.prototype.appendComponent = /**
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
    function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var componentRef = componentFactory.create(this.injector);
        var appRef = this.applicationRef;
        var componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentBindings(componentRef, bindings);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            appRef.detachView(componentRef.hostView);
        });
        // location override not passed, get `this._container`
        if (!location)
            location = this.getRootViewContainer();
        var appendLocation = this.getComponentRootNode(location);
        appendLocation.appendChild(componentRootNode);
        return componentRef;
    };
    return InjectionService;
}());
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
export { InjectionService };
//# sourceMappingURL=injection.service.js.map