import { InjectionService, InjectionRegisteryService } from '../../services';
import { OverlayService } from '../overlay';
export declare class DrawerService extends InjectionRegisteryService {
    private overlayService;
    type: any;
    defaults: any;
    zIndex: number;
    size: number;
    constructor(injectionService: InjectionService, overlayService: OverlayService);
    create(bindings: any): any;
    destroy(component: any): void;
    assignDefaults(bindings: any): any;
    createSubscriptions(component: any): any;
}
