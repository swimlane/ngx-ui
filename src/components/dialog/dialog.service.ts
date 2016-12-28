import { Injectable, EventEmitter } from '@angular/core';

import { InjectionService, InjectionRegisteryService } from '../../services';

import { OverlayService } from '../overlay';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService extends InjectionRegisteryService {
  
  defaults: any = {
    inputs: {
      zIndex: 991,
      closeOnBlur: true,
      closeOnEscape: true,
      closeButton: true,
      showOverlay: true,
      visible: true
    }
  };

  zIndex: number = 995;
  closeSubscription: any;
  type: any = DialogComponent;

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
    const hasOverlay = component.instance.showOverlay;
    super.destroy(component);
    this.zIndex = this.zIndex - 1;

    if(hasOverlay) {
      const compsByType = this.getByType();
      if(!compsByType.length) {
        this.overlayService.destroy();
      } else {
        this.overlayService.instance.zIndex = this.zIndex - 1; 
      }
    }
  }

  createSubscriptions(component): any {
    let closeSub;
    let overlaySub;

    const kill = () => {
      const compsByType = this.getByType();
      const lastComp = compsByType[compsByType.length - 1];

      if(lastComp === component) {
        closeSub.unsubscribe();
        if(overlaySub) overlaySub.unsubscribe();
        this.destroy(component);
      }
    };

    closeSub = component.instance.close.subscribe(kill);

    if(component.instance.showOverlay) {
      const overlay = this.overlayService.show();
      if(component.instance.closeOnBlur) {
        overlaySub = this.overlayService.instance.click.subscribe(kill);
      }
    }
  }

  assignDefaults(bindings): any {
    bindings = super.assignDefaults(bindings);

    if(!bindings.zIndex) {
      this.zIndex = this.zIndex + 1;
      bindings.inputs.zIndex = this.zIndex;
    }
    
    return bindings;
  }

}
