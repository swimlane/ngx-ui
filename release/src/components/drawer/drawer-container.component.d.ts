import { EventEmitter } from '@angular/core';
export declare class DrawerContainerComponent {
    drawers: any;
    backdropZIndex: number;
    onClose: EventEmitter<{}>;
    readonly overlayActive: string;
}
