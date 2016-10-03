import { EventEmitter } from '@angular/core';
import './overlay.scss';
/**
 * Overlay Component for Drawer/Dialogs
 *
 * Ideally this would be a component but issue:
 * https://github.com/angular/angular/issues/9947
 *
 */
export declare class OverlayComponent {
    readonly animationState: string;
    /**
     * Indicates if the overlay is visible
     * @return {Boolean} visibility
     */
    visible: boolean;
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
