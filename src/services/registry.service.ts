import { Injectable, ComponentRef } from '@angular/core';

@Injectable()
export class RegistryService {

  components = new Map();

  register(id: string, component: any, destroyCallback?: any): void {
    this.components.set(id, { component, destroyCallback });
  }

  get(id: string): any {
    let obj: any = this.components.get(id);
    if(obj) {
      return obj.component;
    }
  }

  destroy(id: string): void {
    const obj: any = this.components.get(id);

    if(obj && obj.component) {
      if(obj.destroyCallback) {
        obj.destroyCallback(true);
      }

      obj.component.destroy();
      this.components.delete(id);
    }
  }

  destroyAll(): void {
    this.components.forEach((v: any, k: string) => this.destroy(k));
  }

}
