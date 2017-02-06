import { EventEmitter } from '@angular/core';
import { DialogComponent } from '../dialog.component';
export declare class AlertComponent extends DialogComponent {
    defaults: any;
    type: any;
    data: any;
    ok: EventEmitter<{}>;
    cancel: EventEmitter<{}>;
    onOkClick(): void;
    onCancelClick(): void;
}
