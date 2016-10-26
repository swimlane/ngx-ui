import { EventEmitter } from '@angular/core';
export declare class DrawerContainerComponent {
    drawers: any;
    backdropZIndex: number;
    close: EventEmitter<{}>;
    readonly overlayActive: string;
}
