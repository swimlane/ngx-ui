import { Injectable, ComponentRef, EventEmitter } from '@angular/core';
import { InjectionService } from '../../utils';
import { OverlayComponent } from './overlay.component';

@Injectable()
export class OverlayService {

  component: ComponentRef<OverlayComponent>;

  constructor(private injectionService: InjectionService) { }

  show(options?: any) {
    if(!this.component) {
      this.component = this.injectComponent();
    }

    if(options && options.zIndex) {
      this.component.instance.zIndex = options.zIndex;
    }

    this.component.instance.visible = true;
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
        this.component.destroy();
        this.component = undefined;
      }, 100);
    }
  }

  injectComponent(): ComponentRef<OverlayComponent> {
    return this.injectionService.appendNextToRoot(OverlayComponent);
  }

}
