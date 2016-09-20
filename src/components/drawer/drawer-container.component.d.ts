import { DrawerManagerService } from './drawer-manager.service';
export declare class DrawerContainerComponent {
    private drawerManager;
    /**
     * Close all drawers when a exit event is triggered.
     * @type {Boolean}
     */
    closeAllOnExit: boolean;
    /**
     * Default z-index for drawers to calculate on
     * @type {Number}
     */
    zIndex: number;
    /**
     * Default size for drawers to start with
     * @type {Number}
     */
    size: number;
    /**
     * Default direction for drawers to start
     * @type {String}
     */
    direction: string;
    /**
     * Get if the overlay should be active or not.
     * @return {Boolean} active
     */
    readonly overlayActive: string;
    constructor(drawerManager: DrawerManagerService);
}
