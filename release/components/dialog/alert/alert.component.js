var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, trigger, style, ViewChild, animate, transition, state, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '../dialog.component';
// Disable lint until codelyzer supports class inheritance
// https://github.com/mgechev/codelyzer/issues/191
/* tslint:disable */
var AlertComponent = /** @class */ (function (_super) {
    __extends(AlertComponent, _super);
    function AlertComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaults = {
            inputs: {
                zIndex: 991,
                closeOnBlur: false,
                closeOnEscape: false,
                closeButton: false,
                showOverlay: true,
                visible: true,
                class: ''
            }
        };
        _this.data = '';
        _this.ok = new EventEmitter();
        _this.cancel = new EventEmitter();
        return _this;
    }
    AlertComponent.prototype.ngOnInit = function () {
        if (this.type !== 'prompt') {
            this.dialogElm.nativeElement.focus();
        }
    };
    AlertComponent.prototype.onOkClick = function () {
        this.ok.emit({ data: this.data });
        this.hide();
    };
    AlertComponent.prototype.onCancelClick = function () {
        this.cancel.emit({ data: this.data });
        this.hide();
    };
    AlertComponent.prototype.onKeydown = function () {
        this.ok.emit({ data: this.data });
        this.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AlertComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AlertComponent.prototype, "data", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AlertComponent.prototype, "ok", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AlertComponent.prototype, "cancel", void 0);
    __decorate([
        ViewChild('dialogContent'),
        __metadata("design:type", Object)
    ], AlertComponent.prototype, "dialogElm", void 0);
    AlertComponent = __decorate([
        Component({
            selector: 'ngx-alert-dialog',
            encapsulation: ViewEncapsulation.None,
            styleUrls: [
                '../dialog.component.css',
                './alert.component.css'
            ],
            template: "\n    <div\n      class=\"ngx-dialog ngx-alert-dialog {{type}}\"\n      [style.zIndex]=\"zIndex\">\n      <div\n        class=\"ngx-dialog-content {{cssClass}}\"\n        [@visibilityTransition]=\"visibleState\"\n        [style.zIndex]=\"contentzIndex\"\n        #dialogContent\n        (keydown.escape)=\"onCancelClick()\"\n        (keydown.enter)=\"onKeydown()\"\n        tabindex=\"-1\"\n        role=\"dialog\">\n        <div\n          class=\"ngx-dialog-header\"\n          *ngIf=\"title || closeButton\">\n          <button\n            *ngIf=\"closeButton\"\n            type=\"button\"\n            class=\"close\"\n            (click)=\"hide()\">\n            <span class=\"icon-x\"></span>\n          </button>\n          <button *ngIf=\"type === 'alert'\"\n            type=\"button\"\n            class=\"btn close-button\"\n            [class.btn-warning]=\"\"\n            (click)=\"onOkClick()\">\n            Ok\n          </button>\n          <h1\n            *ngIf=\"title\"\n            [innerHTML]=\"title\">\n          </h1>\n        </div>\n        <div *ngIf=\"content\" class=\"ngx-dialog-body\" [innerHTML]=\"content\"></div>\n\n        <div class=\"ngx-dialog-body\" *ngIf=\"type === 'prompt'\">\n          <ngx-input\n            type=\"text\"\n            autofocus=\"true\"\n            name=\"confirm_input\"\n            [(ngModel)]=\"data\">\n          </ngx-input>\n        </div>\n\n        <div class=\"ngx-dialog-footer\" *ngIf=\"type !== 'alert'\">\n          <button\n            type=\"button\"\n            class=\"btn btn-primary\"\n            (click)=\"onOkClick()\">\n            Ok\n          </button>\n          <button\n            type=\"button\"\n            class=\"btn\"\n            (click)=\"onCancelClick()\">\n            Cancel\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
            animations: [
                trigger('visibilityTransition', [
                    state('active', style({
                        opacity: 1,
                        transform: 'scale3d(1, 1, 1)'
                    })),
                    transition('void => *', [
                        style({
                            opacity: 0,
                            transform: 'scale3d(1.2, 1.2, 1.2)'
                        }),
                        animate('0.2s ease-out')
                    ]),
                    transition('* => inactive', [
                        style({
                            opacity: 1,
                            transform: 'scale3d(1, 1, 1)'
                        }),
                        animate('0.2s ease-out', style({
                            transform: 'scale3d(0.9, 0.9, 1)',
                            opacity: 0
                        }))
                    ])
                ])
            ],
            host: {
                tabindex: '-1'
            }
        })
    ], AlertComponent);
    return AlertComponent;
}(DialogComponent));
export { AlertComponent };
/* tslint:enable */
//# sourceMappingURL=alert.component.js.map