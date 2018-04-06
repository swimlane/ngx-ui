var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, NgZone, ViewEncapsulation, ContentChild, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileButtonStyleType } from './file-button-style.type';
var nextId = 0;
var FileButtonComponent = /** @class */ (function () {
    function FileButtonComponent(ngZone) {
        this.ngZone = ngZone;
        this.id = "input-" + ++nextId;
        this.styleType = FileButtonStyleType.standard;
        this.afterAddingFile = new EventEmitter();
        this.beforeUploadItem = new EventEmitter();
        this.successItem = new EventEmitter();
        this.errorItem = new EventEmitter();
        this.progressAll = new EventEmitter();
        this.isItemSuccessful = false;
        this.progress = '0%';
        this.fileName = '';
        this.fileOverDropzone = false;
    }
    Object.defineProperty(FileButtonComponent.prototype, "isDisabled", {
        get: function () {
            return this.disabled || this.uploader.isUploading;
        },
        enumerable: true,
        configurable: true
    });
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
    FileButtonComponent.prototype.clearInput = function () {
        this.fileInput.nativeElement.value = '';
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileButtonComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileButtonComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FileButtonComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FileButtonComponent.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FileButtonComponent.prototype, "styleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FileUploader)
    ], FileButtonComponent.prototype, "uploader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileButtonComponent.prototype, "options", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileButtonComponent.prototype, "afterAddingFile", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileButtonComponent.prototype, "beforeUploadItem", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileButtonComponent.prototype, "successItem", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileButtonComponent.prototype, "errorItem", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileButtonComponent.prototype, "progressAll", void 0);
    __decorate([
        ContentChild('dropzoneTemplate'),
        __metadata("design:type", TemplateRef)
    ], FileButtonComponent.prototype, "dropzoneTemplate", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], FileButtonComponent.prototype, "fileInput", void 0);
    FileButtonComponent = __decorate([
        Component({
            selector: 'ngx-file-button',
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./file-button.component.css'],
            template: "\n    <div *ngIf=\"dropzoneTemplate\"\n      ng2FileDrop\n      [ngClass]=\"{'file-over': fileOverDropzone}\"\n      (fileOver)=\"fileOverBase($event)\"\n      [uploader]=\"uploader\">\n      <ng-template ng2FileDrop\n        [ngTemplateOutlet]=\"dropzoneTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: uploader }\">\n      </ng-template>\n    </div>\n\n    <div *ngIf=\"!dropzoneTemplate\" [ngClass]=\"cssClasses\">\n      <div\n        class=\"ngx-file-button-button\">\n        <input #fileInput\n          ng2FileSelect\n          type=\"file\"\n          class=\"ngx-file-button-input\"\n          [disabled]=\"isDisabled\"\n          [multiple]=\"multiple\"\n          [id]=\"id + '-input'\"\n          [name]=\"name + '-input'\"\n          [uploader]=\"uploader\"\n        />\n        <label\n          [class.disabled]=\"isDisabled\"\n          [class.btn]=\"styleType === 'standard'\"\n          [attr.for]=\"id + '-input'\"\n          class=\"ngx-file-button-label\">\n          <ng-content></ng-content>\n        </label>\n        <span class=\"ngx-file-button-text\" *ngIf=\"fileName\">\n          {{fileName}}\n        </span>\n      </div>\n      <div\n        class=\"ngx-file-button-fill\"\n        [style.width]=\"progress\">\n      </div>\n      <span class=\"icon-check\"></span>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [NgZone])
    ], FileButtonComponent);
    return FileButtonComponent;
}());
export { FileButtonComponent };
//# sourceMappingURL=file-button.component.js.map