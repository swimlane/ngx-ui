import { Component, Input, ViewEncapsulation, HostBinding, HostListener } from '@angular/core';
var ButtonComponent = (function () {
    function ButtonComponent() {
        this.disabled = false;
        this.state = 'active'; // active, inProgress, success, fail
        this.inProgress = false;
        this.active = true;
        this.success = false;
        this.fail = false;
        this._disabled = false;
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
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-button',
                encapsulation: ViewEncapsulation.None,
                styleUrls: ['./button.component.scss'],
                host: { class: 'ngx-button' },
                template: "\n    <button [disabled]=\"_disabled\">\n      <span class=\"content\"><ng-content></ng-content></span>\n      <span *ngIf=\"inProgress\" class=\"state-icon icon icon-loading\"></span>\n      <span *ngIf=\"success\" class=\"state-icon icon icon-check\"></span>\n      <span *ngIf=\"fail\" class=\"state-icon icon icon-x\"></span>\n    </button>\n  "
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = function () { return []; };
ButtonComponent.propDecorators = {
    'disabled': [{ type: Input },],
    'state': [{ type: Input },],
    'promise': [{ type: Input },],
    'inProgress': [{ type: HostBinding, args: ['class.in-progress',] },],
    'active': [{ type: HostBinding, args: ['class.active',] },],
    'success': [{ type: HostBinding, args: ['class.success',] },],
    'fail': [{ type: HostBinding, args: ['class.fail',] },],
    '_disabled': [{ type: HostBinding, args: ['class.disabled-button',] },],
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
};
//# sourceMappingURL=button.component.js.map