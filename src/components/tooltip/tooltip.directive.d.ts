import { ViewContainerRef } from '@angular/core';
import { InjectionService } from '../../utils/injection.service';
import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
export declare class TooltipDirective {
    private viewContainerRef;
    private injectionService;
    title: string;
    disabled: boolean;
    placement: PlacementTypes;
    type: StyleTypes;
    closeOnClickOutside: boolean;
    closeOnMouseLeave: boolean;
    dismissTimeout: number;
    template: any;
    private visible;
    private tooltip;
    constructor(viewContainerRef: ViewContainerRef, injectionService: InjectionService);
    show(): void;
}
