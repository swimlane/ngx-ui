import { ComponentRef, Type } from '@angular/core';
import { InjectionService } from '.';
export interface PartialBindings {
    inputs?: object;
    outputs?: object;
}
export declare abstract class InjectionRegisteryService<T = any> {
    protected injectionService: InjectionService;
    protected abstract type: Type<T>;
    protected defaults: PartialBindings;
    protected components: Map<any, Array<ComponentRef<T>>>;
    constructor(injectionService: InjectionService);
    getByType(type?: Type<T>): ComponentRef<T>[];
    create(bindings: object): ComponentRef<T>;
    createByType(type: Type<T>, bindings: PartialBindings): ComponentRef<T>;
    destroy(instance: ComponentRef<T>): void;
    destroyAll(): void;
    destroyByType(type: Type<T>): void;
    protected injectComponent(type: Type<T>, bindings: PartialBindings): ComponentRef<T>;
    protected assignDefaults(bindings: PartialBindings): PartialBindings;
    protected register(type: Type<T>, component: ComponentRef<T>): void;
}
