import { InjectionService } from '../../../services';
import { OverlayService } from '../../overlay';
import { DialogService } from '../dialog.service';
export declare class AlertService extends DialogService {
    defaults: any;
    type: any;
    clsMap: any;
    constructor(injectionService: InjectionService, overlayService: OverlayService);
    alert(props: any): any;
    confirm(props: any): any;
    prompt(props: any): any;
    private createDialog(props, type);
}
