import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, ElementRef, HostBinding } from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
import { validateBasis } from '@angular/flex-layout/utils/basis-validator';
function getParts(flex) {
    var basis = flex._queryInput('flex') || '';
    return validateBasis(String(basis).replace(';', ''), flex._queryInput('grow'), flex._queryInput('shrink'))
        .map(function (n) { return parseFloat(n); });
}
var SplitComponent = (function () {
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
        var flex = area.flex;
        var _a = getParts(flex), grow = _a[0], shrink = _a[1], basis = _a[2];
        var areaPx = basisToPx * basis;
        // get and/or store baseBasis
        var baseBasis = flex.baseBasis = flex.baseBasis || basis;
        // minimum and maximum basis determined by inputs
        var minBasis = Math.max(area.minAreaPct || 0, shrink === 0 ? baseBasis : 0);
        var maxBasis = Math.min(area.maxAreaPct || 100, grow === 0 ? baseBasis : 100);
        var deltaMin = basis - minBasis;
        var deltaMax = maxBasis - basis;
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
            var flex = area.flex;
            var _a = getParts(flex), grow = _a[0], shrink = _a[1], basis = _a[2];
            // get and/or store baseBasis
            var baseBasis = flex.baseBasis = flex.baseBasis || basis;
            // minimum and maximum basis determined by inputs
            var minBasis = Math.max(area.minAreaPct || 0, shrink === 0 ? baseBasis : 0);
            var maxBasis = Math.min(area.maxAreaPct || 100, grow === 0 ? baseBasis : 100);
            // get area in px
            var basisPx = basis * basisToPx;
            // determine which dir and calc the diff
            var newBasisPx = basisPx + _delta;
            // convert the px to %
            var newBasis = newBasisPx / basisToPx;
            newBasis = Math.max(newBasis, minBasis);
            newBasis = Math.min(newBasis, maxBasis);
            // update flexlayout
            flex.flex = grow + " " + shrink + " " + newBasis;
            flex._updateStyle(newBasis);
            // return actual change in px
            return newBasis * basisToPx - basisPx;
        }
    };
    return SplitComponent;
}());
export { SplitComponent };
SplitComponent.decorators = [
    { type: Component, args: [{
                selector: '[ngxSplit]',
                template: "<ng-content></ng-content>",
                styleUrls: ['./split.component.scss'],
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
//# sourceMappingURL=split.component.js.map