import { ComponentRef, Type } from '@angular/core';

import { InjectionService } from '../injection/injection.service';
import { PartialBindings } from './partial-bindings.interface';

/* istanbul ignore next */
export abstract class InjectionRegistryService<T = any> {
  protected abstract type: Type<T>;

  protected defaults: PartialBindings = {};
  protected components = new Map<any, Array<ComponentRef<T>>>();

  constructor(protected readonly injectionService: InjectionService) {}

  getByType(type: Type<T> = this.type) {
    return this.components.get(type);
  }

  create(bindings: object): ComponentRef<T> {
    return this.createByType(this.type, bindings);
  }

  createByType(type: Type<T>, bindings: PartialBindings): ComponentRef<T> {
    const location = (bindings as any).parentContainer;
    bindings = this.assignDefaults(bindings);

    const component = this.injectComponent(type, bindings, location);
    this.register(type, component);

    return component;
  }

  destroy(instance: ComponentRef<T>): void {
    const compsByType = this.components.get(instance.componentType);

    if (compsByType && compsByType.length) {
      const idx = compsByType.indexOf(instance);

      if (idx > -1) {
        const component = compsByType[idx];
        component.destroy();
        compsByType.splice(idx, 1);
      }
    }
  }

  destroyAll(): void {
    this.destroyByType(this.type);
  }

  destroyByType(type: Type<T>): void {
    const comps = this.components.get(type);

    if (comps && comps.length) {
      let i = comps.length - 1;
      while (i >= 0) {
        this.destroy(comps[i--]);
      }
    }
  }

  protected injectComponent(type: Type<T>, bindings: PartialBindings, location?): ComponentRef<T> {
    return this.injectionService.appendComponent(type, bindings, location);
  }

  protected assignDefaults(bindings: any): PartialBindings {
    const inputs = { ...this.defaults.inputs };
    const outputs = { ...this.defaults.outputs };

    if (!bindings.inputs && !bindings.outputs) {
      bindings = { inputs: bindings };
    }

    if (inputs) {
      bindings.inputs = { ...inputs, ...bindings.inputs };
    }

    if (outputs) {
      bindings.outputs = { ...outputs, ...bindings.outputs };
    }

    return bindings;
  }

  protected register(type: Type<T>, component: ComponentRef<T>): void {
    if (!this.components.has(type)) {
      this.components.set(type, []);
    }

    const types = this.components.get(type);
    types.push(component);
  }
}
