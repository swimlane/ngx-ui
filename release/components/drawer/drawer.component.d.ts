import { EventEmitter, OnDestroy } from '@angular/core';
import { DrawerService } from './drawer.service';
export declare class DrawerComponent implements OnDestroy {
    drawerManager: DrawerService;
    /**
     * CSS Class
     *
     * @type {string}
     * @memberOf DrawerComponent
     */
    cssClass: string;
    /**
     * Direction of the drawer to open
     *
     * @type {string}
     * @memberOf DrawerComponent
     */
    direction: string;
    /**
     * Template for the drawer contents
     *
     * @type {*}
     * @memberOf DrawerComponent
     */
    template: any;
    /**
     * Gets the size of the drawer
     *
     * @readonly
     * @type {number}
     * @memberOf DrawerComponent
     */
    /**
     * Size of the drawer. A percentage.
     *
     * @memberOf DrawerComponent
     */
    size: number;
    /**
     * Zindex of the drawer
     *
     * @type {number}
     * @memberOf DrawerComponent
     */
    zIndex: number;
    /**
     * Context to passed to the drawer instance
     *
     * @memberOf DrawerComponent
     */
    context: any;
    /**
     * Drawer close event
     *
     * @memberOf DrawerComponent
     */
    close: EventEmitter<{}>;
    /**
     * Tranform direction of the drawer
     *
     * @type {string}
     * @memberOf DrawerComponent
     */
    transform: string;
    /**
     * Drawer width calculation
     *
     * @type {string}
     * @memberOf DrawerComponent
     */
    widthSize: any;
    /**
     * Drawer height calculation
     *
     * @type {string}
     * @memberOf DrawerComponent
     */
    heightSize: any;
    /**
     * Is the drawer a left opening drawer
     *
     * @readonly
     * @type {boolean}
     * @memberOf DrawerComponent
     */
    readonly isLeft: boolean;
    /**
     * Gets the css classes for host
     *
     * @readonly
     * @type {string}
     * @memberOf DrawerComponent
     */
    readonly cssClasses: string;
    /**
     * Is the drawer a bottom of top drawer
     *
     * @readonly
     * @type {boolean}
     * @memberOf DrawerComponent
     */
    readonly isBottom: boolean;
    private _size;
    constructor(drawerManager: DrawerService);
    /**
     * Sets the dimensions
     *
     * @param {number} size
     *
     * @memberOf DrawerComponent
     */
    setDimensions(size: number): void;
    /**
     * On destroy callback
     *
     * @memberOf DrawerComponent
     */
    ngOnDestroy(): void;
    /**
     * Exit listener
     *
     * @memberOf DrawerComponent
     */
    onEscapeKey(): void;
}
