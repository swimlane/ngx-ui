import { EventEmitter } from '@angular/core';
export declare class DrawerOverlay {
    /**
     * The z-index for the overlay.
     * @type {Number}
     */
    zIndex: number;
    /**
     * Click event when the olverlay is clicked.
     * @type {EventEmitter}
     */
    onClick: EventEmitter<{}>;
    /**
     * Listener for click to emit click event
     */
    backdropClick(): void;
}
