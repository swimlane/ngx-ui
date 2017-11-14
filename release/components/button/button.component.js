import { Component, Input, Output, EventEmitter, NgZone, ViewEncapsulation, OnInit, OnChanges, ContentChild, TemplateRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
var ButtonComponent = /** @class */ (function () {
    function ButtonComponent() {
    }
    ButtonComponent.prototype.ngOnInit = function () {
        this.updateState();
    };
    ButtonComponent.prototype.ngOnChanges = function () {
        this._disabled = this.disabled;
        this.updateState();
        this.updatePromise();
    };
    ButtonComponent.prototype.updatePromise = function () {
        var _this = this;
        if (this.promise !== undefined) {
            this.state = 'inProgress';
            this.updateState();
            this.promise.then(function () {
                _this.state = 'success';
                _this.updateState();
            }).catch(function (error) {
                _this.state = 'fail';
                _this.updateState();
            });
        }
    };
    ButtonComponent.prototype.updateState = function () {
        var _this = this;
        if (!this.state) {
            this.state = 'active';
        }
        this.inProgress = false;
        this.active = false;
        this.success = false;
        this.fail = false;
        switch (this.state) {
            case 'inProgress':
                this.inProgress = true;
                break;
            case 'success':
                this.success = true;
                break;
            case 'fail':
                this.fail = true;
                break;
            default:
                this.active = true;
                break;
        }
        if (this.success || this.fail || this.inProgress) {
            this._disabled = true;
        }
        if (this.success || this.fail) {
            clearTimeout(this.lastTimeout);
            this.lastTimeout = setTimeout(function () {
                _this.state = 'active';
                _this._disabled = _this.disabled;
                _this.updateState();
            }, 3000);
        }
    };
    ButtonComponent.prototype.onClick = function (event) {
        if (this._disabled) {
            console.log('stopPropagation');
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
        return true;
    };
    return ButtonComponent;
}());
export { ButtonComponent };
//# sourceMappingURL=button.component.js.map