import { ComponentRef } from '@angular/core';
import { InjectionService, RegistryService } from '../../services';
import { OverlayService } from '../overlay';
export declare class DialogService extends RegistryService {
    private injectionService;
    private overlayService;
    constructor(injectionService: InjectionService, overlayService: OverlayService);
    open(options: any): ComponentRef<any>;
    destroy(id: string): void;
    injectComponent(options: any): ComponentRef<any>;
    setupListeners(options: any, component: any): any[];
}
