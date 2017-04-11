import { InjectionService, InjectionRegisteryService } from '../../services';
import { OverlayService } from '../overlay';
export declare class DialogService extends InjectionRegisteryService {
    private overlayService;
    defaults: any;
    zIndex: number;
    type: any;
    constructor(injectionService: InjectionService, overlayService: OverlayService);
    create(bindings: any): any;
    destroy(component: any): void;
    createSubscriptions(component: any): any;
    assignDefaults(bindings: any): any;
}
