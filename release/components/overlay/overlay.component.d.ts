import { EventEmitter } from '@angular/core';
/**
 * Overlay Component for Drawer/Dialogs
 */
export declare class OverlayComponent {
    visible: boolean;
    zIndex: number;
    click: EventEmitter<{}>;
    readonly animationState: string;
}
