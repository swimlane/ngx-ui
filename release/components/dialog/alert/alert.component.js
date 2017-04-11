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
import { Component, Input, Output, EventEmitter, trigger, style, animate, transition, state, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '../dialog.component';
// Disable lint until codelyzer supports class inheritance
// https://github.com/mgechev/codelyzer/issues/191
/* tslint:disable */
var AlertComponent = (function (_super) {
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
                visible: true
            }
        };
        _this.ok = new EventEmitter();
        _this.cancel = new EventEmitter();
        return _this;
    }
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
    return AlertComponent;
}(DialogComponent));
export { AlertComponent };
AlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-alert-dialog',
                encapsulation: ViewEncapsulation.None,
                styleUrls: [
                    '../dialog.component.scss',
                    './alert.component.scss'
                ],
                template: "\n    <div\n      class=\"ngx-dialog ngx-alert-dialog\"\n      [style.zIndex]=\"zIndex\">\n      <div\n        class=\"ngx-dialog-content {{cssClass}}\"\n        [@visibilityTransition]=\"visibleState\"\n        [style.zIndex]=\"contentzIndex\"\n        tabindex=\"-1\"\n        role=\"dialog\">\n        <div\n          class=\"ngx-dialog-header\"\n          *ngIf=\"title || closeButton\">\n          <button\n            *ngIf=\"closeButton\"\n            type=\"button\"\n            class=\"close\"\n            (click)=\"hide()\">\n            <span class=\"icon-x\"></span>\n          </button>\n          <h2\n            *ngIf=\"title\"\n            class=\"ngx-dialog-title\"\n            [innerHTML]=\"title\">\n          </h2>\n        </div>\n        <div class=\"ngx-dialog-body\">\n          <div [innerHTML]=\"content\"></div>\n          <ngx-input\n            type=\"text\"\n            autofocus=\"true\"\n            name=\"confirm_input\"\n            *ngIf=\"type === 'prompt'\"\n            (keydown.escape)=\"onCancelClick($event)\"\n            (keydown.enter)=\"onKeydown($event)\"\n            [(ngModel)]=\"data\">\n          </ngx-input>\n        </div>\n        <div class=\"ngx-dialog-footer\">\n          <button\n            type=\"button\"\n            class=\"btn btn-primary\"\n            (click)=\"onOkClick()\">\n            Ok\n          </button>\n          <button\n            type=\"button\"\n            class=\"btn\"\n            (click)=\"onCancelClick()\"\n            *ngIf=\"type !== 'alert'\">\n            Cancel\n          </button>\n      </div>\n    </div>\n  ",
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
            },] },
];
/** @nocollapse */
AlertComponent.ctorParameters = function () { return []; };
AlertComponent.propDecorators = {
    'type': [{ type: Input },],
    'data': [{ type: Input },],
    'ok': [{ type: Output },],
    'cancel': [{ type: Output },],
};
//# sourceMappingURL=alert.component.js.map