var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { trigger } from '@angular/animations';
import { nagDrawerTransition } from '../../animations';
var NagComponent = /** @class */ (function () {
    function NagComponent() {
        this.cssClass = '';
        this.state = 'closed';
        this.stateChanged = new EventEmitter();
        this.title = '';
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NagComponent.prototype, "cssClass", void 0);
    __decorate([
        HostBinding('@drawerTransition'),
        Input(),
        __metadata("design:type", String)
    ], NagComponent.prototype, "state", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NagComponent.prototype, "stateChanged", void 0);
    __decorate([
        HostBinding('style.zIndex'),
        Input(),
        __metadata("design:type", Number)
    ], NagComponent.prototype, "zIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NagComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NagComponent.prototype, "watch", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NagComponent.prototype, "klass", null);
    NagComponent = __decorate([
        Component({
            selector: 'ngx-nag',
            template: "\n    <div class=\"ngx-nag-content\">\n      <ngx-toolbar\n        class=\"ngx-nag-toolbar\"\n        (click)=\"toggle()\"\n        [title]=\"title\">\n        <ngx-toolbar-title *ngIf=\"!title\">\n          <ng-content select=\"[ngx-nag-title]\"></ng-content>\n        </ngx-toolbar-title>\n        <ngx-toolbar-content>\n          <ngx-icon class=\"ngx-nag-icon\" fontIcon=\"arrow-down\"></ngx-icon>\n        </ngx-toolbar-content>\n      </ngx-toolbar>\n      <section class=\"ngx-nag-body ngx-section-content\">\n        <ng-content></ng-content>\n      </section>\n    </div>\n  ",
            host: {
                role: 'dialog',
                tabindex: '-1'
            },
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./nag.component.css'],
            animations: [
                trigger('drawerTransition', nagDrawerTransition)
            ]
        })
    ], NagComponent);
    return NagComponent;
}());
export { NagComponent };
//# sourceMappingURL=nag.component.js.map