import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, ViewContainerRef, Type } from '@angular/core';
export declare class InjectionService {
    private applicationRef;
    private componentFactoryResolver;
    private injector;
    constructor(applicationRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    getRootViewContainerRef(): ViewContainerRef;
    appendNextToLocation<T>(componentClass: Type<T>, location: ViewContainerRef, options?: any): ComponentRef<T>;
    appendNextToRoot<T>(componentClass: Type<T>, options?: any): ComponentRef<T>;
    projectComponentInputs(component: any, options: any): any;
}
