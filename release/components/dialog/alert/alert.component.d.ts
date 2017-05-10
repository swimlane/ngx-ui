import { EventEmitter } from '@angular/core';
import { DialogComponent } from '../dialog.component';
export declare class AlertComponent extends DialogComponent {
    defaults: any;
    type: any;
    data: any;
    ok: EventEmitter<{}>;
    cancel: EventEmitter<{}>;
    dialogElm: any;
    ngOnInit(): void;
    onOkClick(): void;
    onCancelClick(): void;
    onKeydown(): void;
}
