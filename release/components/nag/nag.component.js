import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewEncapsulation, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/animations';
var NagComponent = /** @class */ (function () {
    function NagComponent() {
    }
    Object.defineProperty(NagComponent.prototype, "klass", {
        get: function () {
            return "ngx-nag ngx-nag-bottom ngx-nag-" + this.state + " " + this.cssClass;
        },
        enumerable: true,
        configurable: true
    });
    NagComponent.prototype.toggle = function () {
        this.state = this.state !== 'open' ? 'open' : 'closed';
        this.stateChanged.emit(this.state);
    };
    NagComponent.prototype.ngOnDestroy = function () {
        this.stateChanged.emit(this.state);
    };
    NagComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.watch && this.state === 'closed') {
            this.state = 'peek';
            setTimeout(function () {
                _this.state = 'closed';
            }, 100);
        }
    };
    return NagComponent;
}());
export { NagComponent };
//# sourceMappingURL=nag.component.js.map