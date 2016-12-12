import { Injectable } from '@angular/core';
import { InjectionService, InjectionRegistery } from '../../services';
import { DrawerComponent } from '.';
import { OverlayService } from '../overlay';

@Injectable()
export class DrawerService extends InjectionRegistery {

  type: any = DrawerComponent;
  
  defaults: any = {
    inputs: {
      direction: 'left'
    }
  };

  zIndex: number = 995;
  size: number = 80;
  closeAllOnExit: boolean = false;

  private closeSubscription: any;

  constructor(
    injectionService: InjectionService,
    private overlayService: OverlayService) {
    super(injectionService);
  }

  create(bindings): any {
    const component = super.create(bindings);
    const { instance } = component;

    this.closeSubscription = instance.close.subscribe(() => {
      this.destroy(component);
    });

    this.createOverlay(component);

    return component;
  }

  destroy(instance): void {
    super.destroy(instance);

    if(this.closeAllOnExit) {
      this.zIndex = 990;
      this.size = 90;
    } else {
      this.zIndex = this.zIndex - 1;
      this.size = this.size + 10;
    }

    const compsByType = this.components.get(this.type);
    if(this.closeAllOnExit || !compsByType.length) {
      this.overlayService.destroy();
    }
  }

  assignDefaults(bindings): any {
    bindings = super.assignDefaults(bindings);

    if(!bindings.zIndex) {
      this.zIndex = this.zIndex + 1;
      bindings.inputs.zIndex = this.zIndex;
    }

    if(!bindings.size) {
      this.size = this.size - 10;
      bindings.inputs.size = this.size;
    }

    return bindings;
  }

  createOverlay(component): void {
    const { instance } = this.overlayService.show();
    instance.zIndex = this.zIndex - 1;

    const overlayListener = instance.click.subscribe(() => {
      this.destroy(component);
    });
  }

}
