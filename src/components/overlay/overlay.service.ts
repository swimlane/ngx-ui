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

    this.component.instance.visible = true;

    if(options && options.zIndex) {
      this.component.instance.zIndex = options.zIndex;
    }
  }

  hide() {
    this.component.instance.visible = false;
  }

  destroy() {
    if(this.component) {
      this.component.destroy();
      this.component = undefined;
    }
  }

  injectComponent(): ComponentRef<OverlayComponent> {
    return this.injectionService.appendNextToRoot(OverlayComponent);
  }

}
