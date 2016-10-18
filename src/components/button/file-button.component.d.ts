import { EventEmitter, NgZone } from '@angular/core';
import { FileUploaderOptions } from 'ng2-file-upload';
import './file-button.scss';
export declare class FileButtonComponent {
    private ngZone;
    id: string;
    name: string;
    disabled: boolean;
    options: FileUploaderOptions;
    onBeforeUploadItem: EventEmitter<{}>;
    onSuccessItem: EventEmitter<{}>;
    private uploader;
    private isItemSuccessful;
    private progress;
    constructor(ngZone: NgZone);
    ngOnInit(): void;
}
