import { ComponentRef } from '@angular/core';
import { InjectionService } from '../../utils';
import { OverlayComponent } from './overlay.component';
export declare class OverlayService {
    private injectionService;
    component: ComponentRef<OverlayComponent>;
    constructor(injectionService: InjectionService);
    show(options?: any): void;
    hide(): void;
    destroy(): void;
    injectComponent(): ComponentRef<OverlayComponent>;
}
