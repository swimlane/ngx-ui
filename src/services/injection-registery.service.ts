import { ComponentRef, TemplateRef, Inject } from '@angular/core';
import { InjectionService } from '.';

export abstract class InjectionRegisteryService {

  protected abstract type: any;

  protected defaults: any = {};
  protected components: Map<any, any> = new Map();

  constructor(protected injectionService: InjectionService) { }

  getByType(type: any = this.type) {
    return this.components.get(type);
  }

  create(bindings: any): any {
    return this.createByType(this.type, bindings);
  }

  createByType(type: any, bindings: any): any {
    bindings = this.assignDefaults(bindings);

    const component = this.injectComponent(type, bindings);
    this.register(type, component);

    return component;
  }

  destroy(instance): void {
    const compsByType = this.components.get(instance.componentType);

    if(compsByType && compsByType.length) {
      const idx = compsByType.indexOf(instance);

      if(idx > -1) {
        const component = compsByType[idx];
        component.destroy();
        compsByType.splice(idx, 1);
      }
    }
  }

  destroyAll(): void {
    this.destroyByType(this.type);
  }

  destroyByType(type): void {
    const comps = this.components.get(type);
    
    if(comps && comps.length) {
      let i = comps.length - 1;
      while(i >= 0) {
        this.destroy(comps[i--]);
      }
    }
  }

  protected injectComponent(type, bindings): ComponentRef<any> {
    return this.injectionService.appendComponent(type, bindings);
  }

  protected assignDefaults(bindings): any {
    const inputs = { ...this.defaults.inputs };
    const outputs = { ...this.defaults.outputs };

    if(!bindings.inputs && !bindings.outputs) {
      bindings = { inputs: bindings };
    }

    if(inputs) {
      bindings.inputs = {...inputs, ...bindings.inputs};
    }

    if(outputs) {
      bindings.outputs = {...outputs, ...bindings.outputs};
    }

    return bindings;
  }

  protected register(type, component): void {
    if(!this.components.has(type)) {
      this.components.set(type, []);
    }

    const types = this.components.get(type);
    types.push(component);
  }

}
