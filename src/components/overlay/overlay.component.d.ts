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
    visible: boolean;
    zIndex: number;
    click: EventEmitter<{}>;
    readonly animationState: string;
}
