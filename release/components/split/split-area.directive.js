import { Directive, ChangeDetectionStrategy, Optional, Self } from '@angular/core';
import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';
var SplitAreaDirective = (function () {
    function SplitAreaDirective(flex) {
        this.flex = flex;
    }
    return SplitAreaDirective;
}());
export { SplitAreaDirective };
SplitAreaDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxSplitArea]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'ngx-split-area'
                }
            },] },
];
/** @nocollapse */
SplitAreaDirective.ctorParameters = function () { return [
    { type: FlexDirective, decorators: [{ type: Optional }, { type: Self },] },
]; };
//# sourceMappingURL=split-area.directive.js.map