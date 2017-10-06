import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, ElementRef, HostBinding } from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
var toValue = SplitAreaDirective.basisToValue;
var isBasisPecent = SplitAreaDirective.isPercent;
function getMinMaxPct(minBasis, maxBasis, grow, shrink, baseBasisPct, basisToPx) {
    // minimum and maximum basis determined by max/min inputs
    var minBasisPct = toValue(minBasis) / (isBasisPecent(minBasis) ? 1 : basisToPx);
    var maxBasisPct = toValue(maxBasis) / (isBasisPecent(maxBasis) ? 1 : basisToPx);
    // minimum and maximum basis determined by flex inputs
    minBasisPct = Math.max(minBasisPct || 0, shrink === '0' ? baseBasisPct : 0);
    maxBasisPct = Math.min(maxBasisPct || 100, grow === '0' ? baseBasisPct : 100);
    return [minBasisPct, maxBasisPct];
}
var SplitComponent = /** @class */ (function () {
    function SplitComponent(elementRef) {
        this.elementRef = elementRef;
        /*tslint:disable*/
        this.direction = 'row';
    }
    Object.defineProperty(SplitComponent.prototype, "mainCss", {
        /*tslint:enable*/
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "rowCss", {
        get: function () { return this.direction === 'row'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "columnCss", {
        get: function () { return this.direction === 'column'; },
        enumerable: true,
        configurable: true
    });
    SplitComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.handles.forEach(function (d) { return d.drag.subscribe(function (ev) { return _this.onDrag(ev); }); });
        this.handles.forEach(function (d) { return d.dblclick.subscribe(function (ev) { return _this.onDblClick(ev); }); });
    };
    SplitComponent.prototype.onDblClick = function (ev) {
        var basisToPx = (this.direction === 'row' ?
            this.elementRef.nativeElement.clientWidth :
            this.elementRef.nativeElement.clientHeight) / 100;
        var area = this.areas.first;
        if (!area)
            return;
        var _a = area.getFlexParts(), grow = _a[0], shrink = _a[1], basis = _a[2];
        var isPercent = isBasisPecent(basis);
        var basisValue = toValue(basis);
        // get basis in px and %
        var basisPx = isPercent ? basisValue * basisToPx : basisValue;
        var basisPct = basisPx / basisToPx;
        // get baseBasis in percent
        var baseBasis = area.getInputFlexParts()[2];
        var baseBasisPct = toValue(baseBasis) / (isBasisPecent(baseBasis) ? basisToPx : 1);
        var _b = getMinMaxPct(area.minBasis, area.maxBasis, grow, shrink, baseBasisPct, basisToPx), minBasisPct = _b[0], maxBasisPct = _b[1];
        // max and min deltas
        var deltaMin = basisPct - minBasisPct;
        var deltaMax = maxBasisPct - basisPct;
        var delta = (deltaMin < deltaMax) ? deltaMax : -deltaMin;
        var deltaPx = delta * basisToPx;
        this.resize(deltaPx);
    };
    SplitComponent.prototype.onDrag = function (_a) {
        var movementX = _a.movementX, movementY = _a.movementY;
        var deltaPx = this.direction === 'row' ? movementX : movementY;
        this.resize(deltaPx);
    };
    SplitComponent.prototype.resize = function (delta) {
        var basisToPx = (this.direction === 'row' ?
            this.elementRef.nativeElement.clientWidth :
            this.elementRef.nativeElement.clientHeight) / 100;
        var areas = this.areas.toArray();
        // for now assuming splitter is after first area
        var first = areas[0], rest = areas.slice(1);
        [first].forEach(function (area) { return delta = resizeAreaBy(area, delta); });
        // delta is distributed left to right
        return rest.forEach(function (area) { return delta += resizeAreaBy(area, -delta); });
        function resizeAreaBy(area, _delta) {
            var flex = area.flexDirective;
            if (area.fxFlexFill) {
                // area is fxFlexFill, distribute delta right
                return _delta;
            }
            var _a = area.getFlexParts(), grow = _a[0], shrink = _a[1], basis = _a[2];
            var isPercent = isBasisPecent(basis);
            var basisValue = toValue(basis);
            // get baseBasis in percent
            var baseBasis = area.getInputFlexParts()[2];
            var baseBasisPct = toValue(baseBasis) / (isBasisPecent(baseBasis) ? basisToPx : 1);
            // get basis in px and %
            var basisPx = isPercent ? basisValue * basisToPx : basisValue;
            var basisPct = basisPx / basisToPx;
            // determine which dir and calc the diff
            var newBasisPx = basisPx + _delta;
            var newBasisPct = newBasisPx / basisToPx;
            var _b = getMinMaxPct(area.minBasis, area.maxBasis, grow, shrink, baseBasisPct, basisToPx), minBasisPct = _b[0], maxBasisPct = _b[1];
            // obey max and min
            newBasisPct = Math.max(newBasisPct, minBasisPct);
            newBasisPct = Math.min(newBasisPct, maxBasisPct);
            // calculate new basis on px
            newBasisPx = newBasisPct * basisToPx;
            // update flexlayout
            area.updateStyle(isPercent ? newBasisPct : newBasisPx);
            // return actual change in px
            return newBasisPx - basisPx;
        }
    };
    SplitComponent.decorators = [
        { type: Component, args: [{
                    selector: '[ngxSplit]',
                    template: "<ng-content></ng-content>",
                    styleUrls: ['./split.component.css'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SplitComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    SplitComponent.propDecorators = {
        'direction': [{ type: Input, args: ['ngxSplit',] },],
        'mainCss': [{ type: HostBinding, args: ['class.ngx-split',] },],
        'rowCss': [{ type: HostBinding, args: ['class.row-split',] },],
        'columnCss': [{ type: HostBinding, args: ['class.column-split',] },],
        'handles': [{ type: ContentChildren, args: [SplitHandleComponent, { descendants: false },] },],
        'areas': [{ type: ContentChildren, args: [SplitAreaDirective,] },],
    };
    return SplitComponent;
}());
export { SplitComponent };
//# sourceMappingURL=split.component.js.map