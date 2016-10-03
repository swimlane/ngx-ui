import { InjectionService } from '../../utils';
export declare class DrawerManagerService {
    private injectionService;
    /**
     * Collection of drawers
     * @type {Array}
     */
    drawers: any[];
    /**
     * Close all stacks when escape or backdrop is clicked
     * @type {boolean}
     */
    closeAllOnExit: boolean;
    /**
     * Default zindex that stacks will start with.
     * @type {number}
     */
    zIndex: number;
    /**
     * Default size the stacks will start with
     * @type {number}
     */
    size: number;
    /**
     * Default direction for drawers
     * @type {string}
     */
    direction: string;
    /**
     * Gets the z-index for the backdrop which
     * is equal to the current - 1;
     * @return {number} index
     */
    readonly backdropZIndex: number;
    /**
     * Parent container element
     * @type {any}
     */
    container: any;
    /**
     * Drawer manager service
     * @param  {InjectionService} privateinjectionService
     */
    constructor(injectionService: InjectionService);
    /**
     * Opens a new drawer.
     */
    open(template: any, options: any): void;
    /**
     * Close drawer(s)
     */
    close(): void;
    /**
     * Register the container for manipulation
     * by the manager
     */
    registerContainer(container: any): void;
    /**
     * Transpose the default options
     * and update the calculations based
     * on active drawers.
     */
    transposeDefaults(options: any): void;
}
