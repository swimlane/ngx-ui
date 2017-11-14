import { Component, Input, Output, EventEmitter, NgZone, ViewEncapsulation, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';
import { FileButtonStyleType } from './file-button-style.type';
var nextId = 0;
var FileButtonComponent = /** @class */ (function () {
    function FileButtonComponent(ngZone) {
        this.ngZone = ngZone;
    }
    Object.defineProperty(FileButtonComponent.prototype, "cssClasses", {
        get: function () {
            return {
                'ngx-file-button': true,
                'standard-style': this.styleType === FileButtonStyleType.standard,
                'progress-style': this.styleType === FileButtonStyleType.progress,
                'show-progress': this.uploader && this.uploader.options.isHTML5,
                success: this.isItemSuccessful,
                active: this.uploader && this.uploader.isUploading
            };
        },
        enumerable: true,
        configurable: true
    });
    FileButtonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.run(function () {
            if (!_this.uploader && !_this.options) {
                throw new Error('You must pass either an uploader instance or options.');
            }
            // if options were passed, init a new uploader
            if (!_this.uploader && _this.options) {
                _this.uploader = new FileUploader(_this.options);
            }
            // always remove after upload for this case
            // always remove after upload for this case
            _this.uploader.options.removeAfterUpload = true;
            _this.uploader.onAfterAddingFile = _this.onAfterAddingFile.bind(_this);
            _this.uploader.onBeforeUploadItem = _this.onBeforeUploadItem.bind(_this);
            _this.uploader.onProgressAll = _this.onProgressAll.bind(_this);
            _this.uploader.onSuccessItem = _this.onSuccessItem.bind(_this);
            _this.uploader.onErrorItem = _this.onErrorItem.bind(_this);
        });
    };
    FileButtonComponent.prototype.onAfterAddingFile = function (fileItem) {
        var _this = this;
        this.ngZone.run(function () {
            _this.fileName = fileItem.file.name;
            _this.afterAddingFile.emit({ fileItem: fileItem });
        });
    };
    FileButtonComponent.prototype.onBeforeUploadItem = function (fileItem) {
        var _this = this;
        this.ngZone.run(function () {
            _this.beforeUploadItem.emit({ fileItem: fileItem });
        });
    };
    FileButtonComponent.prototype.onErrorItem = function (response, status, headers) {
        this.errorItem.emit({ response: response, status: status, headers: headers });
    };
    FileButtonComponent.prototype.onProgressAll = function (progress) {
        var _this = this;
        this.ngZone.run(function () {
            _this.progress = progress + '%';
            _this.progressAll.emit({ progress: progress });
        });
    };
    FileButtonComponent.prototype.onSuccessItem = function (item, response, status, headers) {
        var _this = this;
        this.ngZone.run(function () {
            _this.isItemSuccessful = true;
            setTimeout(function () {
                _this.fileName = '';
                _this.isItemSuccessful = false;
            }, 2500);
            _this.successItem.emit({ item: item, response: response, status: status, headers: headers });
        });
    };
    FileButtonComponent.prototype.fileOverBase = function (event) {
        this.fileOverDropzone = event;
    };
    return FileButtonComponent;
}());
export { FileButtonComponent };
//# sourceMappingURL=file-button.component.js.map