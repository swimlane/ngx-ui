import { ComponentRef } from '@angular/core';
import { InjectionService } from '../../services';
import { OverlayComponent } from './overlay.component';
export declare class OverlayService {
    private injectionService;
    component: ComponentRef<OverlayComponent>;
    triggerComponents: any[];
    click: any;
    readonly instance: OverlayComponent;
    constructor(injectionService: InjectionService);
    show(options?: any): ComponentRef<OverlayComponent>;
    hide(): void;
    destroy(): void;
    injectComponent(): ComponentRef<OverlayComponent>;
    onClick(): void;
    removeTriggerComponent(component: any): void;
    updateZIndex(): void;
}
