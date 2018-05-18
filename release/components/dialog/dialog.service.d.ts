import { ComponentRef } from '@angular/core';
import { InjectionService, InjectionRegisteryService } from '../../services';
import { OverlayService } from '../overlay';
import { DialogComponent } from './dialog.component';
export declare class DialogService<T = DialogComponent> extends InjectionRegisteryService<T> {
    private overlayService;
    defaults: any;
    zIndex: number;
    type: any;
    constructor(injectionService: InjectionService, overlayService: OverlayService);
    create(bindings: any): ComponentRef<T>;
    destroy(component: any): void;
    createSubscriptions(component: any): any;
    assignDefaults(bindings: any): any;
}
