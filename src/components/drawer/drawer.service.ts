import { Injectable } from '@angular/core';
import { InjectionService, InjectionRegisteryService } from '../../services';
import { DrawerComponent } from '.';
import { OverlayService } from '../overlay';

@Injectable()
export class DrawerService extends InjectionRegisteryService {

  type: any = DrawerComponent;
  
  defaults: any = {
    inputs: {
      direction: 'left'
    }
  };

  zIndex: number = 995;
  size: number = 80;

  constructor(
    injectionService: InjectionService,
    private overlayService: OverlayService) {
    super(injectionService);
  }

  create(bindings): any {
    const component = super.create(bindings);
    this.createSubscriptions(component);
    return component;
  }

  destroy(component): void {
    // race case clicking fast errors here
    if(component && component.instance) {
      component.instance.size = 0;
    }

    setTimeout(() => {
      super.destroy(component);

      this.zIndex = this.zIndex - 1;
      this.size = this.size + 10;

      const compsByType = this.getByType();
      if(!compsByType.length) {
        this.overlayService.destroy();
      } else {
        this.overlayService.instance.zIndex = this.zIndex - 1; 
      }
    }, 10);
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

  createSubscriptions(component): any {
    const overlay = this.overlayService.show();
    overlay.instance.zIndex = this.zIndex - 1;

    let closeSub;
    let overlaySub;
    const kill = () => {
      const compsByType = this.getByType();
      const lastComp = compsByType[compsByType.length - 1];

      if(lastComp === component) {
        closeSub.unsubscribe();
        overlaySub.unsubscribe();
        this.destroy(component);
      }
    };

    closeSub = component.instance.close.subscribe(kill);
    overlaySub = overlay.instance.click.subscribe(kill);
  }

}
