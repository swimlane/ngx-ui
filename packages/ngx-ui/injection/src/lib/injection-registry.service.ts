import { ComponentRef, Type, ViewContainerRef } from '@angular/core';

import { InjectionService } from './injection.service';
import type { PartialBindings } from './models';

export abstract class InjectionRegistryService<T = unknown> {
  protected abstract type: Type<T>;

  protected defaults: PartialBindings = {};
  protected components = new Map<unknown, Array<ComponentRef<T>>>();

  protected readonly injectionService: InjectionService;

  protected constructor(injectionService: InjectionService) {
    this.injectionService = injectionService;
  }

  getByType(type: Type<T> = this.type) {
    return this.components.get(type);
  }

  create(bindings: PartialBindings): ComponentRef<T> {
    return this.createByType(this.type, bindings);
  }

  createByType(type: Type<T>, bindings: PartialBindings): ComponentRef<T> {
    const location = bindings.parentContainer;
    bindings = this.assignDefaults(bindings);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const component = this.injectComponent(type, bindings, location as any);
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

  protected injectComponent(
    type: Type<T>,
    bindings: PartialBindings,
    location?: ComponentRef<unknown> | HTMLElement | ViewContainerRef
  ): ComponentRef<T> {
    return this.injectionService.appendComponent(type, bindings, location);
  }

  protected assignDefaults(bindings: PartialBindings): PartialBindings {
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
    types?.push(component);
  }
}
