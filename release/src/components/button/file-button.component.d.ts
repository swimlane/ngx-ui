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
    onAfterAddingFile: EventEmitter<{}>;
    onBeforeUploadItem: EventEmitter<{}>;
    onSuccessItem: EventEmitter<{}>;
    onProgressAll: EventEmitter<{}>;
    private readonly cssClasses;
    private isItemSuccessful;
    private progress;
    private fileName;
    constructor(ngZone: NgZone);
    ngOnInit(): void;
    afterAddingFile(fileItem: any): void;
    beforeUploadItem(fileItem: any): void;
    progressAll(progress: any): void;
    successItem(item: any, response: any, status: any, headers: any): void;
}
