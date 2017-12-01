var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation, HostBinding, HostListener } from '@angular/core';
var ButtonComponent = /** @class */ (function () {
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
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
        return true;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ButtonComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ButtonComponent.prototype, "state", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "promise", void 0);
    __decorate([
        HostBinding('class.in-progress'),
        __metadata("design:type", Boolean)
    ], ButtonComponent.prototype, "inProgress", void 0);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Boolean)
    ], ButtonComponent.prototype, "active", void 0);
    __decorate([
        HostBinding('class.success'),
        __metadata("design:type", Boolean)
    ], ButtonComponent.prototype, "success", void 0);
    __decorate([
        HostBinding('class.fail'),
        __metadata("design:type", Boolean)
    ], ButtonComponent.prototype, "fail", void 0);
    __decorate([
        HostBinding('class.disabled-button'),
        __metadata("design:type", Boolean)
    ], ButtonComponent.prototype, "_disabled", void 0);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Boolean)
    ], ButtonComponent.prototype, "onClick", null);
    ButtonComponent = __decorate([
        Component({
            selector: 'ngx-button',
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./button.component.css'],
            host: { class: 'ngx-button' },
            template: "\n    <button [disabled]=\"_disabled\">\n      <span class=\"content\"><ng-content></ng-content></span>\n      <span class=\"state-icon\">\n        <span *ngIf=\"inProgress\" class=\"icon icon-loading\"></span>\n        <span *ngIf=\"success\" class=\"icon icon-check\"></span>\n        <span *ngIf=\"fail\" class=\"icon icon-x\"></span>\n      </span>\n    </button>\n  "
        })
    ], ButtonComponent);
    return ButtonComponent;
}());
export { ButtonComponent };
//# sourceMappingURL=button.component.js.map