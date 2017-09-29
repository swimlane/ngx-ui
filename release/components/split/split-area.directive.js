import { Directive, ChangeDetectionStrategy, Optional, Self, HostBinding, Input } from '@angular/core';
import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';
import { validateBasis } from '@angular/flex-layout/utils/basis-validator';
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
    SplitAreaDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxSplitArea]',
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SplitAreaDirective.ctorParameters = function () { return [
        { type: FlexDirective, decorators: [{ type: Optional }, { type: Self },] },
    ]; };
    SplitAreaDirective.propDecorators = {
        'minBasis': [{ type: Input },],
        'maxBasis': [{ type: Input },],
        'fxFlex': [{ type: Input },],
        'cssClass': [{ type: HostBinding, args: ['class.ngx-split-area',] },],
    };
    return SplitAreaDirective;
}());
export { SplitAreaDirective };
//# sourceMappingURL=split-area.directive.js.map