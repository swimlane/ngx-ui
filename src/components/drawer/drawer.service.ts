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
      this.zIndex = this.zIndex - 2;
      this.size = this.size + 10;
      this.overlayService.removeTriggerComponent(component);
      super.destroy(component);
    }, 10);
  }

  assignDefaults(bindings): any {
    bindings = super.assignDefaults(bindings);

    if(!bindings.inputs.zIndex) {
      this.zIndex = (this.overlayService.instance) ?
        this.overlayService.instance.zIndex + 3 :
        this.zIndex + 2;
      bindings.inputs.zIndex = this.zIndex;
    }

    this.size = this.size - 10;
    if(!bindings.inputs.size) {
      bindings.inputs.size = this.size;
    }

    return bindings;
  }

  createSubscriptions(component): any {
    const overlay = this.overlayService.show({
      triggerComponent: component,
      zIndex: this.zIndex
    });

    let closeSub;
    let overlaySub;
    const kill = (c) => {
      if (component !== c) {
        return;
      }

      closeSub.unsubscribe();
      overlaySub.unsubscribe();
      this.destroy(component);
    };

    closeSub = component.instance.close.subscribe(kill.bind(this, component));
    overlaySub = this.overlayService.click.subscribe(kill);
  }

}
