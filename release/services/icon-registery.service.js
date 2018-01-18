var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
function convertClass(input) {
    if (input === void 0) { input = 'svg'; }
    var classes = input.trim().split(' ').map(function (d) {
        var _a = d.split(':'), set = _a[0], icon = _a[1];
        return set.length ? set + " " + set + "-" + icon : icon;
    }).join(' ');
    return "ngx-icon " + classes;
}
var IconRegisteryService = /** @class */ (function () {
    function IconRegisteryService() {
        this._defaultFontSetClass = 'ngx';
        this._iconMap = new Map();
    }
    IconRegisteryService.prototype.setDefaultFontSetClass = function (iconSet) {
        if (!arguments.length)
            return this._defaultFontSetClass;
        this._defaultFontSetClass = iconSet;
    };
    IconRegisteryService.prototype.get = function (keys, set) {
        return this.lookup(keys, set)
            .map(function (k) { return convertClass(k); });
    };
    IconRegisteryService.prototype.lookup = function (keys, set) {
        var _this = this;
        return (Array.isArray(keys) ? keys : [keys])
            .reduce(function (p, k) {
            k = _this._expandKeys(k, set).map(function (kk) {
                var x = _this._iconMap.get(kk);
                return (x && x.length === 1) ? x[0] : kk;
            }).join(' ');
            return p.concat(_this._iconMap.get(k) || [k]);
        }, []);
    };
    IconRegisteryService.prototype.add = function (key, icon) {
        key = this._expandKeys(key).join(' ');
        icon = this.lookup(icon);
        this._iconMap.set(key, icon);
    };
    IconRegisteryService.prototype._expandKeys = function (key, set) {
        if (set === void 0) { set = this._defaultFontSetClass; }
        return key.split(' ').map(function (k) {
            if (k.includes(':'))
                return k;
            return set + ":" + k;
        });
    };
    IconRegisteryService = __decorate([
        Injectable()
    ], IconRegisteryService);
    return IconRegisteryService;
}());
export { IconRegisteryService };
//# sourceMappingURL=icon-registery.service.js.map