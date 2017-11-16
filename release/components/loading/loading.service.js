var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { InjectionService } from '../../services';
import { LoadingComponent } from './loading.component';
var LoadingService = /** @class */ (function () {
    function LoadingService(injectionService) {
        this.injectionService = injectionService;
        this.threshold = 250;
        this.count = 0;
        this._progress = 0;
    }
    Object.defineProperty(LoadingService.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (val) {
            if (this.instance) {
                this.instance.progress = val;
            }
            this._progress = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingService.prototype, "instance", {
        get: function () {
            if (this.component)
                return this.component.instance;
        },
        enumerable: true,
        configurable: true
    });
    LoadingService.prototype.start = function (autoIncrement) {
        var _this = this;
        if (autoIncrement === void 0) { autoIncrement = true; }
        this.create();
        this.count++;
        if (autoIncrement) {
            clearTimeout(this.timeout);
            var fn_1 = function () {
                _this.increment();
                if (_this.progress < 100) {
                    _this.timeout = setTimeout(fn_1.bind(_this), _this.threshold);
                }
                else {
                    _this.complete();
                }
            };
            this.timeout = setTimeout(fn_1.bind(this), this.threshold);
        }
    };
    LoadingService.prototype.stop = function () {
        this.count--;
        clearTimeout(this.timeout);
    };
    LoadingService.prototype.reset = function (num) {
        if (num === void 0) { num = 0; }
        this.progress = num;
    };
    LoadingService.prototype.complete = function (all) {
        var _this = this;
        if (all === void 0) { all = false; }
        this.count--;
        if (this.count <= 0 || all) {
            this.progress = 100;
            this.count = 0;
            setTimeout(function () {
                _this.hide();
                _this.progress = 0;
            }, this.threshold * 2);
        }
    };
    LoadingService.prototype.hide = function () {
        this.stop();
        this.instance.visible = false;
    };
    LoadingService.prototype.create = function () {
        if (!this.component) {
            this.component = this.injectionService.appendComponent(LoadingComponent);
        }
        this.instance.visible = true;
        this.instance.progress = this.progress;
        return this.component;
    };
    LoadingService.prototype.increment = function () {
        if (this.progress >= 100)
            return;
        // inspired by angular-loading-bar
        // https://github.com/chieffancypants/angular-loading-bar
        var stat = this.progress / 100;
        var rnd = 0;
        if (stat >= 0 && stat < 0.25) {
            // Start out between 3 - 6% increments
            rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        }
        else if (stat >= 0.25 && stat < 0.65) {
            // increment between 0 - 3%
            rnd = (Math.random() * 3) / 100;
        }
        else if (stat >= 0.65 && stat < 0.9) {
            // increment between 0 - 2%
            rnd = (Math.random() * 2) / 100;
        }
        else if (stat >= 0.9 && stat < 0.99) {
            // finally, increment it .5 %
            // after 99%, don't increment:
            rnd = 0.005;
        }
        this.progress = (stat + rnd) * 100;
    };
    LoadingService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [InjectionService])
    ], LoadingService);
    return LoadingService;
}());
export { LoadingService };
//# sourceMappingURL=loading.service.js.map