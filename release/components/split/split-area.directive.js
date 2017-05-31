import { Directive, ChangeDetectionStrategy, Optional, Self, HostBinding, Input } from '@angular/core';
import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';
var SplitAreaDirective = (function () {
    function SplitAreaDirective(flex) {
        this.flex = flex;
    }
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