import { InjectionService } from '../../utils';
export declare class DrawerService {
    private injectionService;
    size: number;
    direction: string;
    drawers: any[];
    closeAllOnExit: boolean;
    zIndex: number;
    readonly backdropZIndex: number;
    private _zIndex;
    private container;
    constructor(injectionService: InjectionService);
    open(template: any, options: any): void;
    close(): void;
    transposeDefaults(options: any): void;
}
