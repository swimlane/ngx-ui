import { ViewContainerRef } from '@angular/core';
import { InjectionService } from '../../utils/injection.service';
import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
export declare class TooltipDirective {
    private viewContainerRef;
    private injectionService;
    title: string;
    group: string;
    spacing: number;
    disabled: boolean;
    showCaret: boolean;
    placement: PlacementTypes;
    alignment: AlignmentTypes;
    type: StyleTypes;
    closeOnClickOutside: boolean;
    closeOnMouseLeave: boolean;
    dismissTimeout: number;
    showTimeout: number;
    template: any;
    private visible;
    private tooltip;
    private timeout;
    constructor(viewContainerRef: ViewContainerRef, injectionService: InjectionService);
    show(): void;
    hide(): void;
    private createBoundOptions();
}
