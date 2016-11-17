import { Injectable, ComponentRef, EventEmitter } from '@angular/core';
import { InjectionService } from '../../services';
import { OverlayComponent } from './overlay.component';

@Injectable()
export class OverlayService {

  component: ComponentRef<OverlayComponent>;

  constructor(private injectionService: InjectionService) { }

  show(options: any = {}) {
    if(!this.component) {
      this.component = this.injectComponent();
    }

    let instance = this.component.instance;
    instance.zIndex = options.zIndex || 990;
    instance.visible = true;
  }

  hide() {
    this.component.instance.visible = false;
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

}
