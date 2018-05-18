import { InjectionService } from '../../../services';
import { OverlayService } from '../../overlay';
import { DialogService } from '../dialog.service';
import { AlertComponent } from './alert.component';
export declare class AlertService extends DialogService<AlertComponent> {
    defaults: any;
    type: any;
    clsMap: any;
    constructor(injectionService: InjectionService, overlayService: OverlayService);
    alert(props: any): any;
    confirm(props: any): any;
    prompt(props: any): any;
    private createDialog(props, type);
}
