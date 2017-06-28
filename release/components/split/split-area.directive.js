import { Directive, ChangeDetectionStrategy, Optional, Self, HostBinding, Input } from '@angular/core';
import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';
var SplitAreaDirective = (function () {
    function SplitAreaDirective(flex) {
        this.flex = flex;
        this._minAreaPct = 0;
        this._maxAreaPct = 100;
    }
    Object.defineProperty(SplitAreaDirective.prototype, "minAreaPct", {
        get: function () {
            return this._minAreaPct;
        },
        set: function (val) {
            if (typeof val === 'string') {
                val = +val.replace('%', '');
            }
            this._minAreaPct = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "maxAreaPct", {
        get: function () {
            return this._maxAreaPct;
        },
        set: function (val) {
            if (typeof val === 'string') {
                val = +val.replace('%', '');
            }
            this._maxAreaPct = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "cssClass", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    return SplitAreaDirective;
}());
export { SplitAreaDirective };
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
    'minAreaPct': [{ type: Input },],
    'maxAreaPct': [{ type: Input },],
    'cssClass': [{ type: HostBinding, args: ['class.ngx-split-area',] },],
};
//# sourceMappingURL=split-area.directive.js.map