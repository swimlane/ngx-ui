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
import { Component, Input, Output, EventEmitter, ElementRef, HostListener, trigger, style, ViewChild, animate, transition, state, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '../dialog.component';
// Disable lint until codelyzer supports class inheritance
// https://github.com/mgechev/codelyzer/issues/191
/* tslint:disable */
var 
// Disable lint until codelyzer supports class inheritance
// https://github.com/mgechev/codelyzer/issues/191
/* tslint:disable */
AlertComponent = /** @class */ (function (_super) {
    __extends(AlertComponent, _super);
    function AlertComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return AlertComponent;
}(DialogComponent));
// Disable lint until codelyzer supports class inheritance
// https://github.com/mgechev/codelyzer/issues/191
/* tslint:disable */
export { AlertComponent };
/* tslint:enable */
//# sourceMappingURL=alert.component.js.map