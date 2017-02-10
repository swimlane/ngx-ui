import { Injectable, ComponentRef, EventEmitter } from '@angular/core';
import { InjectionService } from '../../services';
import { OverlayComponent } from './overlay.component';

@Injectable()
export class OverlayService {

  component: ComponentRef<OverlayComponent>;

  // list of components that will close by clicking the overlay
  triggerComponents: any[] = [];
  click: any = new EventEmitter();

  get instance() {
    if(this.component) return this.component.instance;
  }

  constructor(private injectionService: InjectionService) { }

  show(options: any = {}) {
    if(!this.component) {
      this.component = this.injectComponent();
      this.instance.click.subscribe(this.onClick.bind(this));
    }

    this.triggerComponents.push({
      component: options.triggerComponent,
      zIndex: options.zIndex
    });

    this.component.instance.visible = true;
    this.updateZIndex();

    return this.component;
  }

  hide() {
    if (this.triggerComponents.length === 0) {
      this.component.instance.visible = false;
    }
  }

  destroy() {
    if(this.component) {
      // destroy is called like this to trigger
      // proper lifecycle events like animations
      this.hide();

      setTimeout(() => {
        if(this.component) {
          this.component.destroy();
          this.component = undefined;
        }
      }, 100);
    }
  }

  injectComponent(): ComponentRef<OverlayComponent> {
    return this.injectionService.appendComponent(OverlayComponent);
  }

  onClick() {
    if (this.triggerComponents.length > 0) {
      const lastIdx = this.triggerComponents.length - 1;
      const triggerComponent = this.triggerComponents[lastIdx];
      this.click.emit(triggerComponent.component);
    }
  }

  removeTriggerComponent(component) {
    const idx = this.triggerComponents.findIndex(c => c.component === component);
    if (idx !== -1) {
      this.triggerComponents.splice(idx, 1);
    }

    this.updateZIndex();

    if (this.triggerComponents.length === 0) {
      this.destroy();
    }
  }

  updateZIndex() {
    if (this.triggerComponents.length === 0) {
      return;
    }
    const indexes = this.triggerComponents.map(tc => tc.zIndex);
    const zIndex = Math.max(...indexes) - 1;
    this.instance.zIndex = zIndex;
  }

}
