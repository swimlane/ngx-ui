import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, ViewContainerRef, ResolvedReflectiveProvider, Type } from '@angular/core';
export declare class InjectionService {
    private applicationRef;
    private componentFactoryResolver;
    private injector;
    constructor(applicationRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    getDocument(): any;
    getRootViewContainerRef(): ViewContainerRef;
    appendNextToLocation<T>(ComponentClass: Type<T>, location: ViewContainerRef, providers?: ResolvedReflectiveProvider[]): ComponentRef<T>;
    appendNextToRoot<T>(ComponentClass: Type<T>, ComponentOptionsClass: any, options: any): ComponentRef<T>;
}
