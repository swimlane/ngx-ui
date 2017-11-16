var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ChangeDetectionStrategy, Optional, Self, HostBinding, Input } from '@angular/core';
import { FlexDirective, validateBasis } from '@angular/flex-layout';
var SplitAreaDirective = /** @class */ (function () {
    function SplitAreaDirective(flexDirective) {
        this.flexDirective = flexDirective;
    }
    SplitAreaDirective.isPercent = function (basis) {
        var hasCalc = String(basis).indexOf('calc') > -1;
        return String(basis).indexOf('%') > -1 && !hasCalc;
    };
    SplitAreaDirective.basisToValue = function (basis) {
        if (typeof basis === 'string') {
            return Number(basis.replace('%', '').replace('px', ''));
        }
        return basis;
    };
    Object.defineProperty(SplitAreaDirective.prototype, "cssClass", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "fxFlexFill", {
        get: function () {
            return this.fxFlex === '';
        },
        enumerable: true,
        configurable: true
    });
    SplitAreaDirective.prototype.getFlexParts = function () {
        var flex = this.flexDirective;
        var basis = flex._queryInput('flex') || '1 1 1e-9px';
        return validateBasis(String(basis).replace(';', ''), flex._queryInput('grow'), flex._queryInput('shrink'));
    };
    SplitAreaDirective.prototype.getInputFlexParts = function () {
        var flex = this.flexDirective;
        var basis = this.fxFlex || '1 1 1e-9px';
        return validateBasis(String(basis).replace(';', ''), flex._queryInput('grow'), flex._queryInput('shrink'));
    };
    SplitAreaDirective.prototype.updateStyle = function (flexBasis) {
        var flex = this.flexDirective;
        if (typeof flexBasis === 'undefined') {
            flexBasis = flex._queryInput('flex') || '';
        }
        if (typeof flexBasis === 'number') {
            flexBasis = this.isPercent() ? flexBasis + "%" : flexBasis + "px";
        }
        var grow = flex._queryInput('grow');
        var shrink = flex._queryInput('shrink');
        if (flexBasis.indexOf(' ') < 0) {
            flexBasis = [grow, shrink, flexBasis].join(' ');
        }
        flex._cacheInput('flex', flexBasis);
        flex._updateStyle(flexBasis);
    };
    SplitAreaDirective.prototype.isPercent = function (basis) {
        if (!basis) {
            var flex = this.flexDirective;
            basis = flex._queryInput('flex') || '1 1 1e-9px';
        }
        var hasCalc = String(basis).indexOf('calc') > -1;
        return String(basis).indexOf('%') > -1 && !hasCalc;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitAreaDirective.prototype, "minBasis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitAreaDirective.prototype, "maxBasis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitAreaDirective.prototype, "fxFlex", void 0);
    __decorate([
        HostBinding('class.ngx-split-area'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], SplitAreaDirective.prototype, "cssClass", null);
    SplitAreaDirective = __decorate([
        Directive({
            selector: '[ngxSplitArea]',
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(0, Optional()), __param(0, Self()),
        __metadata("design:paramtypes", [FlexDirective])
    ], SplitAreaDirective);
    return SplitAreaDirective;
}());
export { SplitAreaDirective };
//# sourceMappingURL=split-area.directive.js.map