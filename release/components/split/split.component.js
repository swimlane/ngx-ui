import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, ElementRef, HostBinding } from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
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
        this.handles.forEach(function (d) { return d.drag.subscribe(function (pos) { return _this.onDrag(pos); }); });
    };
    SplitComponent.prototype.onDrag = function (_a) {
        var x = _a.x, y = _a.y;
        var parentWidth = this.elementRef.nativeElement.clientWidth;
        var delta = this.direction === 'row' ? x : y;
        this.areas.forEach(function (area, i) {
            // get the cur flex
            var flex = area.flex;
            var flexPerc = flex._inputMap.flex;
            // get the % in px
            var areaCur = parseFloat(flexPerc);
            var areaPx = parentWidth * (areaCur / 100);
            // determine which dir and calc the diff
            var areaDiff;
            if (i === 0) {
                areaDiff = areaPx + delta;
            }
            else {
                areaDiff = areaPx - delta;
            }
            // convert the px to %
            var newAreaPx = (areaDiff / parentWidth) * 100;
            newAreaPx = Math.max(newAreaPx, 0);
            newAreaPx = Math.min(newAreaPx, 100);
            // update flexlayout
            flex._inputMap.flex = newAreaPx + '%';
            flex._updateStyle();
        });
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
    'handles': [{ type: ContentChildren, args: [SplitHandleComponent, { descendants: true },] },],
    'areas': [{ type: ContentChildren, args: [SplitAreaDirective,] },],
};
//# sourceMappingURL=split.component.js.map