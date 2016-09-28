import { EventEmitter } from '@angular/core';
import { DrawerManagerService } from './drawer-manager.service';
export declare class DrawerComponent {
    private drawerManager;
    /**
     * Direction of the drawer to open
     * @type {String}
     */
    direction: string;
    /**
     * Toolbar title
     * @type {String}
     */
    title: string;
    /**
     * Template for the drawer contents
     * @type {Object}
     */
    template: any;
    /**
     * Size of the drawer. A percentage.
     * @type {String}
     */
    size: number;
    /**
     * Zindex of the drawer
     * @type {Number}
     */
    zIndex: number;
    /**
     * Drawer exit event
     * @type {EventEmitter}
     */
    onExit: EventEmitter<{}>;
    /**
     * Tranform direction of the drawer
     * @return {String} translate
     */
    readonly transform: string;
    /**
     * Drawer width calculation
     * @return {String} percentage width
     */
    readonly widthSize: string;
    /**
     * Drawer height calculation
     * @return {String} percentage height
     */
    readonly heightSize: string;
    /**
     * Is the drawer a left opening drawer
     * @return {Boolean} direction
     */
    readonly isLeft: boolean;
    /**
     * Is the drawer a bottom of top drawer
     * @return {Boolean} direction
     */
    readonly isBottom: boolean;
    /**
     * Gets the page bounds and caches it
     * @return {Object} page bounds
     */
    readonly bounds: {
        height: number;
        width: number;
    };
    constructor(drawerManager: DrawerManagerService);
    /**
     * Escape keyboard event
     */
    onEscapeKey(): void;
}
