import { EventEmitter, NgZone } from '@angular/core';
import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';
import { FileButtonStyleType } from './file-button-style.type';
import './file-button.scss';
export declare class FileButtonComponent {
    private ngZone;
    id: string;
    name: string;
    disabled: boolean;
    styleType: FileButtonStyleType;
    uploader: FileUploader;
    options: FileUploaderOptions;
    afterAddingFile: EventEmitter<{}>;
    beforeUploadItem: EventEmitter<{}>;
    successItem: EventEmitter<{}>;
    progressAll: EventEmitter<{}>;
    private readonly cssClasses;
    private isItemSuccessful;
    private progress;
    private fileName;
    constructor(ngZone: NgZone);
    ngOnInit(): void;
    onAfterAddingFile(fileItem: any): void;
    onBeforeUploadItem(fileItem: any): void;
    onProgressAll(progress: any): void;
    onSuccessItem(item: any, response: any, status: any, headers: any): void;
}
